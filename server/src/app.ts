import 'reflect-metadata';
import ormconfig from './ormconfig.js';

import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import { createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';
import https from 'https';

import { RecipeController, UserController } from '@controller';
import { MiddlewareDefinition, RouteDefinition } from '@type';
import { httpLogger, rateLimiter, validateToken } from '@middleware';
import { logger, QueryFileLogger, isProduction } from '@helper';

class App {
    public app: Application;
    public http: http.Server;
    public https: https.Server;

    constructor () {
        this.app = express();

        this.app.use(httpLogger);
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(rateLimiter());

        const swaggerDocument = yaml.safeLoad(fs.readFileSync(`${appRoot}/spec/openapi.yaml`, 'utf8'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        new OpenApiValidator({
            apiSpec: `${appRoot}/spec/openapi.yaml`,
            validateRequests: true,
            validateResponses: true,
        }).installSync(this.app);

        this.middlewares();
        this.routes();

        this.app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });
    }

    public async listen (): Promise<void> {
        await createConnection(Object.assign(ormconfig, {
            logging: true,
            logger: new QueryFileLogger('all'),
        })).catch((err) => {
            logger.error(err);
            process.exit();
        });

        if (isProduction()) {
            this.https = https.createServer({
                key: fs.readFileSync(`${appRoot}/cert/privkey.pem`, 'utf8'),
                cert: fs.readFileSync(`${appRoot}/cert/cert.pem`, 'utf8'),
                ca: fs.readFileSync(`${appRoot}/cert/chain.pem`, 'utf8'),
            }, this.app).listen(443, () => logger.info('App listening on the https://localhost:443/'));
        } else {
            this.http = this.app.listen(process.env.PORT || 80, () => {
                logger.info(`App listening on the http://localhost:${process.env.PORT || 80}/`);
            });
        }
    }

    public close (): void {
        if (this.http) {
            this.http.close();
        }

        if (this.https) {
            this.https.close();
        }
    }

    private middlewares (): void {
        [].forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes (): void {
        [
            RecipeController,
            UserController,
        ].forEach((Controller) => {
            const prefix = Reflect.getMetadata('prefix', Controller);
            const requireToken = Reflect.getMetadata('requireToken', Controller) as boolean;
            const routes: RouteDefinition[] = Reflect.getMetadata('routes', Controller);

            routes.forEach((route) => {
                const routeMiddleware: MiddlewareDefinition[] = requireToken ? [validateToken] : [];
                const extraMiddleware = Reflect.getMetadata('routeMiddleware', Controller.prototype, route.methodName);
                if (extraMiddleware) {
                    (extraMiddleware as MiddlewareDefinition[]).forEach((val) => routeMiddleware.push(val));
                }

                function routeHandler (req: Request, res: Response, next: NextFunction): void {
                    const result = new Controller()[route.methodName](req, res, next);
                    if (result instanceof Promise) {
                        result
                            .then((data) => {
                                if ((data as Response) !== undefined && (data as Response).finished) {
                                    logger.debug('result is a finished Response, not doing anything');
                                } else if (data !== null && data !== undefined) {
                                    res.send(data);
                                } else {
                                    next();
                                }
                            })
                            .catch((err) => {
                                next(err);
                            });
                    } else if ((result as Response) !== undefined && (result as Response).finished) {
                        logger.debug('result is a finished Response, not doing anything');
                    } else if (result !== null && result !== undefined) {
                        res.json(result);
                    } else {
                        next();
                    }
                }

                this.app[route.requestMethod](`${prefix}${route.path}`, routeMiddleware, routeHandler);
            });
        });
    }
}

export default App;
