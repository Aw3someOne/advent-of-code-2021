import { countIncreases } from './count-increases';

type TestCase<T extends (...args: any[]) => any> = [Parameters<T>, ReturnType<T>];

const testCases: TestCase<typeof countIncreases>[] = [
  [[[199, 200, 208, 210, 200, 207, 240, 269, 260, 263]], 7],
];

describe('should count the number of increases', () => {
  it.each(testCases)('should work', (params, expected) => {
    expect(countIncreases(...params)).toEqual(expected);
  });
});
