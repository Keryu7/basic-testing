import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 2, 3];
    const expectedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(elements)).toStrictEqual(expectedList);
  });

  test('should generate linked list from values 2', () => {
    const elements = [4, 5, 6];
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toMatchSnapshot();
  });
});
