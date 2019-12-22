import { Controller, RequiredScope, RequireToken, Route, ValidateArgs, ValidateClassArgs } from '@decorator';
import { Recipe } from '@entity';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { isNumber, isNumberGreaterThanZero, minLength } from '@helper/validator';

@Controller('/recipe')
@RequireToken()
export class RecipeController {
    private recipeRepository = getRepository(Recipe);

    @Route('get', '/all')
    @RequiredScope({ isAdmin: true })
    public async all (_request: Request, _response: Response, _next: NextFunction): Promise<Recipe[]> {
        return this.recipeRepository.find();
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
            .limit(10)
            .getMany();
    }

    @Route('get', '/search')
    @ValidateArgs('query', { limit: [isNumber, isNumberGreaterThanZero], offset: isNumber })
    public async search (request: Request, response: Response, _next: NextFunction): Promise<Recipe[]|Response> {
        const { limit, offset } = request.params;

        const recipes = await this.recipeRepository.find({
            skip: Number(offset),
            take: Number(limit),
            cache: 5 * 60 * 1000
        });
        if (!recipes) {
            return response.status(404).json({
                message: 'No recipes found matching the specified paramaters.'
            });
        }

        return recipes;
    }

    @Route('get', '/:recipeId')
    @ValidateClassArgs('params', Recipe, { recipeId: 'id' })
    public async one (request: Request, response: Response, _next: NextFunction): Promise<Recipe|Response> {
        const { recipeId } = request.params;

        const recipe = await this.recipeRepository.findOne(recipeId);
        if (!recipe) {
            return response.status(404).json({
                message: `Recipe with id ${recipeId} was not found.`
            });
        }

        response.json(recipe);
    }
}
