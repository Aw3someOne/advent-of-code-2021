import readline from 'readline';
import { Dec06 } from './Dec06';

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
  const engine = new Dec06(input);
  // console.log('part 1: ', engine.part1(80));
  console.log('part 2: ', engine.part2(256));
});
