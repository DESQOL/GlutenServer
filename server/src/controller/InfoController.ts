import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { InfoCategory } from '../entity/InfoCategory';

export class InfoController {

    private categoryRepository = getRepository(InfoCategory);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();
    }

}

export const Routes = [
    {
        method: 'get',
        route: '/info',
        controller: InfoController,
        action: 'all'
    },
];
