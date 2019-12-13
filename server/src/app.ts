import appRoot from 'app-root-path';
import express, { Application, NextFunction, Request, Response } from 'express';
import { OpenApiValidator } from 'express-openapi-validator';

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
    const middleWares = [];

    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes () {
    const controllers = [];

    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
