import { countIncreases, countIncreasesWithWindow } from './count-increases';

type TestCase<T extends (...args: any[]) => any> = [Parameters<T>, ReturnType<T>];

{
  const testCases: TestCase<typeof countIncreases>[] = [
    [[[199, 200, 208, 210, 200, 207, 240, 269, 260, 263]], 7],
  ];

  describe('should count the number of increases', () => {
    it.each(testCases)('should work', (params, expected) => {
      expect(countIncreases(...params)).toEqual(expected);
    });
  });
}

{
  const testCases: TestCase<typeof countIncreasesWithWindow>[] = [
    [[[199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 3], 5],
  ];

  describe('should count the number of increases', () => {
    it.each(testCases)('should work', (params, expected) => {
      expect(countIncreasesWithWindow(...params)).toEqual(expected);
    });
  });
}
