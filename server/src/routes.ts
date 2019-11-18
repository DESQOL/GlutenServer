import * as InfoController from './controller/InfoController';
import * as UserController from './controller/UserController';

export const Routes = [
    ...InfoController.Routes,
    ...UserController.Routes,
];
