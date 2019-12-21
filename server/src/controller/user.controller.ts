import { Controller, Route, ValidateClassArgs } from '@decorator';
import { Token, User } from '@entity';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { getToken, DefaultMessages } from '@helper';

@Controller('/user')
export class UserController {
    private tokenRepository = getRepository(Token);
    private userRepository = getRepository(User);

    @Route('post', '/register')
    @ValidateClassArgs('body', User, { email: 'email', name: 'name', password: 'password' })
    public async register (request: Request, response: Response, _next: NextFunction): Promise<Response|object> {
        const { email, name, password } = request.body;

        let user = await this.userRepository.findOne({ email });
        if (user) {
            return response.status(409).json({
                message: 'Specified email address is already associated with an account.',
            });
        }

        user = new User();
        user.name = name;
        user.email = email;
        user.password = await User.hashPassword(password);

        const errors = await validate(user);
        if (errors.length > 0) {
            return response.status(400).json({
                message: DefaultMessages[400],
                errors,
            });
        }

        user = await this.userRepository.save(user);
        response.json(user);
    }

    @Route('post', '/login')
    @ValidateClassArgs('body', User, { email: 'email', password: 'password' })
    public async login (request: Request, response: Response, _next: NextFunction): Promise<object> {
        const { email, password } = request.body;

        const user = await this.userRepository.findOne({ email });
        if (!user) {
            return response.status(403).json({
                message: 'Incorrect email or password.',
            });
        }

        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            return response.status(403).json({
                message: 'Incorrect email or password.',
            });
        }

        response.json(user);
    }

    @Route('get', '/profile', { tokenRequired: true })
    public async profile (request: Request, response: Response, _next: NextFunction): Promise<void> {
        const token = getToken(request);

        const { user } = await this.tokenRepository.findOne({ token });
        response.json(user);
    }
}
