import IRoute from 'types/route';

import * as UserController from './user.controller';

const _routes: IRoute[] = [];
[
  UserController,
].forEach(((control) => control.Routes.forEach((route: IRoute) => {
  _routes.push(Object.assign(route, { route: `/v1/${route.route[0] === '/' ? route.route.substr(1) : route.route}` }));
})));

export const Routes: IRoute[] = _routes;
