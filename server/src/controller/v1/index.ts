import * as InfoController from './InfoController';
import * as UserController from './UserController';
import Route from '../../types/route';

const _routes: Route[] = [];
[InfoController, UserController].forEach((control => control.Routes.forEach((route: Route) => {
    _routes.push(Object.assign(route, { route: `/v1/${route.route[0] === '/' ? route.route.substr(1) : route.route}` }));
})));

export const Routes: Route[] = _routes;
