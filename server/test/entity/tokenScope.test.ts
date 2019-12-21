import { expect } from 'chai';
import { TokenScope, DefaultScope } from '@entity';
import { ScopeRequirement } from '@type';

export default (): void => {
    describe('Class', () => {
        it('should have 0 properties', () => {
            // Act
            const actual = Object.keys(new TokenScope()).length;

            // Assert
            expect(actual).to.equal(0);
        });

        it('getDefault() should have 1 property', () => {
            // Act
            const actual = Object.keys(new TokenScope().getDefault()).length;

            // Assert
            expect(actual).to.equal(1);
        });
    });

    describe('DefaultScope', () => {
        let result: TokenScope;

        beforeEach(() => {
            // Arrange
            result = undefined;
        });

        it('should have value \'false\' as default for isAdmin', () => {
            // Act
            result = TokenScope.from(DefaultScope);

            // Assert
            expect(result.isAdmin).to.be.false;
        });

        it('should have 1 property', () => {
            // Act
            const actual = Object.keys(DefaultScope).length;

            // Assert
            expect(actual).to.equal(1);
        });

        it('should have the same number of properties as .getDefault()', () => {
            // Act
            const actual = Object.keys(DefaultScope).length;
            const expected = Object.keys(new TokenScope().getDefault()).length;

            // Assert
            expect(actual).to.equal(expected);
        });
    });

    describe('from', () => {
        let result: TokenScope;

        beforeEach(() => {
            // Arrange
            result = undefined;
        });

        it('should return the DefaultScope object if an empty object is provided', () => {
            // Act
            result = TokenScope.from({});

            // Assert
            expect(result).to.deep.equal(DefaultScope);
        });

        it('should return the DefaultScope object if null is provided', () => {
            // Act
            result = TokenScope.from(null);

            // Assert
            expect(result).to.deep.equal(DefaultScope);
        });

        it('should return the DefaultScope object if undefined is provided', () => {
            // Act
            result = TokenScope.from(undefined);

            // Assert
            expect(result).to.deep.equal(DefaultScope);
        });

        it('should return the same TokenScope object', () => {
            // Arrange
            const reference = new TokenScope();
            reference.isAdmin = true;

            // Act
            result = TokenScope.from(reference);

            // Assert
            expect(result).to.deep.equal(reference);
            expect(result.isAdmin).to.be.true;
        });
    });

    describe('compareTo', () => {
        let result: boolean;
        let required: ScopeRequirement;
        let provided: Partial<TokenScope>;

        beforeEach(() => {
            // Arrange
            result = false;
            required = {};
            provided = {};
        });

        it('should return true if there is no required property', () => {
            // Act
            result = TokenScope.from(required).satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });

        it('should return true if ({}, null) is provided', () => {
            // Act
            result = TokenScope.from({}).satisfiedBy(null);

            // Assert
            expect(result).to.be.true;
        });

        it('should return true if (null, {}) is provided', () => {
            // Act
            result = TokenScope.from(null).satisfiedBy({});

            // Assert
            expect(result).to.be.true;
        });

        it('should return true if (null, null) is provided', () => {
            // Act
            result = TokenScope.from(null).satisfiedBy(null);

            // Assert
            expect(result).to.be.true;
        });

        it('should return true if (undefined, {}) is provided', () => {
            // Act
            result = TokenScope.from(undefined).satisfiedBy({});

            // Assert
            expect(result).to.be.true;
        });

        it('should return true if ({}, undefined) is provided', () => {
            // Act
            result = TokenScope.from({}).satisfiedBy(undefined);

            // Assert
            expect(result).to.be.true;
        });

        it('should return true if (undefined, undefined) is provided', () => {
            // Act
            result = TokenScope.from(undefined).satisfiedBy(undefined);

            // Assert
            expect(result).to.be.true;
        });

        it('should return true', () => {
            // Arrange
            required.isAdmin = false;
            provided.isAdmin = false;

            // Act
            result = TokenScope.from(required).satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });

        it('should return false', () => {
            // Arrange
            required.isAdmin = true;
            provided.isAdmin = false;

            // Act
            result = TokenScope.from(required).satisfiedBy(provided);

            // Assert
            expect(result).to.be.false;
        });

        it('should return false', () => {
            // Arrange
            required.isAdmin = false;
            provided.isAdmin = true;

            // Act
            result = TokenScope.from(required).satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });

        it('should return false', () => {
            // Arrange
            required.isAdmin = true;
            provided.isAdmin = true;

            // Act
            result = TokenScope.from(required).satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });
    });
};
