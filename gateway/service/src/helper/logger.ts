import appRoot from 'app-root-path';
import winston, { format } from 'winston';
import { isNotProduction, isNotTest, isProduction, isTest } from '@helper';

const logger = winston.createLogger({
    level: isProduction() ? 'info' : 'debug',
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

if (isProduction() || isTest()) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'error'
    }));
} else if (isNotProduction() && isNotTest()) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export { logger };
