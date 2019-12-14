export const RequireToken = (): ClassDecorator => {
    return (target: object): void => {
        if (! Reflect.hasMetadata('requireToken', target)) {
            Reflect.defineMetadata('requireToken', true, target);
        }
    };
};
