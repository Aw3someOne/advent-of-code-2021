import fs from 'fs';
import { EOL } from 'os';
import { Dec06 } from './Dec06';

type TestCase = [[string[], number], number];

const testInput = fs.readFileSync('test').toString().split(EOL);

const p1: TestCase[] = [
  [[testInput, 18], 26],
  [[testInput, 80], 5934],
  [[testInput, 256], 26984457539],
];

// describe('should work', () => {
//   it.each(p1)('should work', ([ctor, params], expected) => {
//     const engine = new Dec06(ctor);
//     expect(engine.part1(params)).toEqual(expected);
//   });
// });

describe('should work', () => {
  it.each(p1)('should work', ([ctor, params], expected) => {
    const engine = new Dec06(ctor);
    expect(engine.part2(params)).toEqual(expected);
  });
});
