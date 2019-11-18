import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';
import YAML from 'yamljs';
import * as swaggerUi from 'swagger-ui-express';
import { Request, Response } from 'express';
import { Routes } from './routes';

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

    /*
     * Setup Swagger integration.
     */
    const swaggerDocument = YAML.load(`${__dirname}/../spec/swagger.yaml`);
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

    

        /*
         * Start express server.
         */
    app.listen(port, () => app.emit('listening'));
        app.on('listening', () => console.log(`Example app listening on port ${port}!`));
    
}).catch(error => console.log(error));

export default app;
