import { Request, Response } from 'express';
import IRoute from 'types/route';

export class UserController {
  public all (request: Request, response: Response) {
    response.json([{ id: 1, name: 'Martijn' }]);
  }
}

export const Routes: IRoute[] = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
];
