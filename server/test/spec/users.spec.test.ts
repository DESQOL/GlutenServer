import { expect } from 'chai';
import request from 'supertest';

import App from './../../src/app';

export default () => {
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

  describe('GET /users', () => {
    const endpoint: string = '/v1/users';
    const responses: object = {
      200: [
        {
          id: 1,
          name: 'Martijn',
        },
      ],
      401: {
        message: "'X-API-KEY' header required",
        errors: [
          {
            path: '/v1/users',
            message: "'X-API-KEY' header required",
          },
        ],
      },
    };

    it('should return 401 if the api key is missing', async () => {
      request(app)
        .get(endpoint)
        .expect(401)
        .then((res) => expect(res.body).to.deep.equal(responses['401']))
        .catch((err) => expect(err).to.be.undefined);
    });

    it('should return 200 if header \'X-API-KEY\' is provided', async () => {
      request(app)
        .get(endpoint)
        .set('X-API-KEY', 'sometoken')
        .expect(200)
        .then((res) => expect(res.body).to.deep.equal(responses['200']))
        .catch((err) => expect(err).to.be.undefined);
    });

    it('should return 200 if query \'api_key\' is provided', async () => {
      request(app)
        .get(`${endpoint}?api_key=sometoken`)
        .expect(200)
        .then((res) => expect(res.body).to.deep.equal(responses['200']))
        .catch((err) => expect(err).to.be.undefined);
    });
  });
};
