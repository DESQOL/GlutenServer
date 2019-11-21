import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { NextFunction,Request, Response } from 'express';
import YAML from 'yamljs';
import * as swaggerUi from 'swagger-ui-express';
import { Routes } from './routes';
import { OpenApiValidator } from 'express-openapi-validator';
import bodyParser from 'body-parser';
import logger from 'morgan';

const port = 3000;

/*
 * Create express app.
 */
const app = express();

createConnection().then(async connection => {

    /*
     * Setup express app.
     */
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded());

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    new OpenApiValidator({
        apiSpec: `${__dirname}/../spec/openapi.yaml`,
        validateRequests: true,
        validateResponses: true,
    }).install(app);

    /*
     * Setup Swagger integration.
     */
    const swaggerDocument = YAML.load(`${__dirname}/../spec/openapi.yaml`);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    /*
     * Register express routes from defined application routes.
     */
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
        });
    });

    /*
     * Start express server.
     */
    app.listen(port, () => app.emit('listening'));
    app.on('listening', () => console.log(`Example app listening on port ${port}!`));

}).catch(error => console.log(error));

export default app;
