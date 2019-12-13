import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IRoute from 'types/route';
import Recipe from '../../entity/recipe';

export class RecipeController {
  private recipeRepository = getRepository(Recipe);

  public async all (request: Request, response: Response) {
    return this.recipeRepository.find();
  }

  public async one (request: Request, response: Response) {
    const { recipeId } = request.params;
    return this.recipeRepository.findOne(recipeId)
  }
}

export const Routes: IRoute[] = [
  {
    method: 'get',
    route: '/recipe/all',
    controller: RecipeController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/recipe/:recipeId',
    controller: RecipeController,
    action: 'one',
  },
];
