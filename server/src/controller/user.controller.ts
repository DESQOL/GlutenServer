import { Controller, Route, ValidateClassArgs } from '@decorator';
import { DefaultScope, Recipe, Token, User } from '@entity';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { DefaultMessages, getToken } from '@helper';

@Controller('/user')
export class UserController {
    private recipeRepository = getRepository(Recipe);
    private tokenRepository = getRepository(Token);
    private userRepository = getRepository(User);

    @Route('post', '/register')
    @ValidateClassArgs('body', User, { email: 'email', name: 'name', password: 'password' })
    public async register (request: Request, response: Response, _next: NextFunction): Promise<Response|object> {
        const { email, name, password } = request.body;

        let user = await this.userRepository.findOne({ email }, { cache: true });
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
        user = await this.userRepository.findOne(user.id, { cache: 1 * 60 * 1000 });

        const token = this.tokenRepository.create({ scope: DefaultScope });
        token.token = Token.generate();
        token.user = user;

        await this.tokenRepository.save(token);
        response.json(Object.assign({}, user, { token: token.token }));
    }

    @Route('post', '/login')
    @ValidateClassArgs('body', User, { email: 'email', password: 'password' })
    public async login (request: Request, response: Response, _next: NextFunction): Promise<object> {
        const { email, password } = request.body;

        const user = await this.userRepository.findOne({ email }, { cache: true });
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

        const token = this.tokenRepository.create({ scope: DefaultScope });
        token.token = Token.generate();
        token.user = user;

        await this.tokenRepository.save(token);
        response.json(Object.assign({}, user, { token: token.token }));
    }

    @Route('get', '/profile', { tokenRequired: true })
    public async profile (request: Request, response: Response, _next: NextFunction): Promise<void> {
        const token = getToken(request);

        const { user } = await this.tokenRepository.findOne({ token });
        response.json(user);
    }

    @Route('get', '/favorites', { tokenRequired: true })
    public async getFavorites (request: Request, response: Response, _next: NextFunction): Promise<void> {
        const token = getToken(request);
        const { user } = await this.tokenRepository.findOne({ token }, { cache: true });

        response.json(user.favoriteRecipes || []);
    }

    @Route('put', '/favorites', { tokenRequired: true })
    public async addFavorites (request: Request, response: Response, _next: NextFunction): Promise<Response|void> {
        const token = getToken(request);
        const { user } = await this.tokenRepository.findOne({ token });

        const { recipeId } = request.body;
        const recipe = await this.recipeRepository.findOne(recipeId, { cache: true });
        if (!recipe) {
            return response.status(404).json({
                message: 'No recipe found matching the specified id.'
            });
        }

        if (!user.favoriteRecipes) {
            user.favoriteRecipes = [];
        }

        user.favoriteRecipes.push(recipe);
        await this.userRepository.save(user);

        response.json(user.favoriteRecipes || []);
    }

    @Route('delete', '/favorites', { tokenRequired: true })
    public async removeFavorite (request: Request, response: Response, _next: NextFunction): Promise<Response|void> {
        const token = getToken(request);
        const { user } = await this.tokenRepository.findOne({ token });

        const { recipeId } = request.body;
        const recipe = await this.recipeRepository.findOne(recipeId, { cache: true });
        if (!recipe) {
            return response.status(404).json({
                message: 'No recipe found matching the specified id.'
            });
        }

        if (!user.favoriteRecipes) {
            user.favoriteRecipes = [];
        }

        user.favoriteRecipes = user.favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
        await this.userRepository.save(user);

        response.json(user.favoriteRecipes || []);
    }
}
