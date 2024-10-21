import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 7, b: -9, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(-2);
  });

  test('should subtract two numbers', () => {
    const input = { a: 32, b: 17, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(15);
  });

  test('should multiply two numbers', () => {
    const input = { a: 7, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(21);
  });

  test('should divide two numbers', () => {
    const input = { a: 21, b: 3, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(7);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 3, b: 5, action: 'invalid_action' };
    const result = simpleCalculator(input);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidInputs = [
      { a: '3', b: 5, action: Action.Add },
      { a: 3, b: null, action: Action.Subtract },
      { a: {}, b: 5, action: Action.Multiply },
      { a: 3, b: 5, action: undefined },
    ];

    invalidInputs.forEach(input => {
      const result = simpleCalculator(input);
      expect(result).toBeNull();
    });
  });
});