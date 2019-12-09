import { expect } from 'chai';
import request from 'supertest';
import jsYaml from 'js-yaml';
import fs from 'fs';
import appRoot from 'app-root-path';
import { OpenApiValidator } from 'express-openapi-validate';

import app from '../../../src';

/*
 * Load the OpenAPI document.
 */
const SPEC_FILE = `${appRoot}/spec/openapi.yaml`;
const openApiDocument = jsYaml.safeLoad(fs.readFileSync(SPEC_FILE, 'utf-8'));

/*
 * Create the validator from the spec document.
 */
const validator = new OpenApiValidator(openApiDocument, {});

export default () => {
    let responseValidator: (res: any) => void;

    describe('GET /users', () => {
        responseValidator = validator.validateResponse('get', '/users');

        it('should return a valid response', () => {
            return request(app)
                .get('/v1/users')
                .set({ 'X-API-KEY': 'sometoken' })
                .expect(200)
                .then((res) => expect(responseValidator(res)).to.be.undefined)
                .catch((err) => expect(err).to.be.undefined);
        });

        it('should return `401 Unauthorized` when no token is provided', () => {
            return request(app)
                .get('/v1/users')
                .expect(401)
                .then((res) => {
                    /* Validate spec */
                    expect(responseValidator(res)).to.be.undefined;

                    /* Validate response content */
                    expect(res.body.message).to.equal("'X-API-KEY' header required");
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].path).to.equal('/v1/users');
                    expect(res.body.errors[0].message).to.equal("'X-API-KEY' header required");
                })
                .catch((err) => expect(err).to.be.undefined);
        });
    });
};

