import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 8, b: 4, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected when a = $a, b = $b, action = $action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
