import appRoot from 'app-root-path';
import winston, { format } from 'winston';

const { NODE_ENV } = process.env;

const logger = winston.createLogger({
    level: !NODE_ENV ? 'debug' : 'info',
    format: format.combine(
        format.splat(),
        format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: `${appRoot}/logs/error-${new Date().toISOString().slice(0, 10)}.log`,
            level: 'error'
        }),
        new winston.transports.File({
            filename: `${appRoot}/logs/combined-${new Date().toISOString().slice(0, 10)}.log`,
        })
    ]
});

if (!NODE_ENV || (NODE_ENV.toUpperCase() !== 'PRODUCTION' && NODE_ENV.toUpperCase() !== 'TEST')) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export { logger };
