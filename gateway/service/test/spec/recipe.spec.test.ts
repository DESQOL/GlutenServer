import request from 'supertest';

import App from './../../src/app';
import { expect } from 'chai';

export default (): void => {
    let server = null;
    let app = null;

    before(async () => {
        server = new App();
        app = server.app;

        await server.listen();
    });

    after(async () => {
        await server.close();
    });

    describe('GET /all', () => {
        it('should not be accesible for users', (done) => {
            request(app)
                .get('/recipe/all?api_key=read')
                .expect(403, {
                    message: 'Token does not have the required scope.',
                    errors: [
                        {
                            path: '/recipe/all',
                            message: 'Token does not have the required scope.'
                        }
                    ]
                }, done);
        });

        it('should be accesible for admins', () => {
            return request(app)
                .get('/recipe/all?api_key=admin')
                .expect(200)
                .then((res) => {
                    const { body } = res;

                    expect(body).to.be.an('array');
                    expect(body).to.have.length(0);
                });
        });
    });

    describe('GET /:recipeId', () => {
        it('should be accesible for users', (done) => {
            request(app)
                .get('/recipe/1?api_key=read')
                .expect(404, {
                    message: 'Recipe with id 1 was not found.'
                }, done);
        });

        it('should be accesible for admins', (done) => {
            request(app)
                .get('/recipe/1?api_key=admin')
                .expect(404, {
                    message: 'Recipe with id 1 was not found.'
                }, done);
        });

        it('should be return 400 if id below 1 is provided', (done) => {
            request(app)
                .get('/recipe/0?api_key=admin')
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
