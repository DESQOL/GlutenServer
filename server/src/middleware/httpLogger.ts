import { logger } from '@helper';
import morgan, { TokenIndexer } from 'morgan';
import { Request, Response } from 'express';
import os from 'os';

Object.assign(logger.stream, {
    write: (message: string) => {
        logger.info('', JSON.parse(message));
    }
});

morgan.token('unix', (_request: Request, _response: Response): string => {
    return Date.now().toString();
});

morgan.token('hostname', (_request: Request, _response: Response): string => {
    return os.hostname();
});

morgan.token('pid', (_request: Request, _response: Response): string=> {
    return process.pid.toString();
});

function jsonFormat(tokens: TokenIndexer, request: Request, response: Response): string{
    return JSON.stringify({
        'time': tokens['unix'](request, response),
        'remote-address': tokens['remote-addr'](request, response),
        'method': tokens['method'](request, response),
        'url': tokens['url'](request, response),
        'http-version': tokens['http-version'](request, response),
        'status-code': tokens['status'](request, response),
        'content-length': tokens['res'](request, response, 'content-length'),
        'referrer': tokens['referrer'](request, response),
        'user-agent': tokens['user-agent'](request, response),
        'hostname': tokens['hostname'](request, response),
        'pid': tokens['pid'](request, response)
    });
}

export const httpLogger = morgan(
    jsonFormat,
    { stream: logger.stream } as any
);
