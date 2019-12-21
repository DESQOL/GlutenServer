import request from 'supertest';

import App from './../../src/app';

export default (): void => {
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

    describe('GET /user/profile', () => {
        it('should return the profile associated with the token', (done) => {
            request(app)
                .get('/user/profile')
                .set('X-API-KEY', 'admin')
                .expect(200, {
                    id: 1,
                    name: 'Martijn Vegter',
                    email: 'martijn.vegter@hva.nl',
                }, done);
        });

        it('should require a token to be provided', (done) => {
            request(app)
                .get('/user/profile')
                .expect(401, {
                    message: "'X-API-KEY' header required",
                    errors: [
                        {
                            path: '/user/profile',
                            message: "'X-API-KEY' header required"
                        }
                    ]
                }, done);
        });
    });

    describe('POST /user/login', () => {
        const defaultLogin = {
            email: 'martijn.vegter@hva.nl',
            password: '12345678',
        };

        it('should return the user object on successfull login', (done) => {
            request(app)
                .post('/user/login')
                .send(defaultLogin)
                .expect(200, {
                    id: 1,
                    name: 'Martijn Vegter',
                    email: 'martijn.vegter@hva.nl',
                }, done);
        });

        it('incorrect email', (done) => {
            request(app)
                .post('/user/login')
                .send(Object.assign(defaultLogin, { email: '' }))
                .expect(403, {
                    message: 'Incorrect email or password.',
                }, done);
        });

        it('incorrect password', (done) => {
            request(app)
                .post('/user/login')
                .send(Object.assign(defaultLogin, { password: '' }))
                .expect(403, {
                    message: 'Incorrect email or password.',
                }, done);
        });

        it('missing email', (done) => {
            request(app)
                .post('/user/login')
                .send({ password: '' })
                .expect(400, {
                    message: "request.body should have required property 'email'",
                    errors: [
                        {
                            path: '.body.email',
                            message: "should have required property 'email'",
                            errorCode: 'required.openapi.validation',
                        },
                    ],
                }, done);
        });

        it('missing password', (done) => {
            request(app)
                .post('/user/login')
                .send({ email: '' })
                .expect(400, {
                    message: "request.body should have required property 'password'",
                    errors: [
                        {
                            path: '.body.password',
                            message: "should have required property 'password'",
                            errorCode: 'required.openapi.validation',
                        },
                    ],
                }, done);
        });

        it('extra property', (done) => {
            request(app)
                .post('/user/login')
                .send(Object.assign(defaultLogin, { not: 'allowed' }))
                .expect(400, {
                    message: 'request.body should NOT have additional properties',
                    errors: [
                        {
                            path: '.body.not',
                            message: 'should NOT have additional properties',
                            errorCode: 'additionalProperties.openapi.validation',
                        },
                    ],
                }, done);
        });
    });
};
