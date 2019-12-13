import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';

import * as ControllerV1 from './controllers/v1';

class App {
  public app: Application;
  public port: number;

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

  public listen () {
    this.app.listen(this.port, () => {
        // tslint:disable-next-line:no-console
      console.log(`App listening on the http://localhost:${this.port}`);
    });
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
        const result = (new (route.controller)())[route.action](req, res, next);
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
