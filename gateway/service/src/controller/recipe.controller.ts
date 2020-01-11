import { Controller, RequiredScope, RequireToken, Route, ValidateArgs, ValidateClassArgs } from '@decorator';
import { Recipe, RecipeComment, Token } from '@entity';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { isNumber, isNumberGreaterThanZero, minLength } from '@helper/validator';
import { getToken } from '@helper';

@Controller('/recipe')
@RequireToken()
export class RecipeController {
    private commentRepository = getRepository(RecipeComment);
    private recipeRepository = getRepository(Recipe);
    private tokenRepository = getRepository(Token);

    @Route('get', '/all')
    @RequiredScope({ isAdmin: true })
    public async all (_request: Request, response: Response, _next: NextFunction): Promise<Response|void> {
        const [recipes, total] = await this.recipeRepository.findAndCount({
            select: ['id', 'title', 'image', 'imageType'],
            cache: 5 * 60 * 1000
        });
        response.json({ count: recipes.length, total, recipes });
    }

    @Route('get', '/autocomplete')
    @RequiredScope({ recipe: { read: true } })
    @ValidateArgs('query', { query: minLength(1) })
    public async autocomplete (request: Request, _response: Response, _next: NextFunction): Promise<Recipe[]> {
        const { query } = request.query;
        return this.recipeRepository
            .createQueryBuilder('recipe')
            .select(['recipe.id', 'recipe.title'])
            .where('recipe.title LIKE CONCAT(\'%\', :query, \'%\')', { query })
            .cache(true)
            .limit(10)
            .getMany();
    }

    @Route('get', '/search')
    @ValidateArgs('query', { limit: [isNumber, isNumberGreaterThanZero], offset: isNumber })
    public async search (request: Request, response: Response, _next: NextFunction): Promise<Response|void> {
        const { limit, offset } = request.query;

        const [recipes, total] = await this.recipeRepository.findAndCount({
            skip: Number(offset),
            take: Number(limit),
            cache: 5 * 60 * 1000
        });
        if (!recipes) {
            return response.status(404).json({
                message: 'No recipes found matching the specified paramaters.'
            });
        }

        response.json({ count: recipes.length, total, recipes });
    }

    @Route('get', '/:recipeId/comments')
    @ValidateClassArgs('params', Recipe, { recipeId: 'id' })
    public async comments (request: Request, response: Response, _next: NextFunction): Promise<Response> {
        const { recipeId } = request.params;

        const recipe = await this.recipeRepository.findOne(recipeId, { select: ['id', 'title'], cache: true });
        if (!recipe) {
            return response.status(404).json({
                message: `Recipe with id ${recipeId} was not found.`
            });
        }

        const comments = await this.commentRepository.find({ where: { recipe }, cache: true });
        response.json({ recipe, comments });
    }

    @Route('post', '/:recipeId/comments')
    @ValidateClassArgs('params', Recipe, { recipeId: 'id' })
    @ValidateClassArgs('body', RecipeComment, { comment: 'comment', rating: 'rating' })
    public async addComment (request: Request, response: Response, _next: NextFunction): Promise<Response> {
        const { recipeId } = request.params;
        const { comment, rating } = request.body;

        const recipe = await this.recipeRepository.findOne(recipeId, { cache: true });
        if (!recipe) {
            return response.status(404).json({
                message: `Recipe with id ${recipeId} was not found.`
            });
        }

        const token = getToken(request);
        const { user } = await this.tokenRepository.findOne({ token }, { cache: true });

        let recipeComment = await this.commentRepository.findOne({ where: { user } });
        if (recipeComment) {
            return response.status(400).json({
                message: `User has alread posted a comment on recipe with id ${recipeId}`
            });
        }

        recipeComment = new RecipeComment();
        recipeComment.comment = comment;
        recipeComment.rating = rating;
        recipeComment.recipe = recipe;
        recipeComment.user = user;

        recipeComment = await this.commentRepository.save(recipeComment);
        response.json(recipeComment);
    }

    @Route('get', '/:recipeId')
    @ValidateClassArgs('params', Recipe, { recipeId: 'id' })
    public async one (request: Request, response: Response, _next: NextFunction): Promise<Recipe|Response> {
        const { recipeId } = request.params;

        const recipe = await this.recipeRepository.findOne(recipeId, { cache: true });
        if (!recipe) {
            return response.status(404).json({
                message: `Recipe with id ${recipeId} was not found.`
            });
        }

        response.json(recipe);
    }
}
