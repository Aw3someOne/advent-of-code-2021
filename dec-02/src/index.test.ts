import { part1 } from './part1';
import { part2 } from './part2';

type TestCase<T extends (...args: any[]) => any> = [Parameters<T>, ReturnType<T>];

const p1: TestCase<typeof part1>[] = [
  [[['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']], 150],
];

describe('should count the number of increases', () => {
  it.each(p1)('should work', (params, expected) => {
    expect(part1(...params)).toEqual(expected);
  });
});

const p2: TestCase<typeof part2>[] = [
  [[['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']], 900],
];

describe('should count the number of increases', () => {
  it.each(p2)('should work', (params, expected) => {
    expect(part2(...params)).toEqual(expected);
  });
});
