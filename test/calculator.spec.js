import assert from 'assert';
import { add } from './calculator.js';

describe('Calculator', () => {
    describe('Add function', () => {
        it('should add two numbers correctly', () => {
            const result = add(2, 3);
            assert.strictEqual(result, 5, 'Expected two numbers to sum to 5');
        });

        it('should return a number', () => {
            const result = add(2, 3);
            assert.strictEqual(typeof result, 'number', 'Expected result to be a number');
        });
    });
});
