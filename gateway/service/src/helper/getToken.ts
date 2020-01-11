import { Request } from 'express';

const keys = {
    header: 'X-API-KEY',
    query: 'api_key',
};

export function getToken (request: Request): string | undefined {
    const tokenHeader = request.header(keys.header);
    const tokenQuery = request.query[keys.query];

    return tokenHeader || tokenQuery || undefined;
}
