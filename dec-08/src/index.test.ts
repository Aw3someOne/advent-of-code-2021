
import fs from 'fs';
import { EOL } from 'os';
import { Dec08 } from './Dec08';

type TestCase = [[string[]], number];

const testInput = fs.readFileSync('test').toString().split(EOL);

const p1: TestCase[] = [
  [[testInput], 26],
];

describe('should work', () => {
  it.each(p1)('should work', (params, expected) => {
    const engine = new Dec08(...params);
    expect(engine.part1()).toEqual(expected);
  });
});

const p2: TestCase[] = [
  [[testInput], 61229],
];

describe('should work', () => {
  it.each(p2)('should work', (params, expected) => {
    const engine = new Dec08(...params);
    expect(engine.part2()).toEqual(expected);
  });
});
