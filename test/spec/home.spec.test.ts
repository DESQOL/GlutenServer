import app from '../../src/app';
import { expect } from 'chai';
import * as fs from 'fs';
import { OpenApiValidator } from 'express-openapi-validate';

import request from 'supertest';
import jsYaml from 'js-yaml';
import appRoot from 'app-root-path';

// Load the OpenAPI document
const openApiDocument = jsYaml.safeLoad(fs.readFileSync(`${appRoot}/src/spec/home.yaml`, 'utf-8'));

// Create the validator from the spec document
const validator = new OpenApiValidator(openApiDocument, {});

export default function suite(): void {
    describe('index', () => {
        // Create the response validator for the GET / endpoint
        const validateResponse = validator.validateResponse('get', '/');

        it('should return a valid response', () => {
            return request(app)
                .get('/')
                .expect(200)
                .then((res) => {
                    expect(validateResponse(res)).to.be.undefined; // validate
                })
                .catch((err) => expect(err).to.be.undefined);
        });
    });
}
