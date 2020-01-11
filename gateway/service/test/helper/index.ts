import validatorTest from './validator';
import getToken from './getToken.test';

export default (): void => {
    describe('Validator', validatorTest);
    describe('getToken', getToken);
};
