export const Controller = (prefix = ''): ClassDecorator => {
    return (target: object): void => {
        Reflect.defineMetadata('prefix', prefix, target);

        // Since routes are set by our methods this should almost never be true (except the controller has no methods)
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    };
};
