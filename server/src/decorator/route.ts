import { MiddlewareDefinition, RouteDefinition, RouteOptions } from '@type';
import { validateToken } from '@middleware';

export const Route = (requestMethod: 'delete' | 'get' | 'patch' | 'post' | 'put', path: string, options?: Partial<RouteOptions>): MethodDecorator => {
    return (target: object, propertyKey: string): void => {
        /*
         * Add this route (method) to the controller (class)
         */
        const controllerRoutes = Reflect.getMetadata('routes', target.constructor) as RouteDefinition[] || [];
        controllerRoutes.push({
            requestMethod,
            path,
            methodName: propertyKey,
        });
        Reflect.defineMetadata('routes', controllerRoutes, target.constructor);

        if (!options) {
            return;
        }

        /*
         * Register any additional middleware on this route (method)
         */
        const routeMiddleware = Reflect.getMetadata('routeMiddleware', target, propertyKey) as MiddlewareDefinition[] || [];
        if (options.tokenRequired) {
            routeMiddleware.push(validateToken);
        }

        Reflect.defineMetadata('routeMiddleware', routeMiddleware, target, propertyKey);
    };
};
