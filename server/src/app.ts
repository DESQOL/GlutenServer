import 'reflect-metadata';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();
import ormconfig from './ormconfig.js';

import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import { Server } from 'http';
import { createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import helmet from 'helmet';
import compression from 'compression';

import { RecipeController, UserController } from '@controller/v1';
import { MiddlewareDefinition, RouteDefinition } from '@type';
import { httpLogger, rateLimiter } from '@middleware';
import { logger } from '@helper';

class App {
    public app: Application;
    public port: number;
    public server: Server;

    constructor (port = 3000) {
        this.port = port;
        this.app = express();

        this.app.use(httpLogger);
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(rateLimiter());

        const swaggerDocument = yaml.safeLoad(fs.readFileSync(`${appRoot}/spec/openapi.yaml`, 'utf8'));
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
        await createConnection(ormconfig)
            .catch((err) => {
                logger.error(err);
                process.exit();
            });

        this.server = this.app.listen(this.port, () => {
            logger.info(`App listening on the http://localhost:${this.port}`);
        });
    }

    public close (): void {
        this.server.close();
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
        ].forEach((controller) => {
            const prefix = Reflect.getMetadata('prefix', controller);
            const routes: RouteDefinition[] = Reflect.getMetadata('routes', controller);

            routes.forEach((route) => {
                let routeMiddleware: MiddlewareDefinition[] = [];
                if (Reflect.hasMetadata('routeMiddleware', controller.prototype, route.methodName)) {
                    routeMiddleware = Reflect.getMetadata('routeMiddleware', controller.prototype, route.methodName);
                }

                function routeHandler (req: Request, res: Response, next: NextFunction): void {
                    const result = new controller()[route.methodName](req, res, next);
                    if (result instanceof Promise) {
                        result
                            .then((data) => data !== null && data !== undefined ? res.send(data) : undefined)
                            .catch((err) => next(err));
                    } else if (result !== null && result !== undefined) {
                        res.json(result);
                    }
                }

                this.app[route.requestMethod](`${prefix}${route.path}`, routeMiddleware, routeHandler);
            });
        });
    }
}

export default App;
