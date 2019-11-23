import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { InfoCategory } from '../../entity/InfoCategory';
import { InfoQuestion } from '../../entity/InfoQuestion';
import Route from '../../types/route';

export class InfoController {

    private categoryRepository = getRepository(InfoCategory);
    private questionRepository = getRepository(InfoQuestion);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();
    }

    async allQuestions(request: Request, response: Response, next: NextFunction) {
        return this.questionRepository.find();
    }

}

export const Routes: Route[] = [
    {
        method: 'get',
        route: '/info',
        controller: InfoController,
        action: 'all'
    },
    {
        method: 'get',
        route: '/q',
        controller: InfoController,
        action: 'allQuestions'
    },
];
