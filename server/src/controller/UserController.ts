import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}

export const Routes = [{
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all'
}, {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one'
}, {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save'
}, {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove'
}];
