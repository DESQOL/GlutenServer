import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import { Server } from 'http';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import * as ControllerV1 from './controllers/v1';

class App {
  public app: Application;
  public port: number;
  public server: Server;

  constructor (port: number = 3000) {
    this.port = port;
    this.app = express();

    new OpenApiValidator({
      apiSpec: `${appRoot}/spec/openapi.yaml`,
      validateRequests: true,
      validateResponses: true,
    }).installSync(this.app);

    this.middlewares();
    this.routes();

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    });
  }

  public async listen () {
    await createConnection(require('./ormconfig.js'))
      .catch((err) => {
        console.error(err);
        process.exit();
      });

    this.server = this.app.listen(this.port, () => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV.toUpperCase() !== 'TEST') {
        console.log(`App listening on the http://localhost:${this.port}`);
      }
    });
  }

  public close () {
    this.server.close();
  }

  private middlewares () {
    [].forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes () {
    [
      ...ControllerV1.Routes,
    ].forEach((route) => {
      this.app[route.method](route.route, (req: Request, res: Response, next: NextFunction) => {
        const result = new route.controller()[route.action](req, res, next);
        if (result instanceof Promise) {
          result
            .then((data) => data !== null && data !== undefined ? res.send(data) : undefined)
            .catch((err) => next(err));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });
  }
}

export default App;
