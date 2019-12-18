import { NextFunction, Request, Response } from 'express';
import { MiddlewareDefinition } from '@type';
import { validate, ValidationError } from 'class-validator';
import { DefaultMessages, logger } from '@helper';
import { BaseEntity } from '@entity';

const metadataKey = 'routeMiddleware';

export const ValidateClassArgs = <T extends BaseEntity<T>, K extends keyof T>(dataSource: 'body' | 'params' | 'query', Clazz: new () => T, toValidate: { [k: string]: K }): MethodDecorator => {
    return (target: object, propertyKey: string): void => {
        const metadataValue = Reflect.getMetadata(metadataKey, target, propertyKey) as MiddlewareDefinition[] || [];

        metadataValue.push(async (request: Request, response: Response, next: NextFunction) => {
            const args = request[dataSource];

            const clazzInstance = new Clazz();
            const clazzReference = clazzInstance.getDefault();
            Object.keys(args).forEach((argKey) => {
                const key = toValidate[argKey];
                if (!key) {
                    return;
                }

                const paramRawValue = args[argKey];
                const paramTargetType = typeof clazzReference[key];
                switch (paramTargetType) {
                    case 'number':
                        clazzInstance[key as string] = Number(paramRawValue);
                        break;
                    default:
                        clazzInstance[key as string] = paramRawValue;
                        break;
                }
            });

            validate(clazzInstance, { skipMissingProperties: true })
                .then((validateErrors) => {
                    const errors = [];
                    validateErrors.forEach((element: ValidationError) => {
                        const prop = Object.keys(toValidate).find(key => toValidate[key] === element.property);
                        if (!prop) {
                            logger.debug('Ignoring errors, %o, received from an unlisted param key, %s', element, element.property);
                            return;
                        }

                        Object.keys(element.constraints).forEach((constraint) => {
                            errors.push({
                                path: `.params.${prop}`,
                                message: element.constraints[constraint].replace(element.property, prop),
                            });
                        });
                    });

                    if (errors.length > 0) {
                        return response.status(400).json({
                            message: DefaultMessages[400],
                            errors
                        });
                    }

                    next();
                }).catch((err) => next(err));
        });

        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    };
};
