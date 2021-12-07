import readline from 'readline';
import { countIncreases } from './count-increases';

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
  console.log(countIncreases(input));
});
