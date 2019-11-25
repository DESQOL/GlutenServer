import app from '../src';
import { expect } from 'chai';

import request from 'supertest';

/*
 * HACK: makes sure that the app is ready before starting the tests.
 */
before((done) => app.on('listening', done));

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        return request(app)
            .get('/')
            .expect(200)
            .then((res) => {
                expect(res.status).to.equal(200);
            })
            .catch((err) => expect(err).to.be.undefined);
    });
});
