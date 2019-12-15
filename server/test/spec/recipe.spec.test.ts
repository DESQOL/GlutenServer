import request from 'supertest';

import App from './../../src/app';
import { expect } from 'chai';

export default (): void=> {
    let server = null;
    let app = null;

    before(async () => {
        server = new App();
        app = server.app;

        await server.listen();
    });

    after(() => {
        server.close();
    });

    describe('GET /all', () => {
        it('should not be accesible for users', (done) => {
            request(app)
                .get('/v1/recipe/all?api_key=user')
                .expect(403, {
                    message: 'Token does not have the required scope.',
                    errors: [
                        {
                            path: '/v1/recipe/all',
                            message: 'Token does not have the required scope.'
                        }
                    ]
                }, done);
        });

        it('should be accesible for admins', () => {
            return request(app)
                .get('/v1/recipe/all?api_key=admin')
                .expect(200)
                .then((res) => {
                    const { body } = res;

                    expect(body).to.be.an('array');
                    expect(body).to.have.length(2);
                });
        });
    });

    describe('GET /:recipeId', () => {
        const recipes = [{
            id: 1,
            title: 'Banana bread',
            description: 'This is a banana bread recipe',
            image: '',
            duration: '40 mins',
            rating: 0,
            ingredients: [
                {
                    id: 1,
                    amount: '1 1/2 cups'
                },
                {
                    id: 2,
                    amount: '1 tbsp'
                }
            ]
        }];

        it('should be accesible for users', (done) => {
            request(app)
                .get('/v1/recipe/1?api_key=user')
                .expect(200, recipes[0], done);
        });

        it('should be accesible for admins', (done) => {
            request(app)
                .get('/v1/recipe/1?api_key=admin')
                .expect(200, recipes[0], done);
        });

        it('should be return 400 if id below 1 is provided', (done) => {
            request(app)
                .get('/v1/recipe/0?api_key=admin')
                .expect(400, {
                    message: 'The server could not understand the request due to invalid syntax.',
                    errors: [
                        {
                            path: '.params.recipeId',
                            message: 'recipeId must not be less than 1'
                        }
                    ]
                }, done);
        });
    });
};
