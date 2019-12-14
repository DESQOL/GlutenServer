import { validate } from 'class-validator';
import { Request, Response } from 'express';
import IRoute from 'type/route';
import { getRepository } from 'typeorm';
import User from '../../entity/user';

export class UserController {
  private userRepository = getRepository(User);

  public async register (request: Request, response: Response) {
    const { email, name, password } = request.body;

    let user = await this.userRepository.findOne({ email });
    if (user) {
      response.status(409).json({
        message: 'Specified email address is already associated with an account.',
      });
      return;
    }

    user = new User();
    user.name = name;
    user.email = email;
    user.password = await User.hashPassword(password);

    const errors = await validate(user);
    if (errors.length > 0) {
      response.status(400).json({
        errors,
      });
      return;
    }

    user = await this.userRepository.save(user);
    response.json(user.displayUnit());
  }

  public async login (request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await this.userRepository.findOne({ email });
    if (!user) {
      response.status(403).json({
        message: 'Incorrect email or password.',
      });
      return;
    }

    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
      response.status(403).json({
        message: 'Incorrect email or password.',
      });
      return;
    }

    response.json(user.displayUnit());
  }
}

export const Routes: IRoute[] = [
  {
    method: 'post',
    route: '/user/login',
    controller: UserController,
    action: 'login',
  },
  {
    method: 'post',
    route: '/user/register',
    controller: UserController,
    action: 'register',
  },
];
