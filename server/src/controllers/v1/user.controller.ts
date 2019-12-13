import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IRoute from 'types/route';
import User from '../../entity/user';

export class UserController {
  private userRepository = getRepository(User);

  public all (request: Request, response: Response) {
    return this.userRepository.find();
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
