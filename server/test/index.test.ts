import app from '../src';

/*
 * Makes sure that the app is ready, and thus has a database connection, before starting any test(s).
 */
before((done) => app.on('listening', done));

import specTest from './spec';

describe('', () => {
    describe('Spec', specTest);
});
