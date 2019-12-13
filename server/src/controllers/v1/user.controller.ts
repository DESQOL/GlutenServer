import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IRoute from 'types/route';
import User from '../../entity/user';

export class UserController {
  private userRepository = getRepository(User);

  public all (request: Request, response: Response) {
    return this.userRepository.find();
  }

  public async login (request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await this.userRepository.findOne({ email });
    if (!user) {
      response.status(403).json({
        message: 'Incorrect username or password.',
      });
      return;
    }

    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      response.status(403).json({
        message: 'Incorrect username or password.',
      });
      return;
    }

    response.json(user);
  }
}

export const Routes: IRoute[] = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'post',
    route: '/user/login',
    controller: UserController,
    action: 'login',
  },
];
