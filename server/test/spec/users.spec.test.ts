import { expect } from 'chai';
import request from 'supertest';
import jsYaml from 'js-yaml';
import fs from 'fs';
import appRoot from 'app-root-path';
import { OpenApiValidator } from 'express-openapi-validate';

import app from '../../src';

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
                .expect(200)
                .then((res) => expect(responseValidator(res)).to.be.undefined)
                .catch((err) => expect(err).to.be.undefined);
        });
    });
};

