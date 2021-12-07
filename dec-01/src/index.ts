import readline from 'readline';
import { countIncreases, countIncreasesWithWindow } from './count-increases';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const input: number[] = [];
rl.on('line', (str) => {
  input.push(+str);
});

rl.on('close', () => {
  console.log('part 1: ', countIncreases(input));
  console.log('part 2: ', countIncreasesWithWindow(input, 3));
});
