import appRoot from 'app-root-path';
import winston, { Logger } from 'winston';

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
export const stream = {
    write: (message: string) => {
        // Do not log while testing
        if (process.env.NODE_ENV !== 'test') {
            // use the 'info' log level so the output will be picked up by both transports (file and console)
            logger.info(message);
        }
    },
};

export default logger;