import { NextFunction, Response, Request } from 'express';
import { getToken, getDefaultResponse } from '@helper';
import { getRepository } from 'typeorm';
import { Token } from '@entity';

export async function validateToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    const token = getToken(request);
    if (!token) {
        response.status(401).json(getDefaultResponse(401, request.path));
        return;
    }

    const entity = await getRepository(Token).findOne({
        where: { token },
        cache: 60 * 1000,
    });
    if(!entity) {
        response.status(401).json(getDefaultResponse(401, request.path));
        return;
    }

    next();
}
