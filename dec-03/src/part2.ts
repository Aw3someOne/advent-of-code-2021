function oxygen(input: string[]): number {
  for (let i = 0; i < input[0].length; i++) {
    const counts = { 0: 0, 1: 0 };
    input.forEach(line => {
      counts[line[i] as '0' | '1']++;
    });
    if (counts[1] >= counts[0]) {
      input = input.filter(line => line[i] === '1');
    } else {
      input = input.filter(line => line[i] === '0');
    }
    if (input.length === 1) {
      return parseInt(input[0], 2);
    }
  }
  throw new Error();
}

function co2(input: string[]): number {
  for (let i = 0; i < input[0].length; i++) {
    const counts = { 0: 0, 1: 0 };
    input.forEach(line => {
      counts[line[i] as '0' | '1']++;
    });
    if (counts[1] >= counts[0]) {
      input = input.filter(line => line[i] === '0');
    } else {
      input = input.filter(line => line[i] === '1');
    }
    if (input.length === 1) {
      return parseInt(input[0], 2);
    }
  }
  throw new Error();
}

export function part2(input: string[]): number {
  return oxygen(input) * co2(input);
}
