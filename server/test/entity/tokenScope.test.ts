import { expect } from 'chai';
import { TokenScope } from '@entity';

export default (): void => {
    describe('compareTo', () => {
        let required: TokenScope;
        let provided: TokenScope;

        beforeEach(() => {
            // Arrange
            required = new TokenScope();
            provided = new TokenScope();
        });

        it('should return true', () => {
            // Arrange
            required.isAdmin = false;
            provided.isAdmin = false;

            // Act
            const result = required.satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });

        it('should return false', () => {
            // Arrange
            required.isAdmin = true;
            provided.isAdmin = false;

            // Act
            const result = required.satisfiedBy(provided);

            // Assert
            expect(result).to.be.false;
        });

        it('should return false', () => {
            // Arrange
            required.isAdmin = false;
            provided.isAdmin = true;

            // Act
            const result = required.satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });

        it('should return false', () => {
            // Arrange
            required.isAdmin = true;
            provided.isAdmin = true;

            // Act
            const result = required.satisfiedBy(provided);

            // Assert
            expect(result).to.be.true;
        });
    });
};
