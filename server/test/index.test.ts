import app from '../src';
import { expect } from 'chai';
import request from 'supertest';
import jsYaml from 'js-yaml';
import fs from 'fs';
import appRoot from 'app-root-path';
import { OpenApiValidator } from 'express-openapi-validate';

/*
 * Load the OpenAPI document.
 */
const SPEC_FILE = `${appRoot}/spec/openapi.yaml`;
const openApiDocument = jsYaml.safeLoad(fs.readFileSync(SPEC_FILE, 'utf-8'));

/*
 * Create the validator from the spec document.
 */
const validator = new OpenApiValidator(openApiDocument, {});

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

describe('index', () => {
    // Create the response validator for the GET / endpoint
    const validateResponse = validator.validateResponse('get', '/users');

    it('should return a valid response', () => {
        return request(app)
            .get('/v1/users')
            .expect(200)
            .then((res) => {
                expect(validateResponse(res)).to.be.undefined; //validate
            })
            .catch((err) => expect(err).to.be.undefined);
    });
});
