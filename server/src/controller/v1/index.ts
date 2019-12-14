import IRoute from 'type/route';

import * as RecipeController from './recipe.controller';
import * as UserController from './user.controller';

const _routes: IRoute[] = [];
[
  RecipeController,
  UserController,
].forEach(((control) => control.Routes.forEach((route: IRoute) => {
  _routes.push(Object.assign(route, { route: `/v1/${route.route[0] === '/' ? route.route.substr(1) : route.route}` }));
})));

export const Routes: IRoute[] = _routes;
