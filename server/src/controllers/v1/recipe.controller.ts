import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IRoute from 'types/route';
import Recipe from '../../entity/recipe';

export class RecipeController {
  private recipeRepository = getRepository(Recipe);

  public async all (request: Request, response: Response) {
    return this.recipeRepository.find();
  }
}

export const Routes: IRoute[] = [
  {
    method: 'get',
    route: '/recipe/all',
    controller: RecipeController,
    action: 'all',
  },
];
