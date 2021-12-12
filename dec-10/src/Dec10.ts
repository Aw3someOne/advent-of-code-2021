const pairs = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
];

const dict: Record<string, string> = Object.fromEntries(pairs);
const openChars = new Set(Object.keys(dict));
const pointValues: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

export class Dec10 {
  private lines: string[];

  public constructor(input: string[]) {
    this.lines = input;
  }

  public part1(): number {
    return this.lines.reduce((p, line) => {
      const stack = [];
      for (const char of line) {
        if (openChars.has(char)) {
          stack.push(char);
          continue;
        }
        const last = stack.pop()!;
        if (char !== dict[last]) {
          return p + pointValues[char];
        }
      }
      return p;
    }, 0);
  }

  public part2(): number {
    throw new Error('not implemented');
  }
}
