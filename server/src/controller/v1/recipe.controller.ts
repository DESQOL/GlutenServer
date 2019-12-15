import { RequiredScope, Controller, Get, RequireToken, ValidateParams } from '@decorator';
import { Recipe } from '@entity';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

@Controller('/v1/recipe')
@RequireToken()
export class RecipeController {
    private recipeRepository = getRepository(Recipe);

    @Get('/all')
    @RequiredScope({ isAdmin: true })
    public async all (_request: Request, _response: Response, _next: NextFunction): Promise<Recipe[]> {
        return this.recipeRepository.find();
    }

    @Get('/:recipeId')
    @ValidateParams(Recipe, { recipeId: 'id' })
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
