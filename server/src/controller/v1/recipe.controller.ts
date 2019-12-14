import { RequiredScope, Controller, Get, RequireToken } from '@decorator';
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
    public async one (request: Request, _response: Response, _next: NextFunction): Promise<Recipe> {
        const { recipeId } = request.params;
        return this.recipeRepository.findOne(recipeId);
    }
}
