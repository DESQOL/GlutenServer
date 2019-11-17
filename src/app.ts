import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";

/*
 * Controllers (route handlers)
 */
import * as homeController from "./controllers/home";

/*
 * HACK: make sure that the database is available, or crash.
 */
(async () => await createConnection()
    .catch(err => {
        console.error(err.sqlMessage);
        process.exit(418);
    })
)()

/*
 * Create express app.
 */
const app = express();

/*
 * Setup express app.
 */
app.use(bodyParser.json());

/*
 * Primary app routes.
 */
app.get("/", homeController.index);

/*
 * Start express server.
 */
app.listen(3000);

export default app;
