import { Controller, Post } from '@decorator';
import { User } from '@entity';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

@Controller('/v1/user')
export class UserController {
    private userRepository = getRepository(User);

    @Post('/register')
    public async register (request: Request, response: Response, _next: NextFunction): Promise<object> {
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

    @Post('/login')
    public async login (request: Request, response: Response, _next: NextFunction): Promise<object> {
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
