import { normalizePort } from '../../src/util';
import { expect } from 'chai';

export default function suite(): void {
    // Arrange
    let port: number | string | boolean;

    describe('Output', () => {
        it('should return a number', () => {
            // Act
            port = normalizePort('3000');

            // Assert
            expect(port).to.be.a('number');
        });

        it('should return a string', () => {
            // Act
            port = normalizePort('asdf');

            // Assert
            expect(port).to.be.a('string');
        });

        it('should return a boolean', () => {
            // Act
            port = normalizePort('-1');

            // Assert
            expect(port).to.be.false;
        });
    });
}
