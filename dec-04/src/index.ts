import readline from 'readline';
import { part1 } from './part1';
import { part2 } from './part2';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const input: string[] = [];
rl.on('line', (str) => {
  input.push(str);
});

rl.on('close', () => {
  console.log('part 1: ', part1(input));
  // console.log('part 2: ', part2(input));
});
