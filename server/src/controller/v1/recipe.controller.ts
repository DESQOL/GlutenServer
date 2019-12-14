import { AdminScope, Controller, Get } from '@decorator';
import { Recipe } from '@entity';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

@Controller('/v1/recipe')
export class RecipeController {
  private recipeRepository = getRepository(Recipe);

  @Get('/all')
  @AdminScope()
  public async all (request: Request, response: Response) {
    return this.recipeRepository.find();
  }

  @Get('/:recipeId')
  public async one (request: Request, response: Response) {
    const { recipeId } = request.params;
    return this.recipeRepository.findOne(recipeId);
  }
}
