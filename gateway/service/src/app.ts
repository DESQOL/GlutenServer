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

        // Pretty format any JSON response with 4 spaces indentation.
        this.app.set('json spaces', 4);

        // Read the OpenAPI spec and register Swagger UI.
        const swaggerDocument = yaml.safeLoad(fs.readFileSync(`${appRoot}/spec/openapi.yaml`, 'utf8'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // Read the OpenAPI spec and install the auto-validator middleware.
        new OpenApiValidator({
            apiSpec: `${appRoot}/spec/openapi.yaml`,
            validateRequests: true,
            validateResponses: true,
        }).installSync(this.app);

        this.middlewares();
        this.routes();

        // Catch any errors or unhandled/unfinished requests.
        this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            logger.error({ status: err.status, data: err });
            res.status(err.status || 500).json({
                message: err.message,
                errors: err.errors,
            });
        });

        // Graceful shutdown listeners
        process.on('SIGTERM', this.shutDown);
        process.on('SIGINT', this.shutDown);
    }

    public async listen (): Promise<void> {
        await createConnection(Object.assign(ormconfig, {
            logging: true,
            logger: new QueryFileLogger('all'),
        })).then((connection) => {
            this.connection = connection;
        }).catch((err) => {
            logger.error(err);
            process.exit(1);
        });

        // Start HTTP server on port 80 (or the environment variable for PORT)
        this.http = this.app.listen(process.env.PORT || 80, () => {
            logger.info(`App listening on the http://localhost:${process.env.PORT || 80}/`);
        });
    }

    /**
     * Closes the server connections, this won't restart the worker. First closes
     * the HTTP server to bounce any incoming requests, than closes the database
     * connection.
     */
    public async close (): Promise<void> {
        if (this.http) {
            this.http.close((err) => logger.info(`Closed https server${err ? `, received error: ${err}.` : '.'}`));
        }

        if (this.connection) {
            await this.connection.close();
        }
    }

    private async shutDown () {
        await this.close();
        process.exit();
    }

    private middlewares (): void {
        [].forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes (): void {
        function controllerHandler (data: any, _request: Request, response: Response, next: NextFunction): void {
            if (((data as Response) !== undefined && (data as Response).headersSent) || response.headersSent) {
                logger.debug('result has already send its headers, not doing anything');
            } else if (data !== null && data !== undefined) {
                response.send(data);
            } else {
                next();
            }
        }

        [
            RecipeController,
            UserController,
        ].forEach((Controller) => {
            const prefix = Reflect.getMetadata('prefix', Controller);

            // Gets the controller option 'requireToken'.
            const requireToken = Reflect.getMetadata('requireToken', Controller) as boolean;

            // Gets all routes registered through the decorator.
            const routes: RouteDefinition[] = Reflect.getMetadata('routes', Controller);

            routes.forEach((route) => {
                const routeMiddleware: MiddlewareDefinition[] = requireToken ? [validateToken] : [];
                const extraMiddleware = Reflect.getMetadata('routeMiddleware', Controller.prototype, route.methodName);
                if (extraMiddleware) {
                    (extraMiddleware as MiddlewareDefinition[]).forEach((val) => routeMiddleware.push(val));
                }

                function routeHandler (request: Request, response: Response, next: NextFunction): void {
                    const result = new Controller()[route.methodName](request, response, next);
                    if (result instanceof Promise) {
                        result.then((data) => controllerHandler(data, request, response, next)).catch(next);
                    } else {
                        controllerHandler(result, request, response, next);
                    }
                }

                // Register the route (including handler and middleware) in Express.
                this.app[route.requestMethod](`${prefix}${route.path}`, routeMiddleware, routeHandler);
            });
        });
    }
}

export default App;
