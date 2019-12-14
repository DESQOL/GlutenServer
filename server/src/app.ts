import 'reflect-metadata';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import { Server } from 'http';
import { createConnection } from 'typeorm';

import { RecipeController, UserController } from '@controller/v1';
import { MiddlewareDefinition, RouteDefinition } from '@type';

class App {
  public app: Application;
  public port: number;
  public server: Server;

  constructor (port: number = 3000) {
    this.port = port;
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

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

        function routeHandler (req: Request, res: Response, next: NextFunction) {
          const result = new controller()[route.methodName](req, res);
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
