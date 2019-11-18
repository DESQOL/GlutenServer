import { NextFunction, Request, Response } from 'express';

export class HomeController {

    async info(request: Request, response: Response, next: NextFunction) {
        return response.json({ version: '1.0.0' });
    }

}

export const Routes = [
    {
        method: 'get',
        route: '/',
        controller: HomeController,
        action: 'info'
    },
];
