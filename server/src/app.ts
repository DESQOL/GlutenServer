import 'reflect-metadata';
import ormconfig from './ormconfig.js';

import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import { Connection, createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';

import { RecipeController, UserController } from '@controller';
import { MiddlewareDefinition, RouteDefinition } from '@type';
import { httpLogger, rateLimiter, validateToken } from '@middleware';
import { logger, QueryFileLogger } from '@helper';

class App {
    public app: Application;
    public http: http.Server;
    public connection: Connection;

    constructor () {
        this.app = express();

        this.app.use(httpLogger);
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(rateLimiter());

        this.app.set('json spaces', 4);

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
            logger.error({ status: err.status, data: err });
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
        })).then((connection) => {
            this.connection = connection;
        }).catch((err) => {
            logger.error(err);
            process.exit();
        });

        this.http = this.app.listen(process.env.PORT || 80, () => {
            logger.info(`App listening on the http://localhost:${process.env.PORT || 80}/`);
        });
    }

    public async close (): Promise<void> {
        if (this.http) {
            this.http.close((err) => logger.info(`Closed https server${err ? `, received error: ${err}.` : '.'}`));
        }

        if (this.connection) {
            await this.connection.close();
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
                                } else if (res.finished) {
                                    logger.debug('result is a finished Response, not doing anything');
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
