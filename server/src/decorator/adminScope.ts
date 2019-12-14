import { Token } from '@entity';
import { getToken } from '@helper';
import { MiddlewareDefinition } from '@type';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const metadataKey = 'routeMiddleware';

export const AdminScope = (): MethodDecorator => {
    return (target: any, propertyKey: string): void => {
        const metadataValue = Reflect.getMetadata(metadataKey, target, propertyKey) as MiddlewareDefinition[] || [];

        metadataValue.push(async (request: Request, response: Response, next: NextFunction) => {
            const token = getToken(request);
            const tokenRepository = getRepository(Token);
            const data = await tokenRepository.findOne({ token });

            if (!data || !data.scope.isAdmin) {
                response.status(403).json({
                    message: 'Token does not have the required scope.',
                    errors: [
                        {
                            path: request.path,
                            message: 'Token does not have the required scope.',
                        },
                    ],
                });
            } else {
                next();
            }
        });

        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    };
};
