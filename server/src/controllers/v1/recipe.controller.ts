import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IRoute from 'types/route';
import { AdminScope, Controller, Get } from '../../decorator';
import Recipe from '../../entity/recipe';

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

export const Routes: IRoute[] = [];
