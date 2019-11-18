import * as  HomeController from './controller/HomeController';
import * as InfoController from './controller/InfoController';
import * as UserController from './controller/UserController';

export const Routes = [
    ...HomeController.Routes,
    ...InfoController.Routes,
    ...UserController.Routes,
];
