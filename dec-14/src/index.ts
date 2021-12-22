import readline from 'readline';
import { Dec14 } from './Dec14';

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
  const engine = new Dec14(input);
  console.log('part 1: ', engine.part1());
  // console.log('part 2: ', engine.part2());
});
