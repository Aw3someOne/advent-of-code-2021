import readline from 'readline';
import { Template } from './Template';

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
  const engine = new Template(input);
  console.log('part 1: ', engine.part1());
  console.log('part 2: ', engine.part2());
});
