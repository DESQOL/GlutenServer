import cluster from 'cluster';
import os from 'os';

import { isProduction, logger } from '@helper';
import App from './app';

async function startApp (): Promise<void> {
    const app = new App();
    await app.listen();
}

if (isProduction()) {
    if (cluster.isMaster) {
        logger.info(`Master ${process.pid} is running`);

        // Fork workers
        for (let i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker: cluster.Worker, code: number, _signal: string) => {
            if (code === 0) {
                // We assume that code '0' is a clean exit, for example a graceful shutdown
                logger.info(`Worker ${worker.process.pid} exited with code ${code}`);
                return;
            }

            // Worked died, start a new worker
            logger.warn(`Worker ${worker.process.pid} died with code ${code}`);
            cluster.fork();
        });
    } else {
        logger.info(`Worker ${process.pid} started`);
        (startApp().then(() => logger.info(`Worker ${process.pid} ready`)));
    }
} else {
    (startApp());
}
