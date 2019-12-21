import cluster from 'cluster';
import os from 'os';

import { isProduction } from '@helper';
import App from './app';

async function startApp (): Promise<void> {
    const app = new App();
    await app.listen();
}

if (isProduction()) {
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker: cluster.Worker, _code: number, _signal: string) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });
    } else {
        console.log(`Worker ${process.pid} started`);
        (startApp());
    }
} else {
    (startApp());
}
