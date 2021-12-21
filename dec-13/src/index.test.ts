
import fs from 'fs';
import { EOL } from 'os';
import { Dec13 } from './Dec13';

type TestCase = [[string[]], number];

const testInput = fs.readFileSync('test').toString().split(EOL);

const p1: TestCase[] = [
  [[testInput], 17],
];

describe('should work', () => {
  it.each(p1)('should work', (params, expected) => {
    const engine = new Dec13(...params);
    expect(engine.part1()).toEqual(expected);
  });
});
