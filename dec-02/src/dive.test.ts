import { dive } from './dive';

type TestCase<T extends (...args: any[]) => any> = [Parameters<T>, ReturnType<T>];

const testCases: TestCase<typeof dive>[] = [
  [[['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']], 150],
];

describe('should count the number of increases', () => {
  it.each(testCases)('should work', (params, expected) => {
    expect(dive(...params)).toEqual(expected);
  });
});
