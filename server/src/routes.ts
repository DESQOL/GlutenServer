import * as HomeController from './controller/HomeController';
import * as ControllerV1 from './controller/v1';

export const Routes = [
    ...HomeController.Routes,
    ...ControllerV1.Routes,
];
