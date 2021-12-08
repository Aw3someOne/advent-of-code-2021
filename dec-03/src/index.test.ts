import { part1 } from './part1';
import { part2 } from './part2';

type TestCase<T extends (...args: any[]) => any> = [Parameters<T>, ReturnType<T>];

const testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

const p1: TestCase<typeof part1>[] = [
  [[testInput], 198],
];

describe('should work', () => {
  it.each(p1)('should work', (params, expected) => {
    expect(part1(...params)).toEqual(expected);
  });
});

const p2: TestCase<typeof part2>[] = [
  [[testInput], 230],
];

describe('should work', () => {
  it.each(p2)('should work', (params, expected) => {
    expect(part2(...params)).toEqual(expected);
  });
});
