import { AdminScope, Controller, Get } from '@decorator';
import { Recipe } from '@entity';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

@Controller('/v1/recipe')
export class RecipeController {
    private recipeRepository = getRepository(Recipe);

    @Get('/all')
    @AdminScope()
    public async all (_request: Request, _response: Response, _next: NextFunction): Promise<Recipe[]> {
        return this.recipeRepository.find();
    }

    @Get('/:recipeId')
    public async one (request: Request, _response: Response, _next: NextFunction): Promise<Recipe> {
        const { recipeId } = request.params;
        return this.recipeRepository.findOne(recipeId);
    }
}
