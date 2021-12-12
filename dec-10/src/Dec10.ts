const pairs = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['<', '>'],
];

const dict: Record<string, string> = Object.fromEntries(pairs);
const openChars = new Set(Object.keys(dict));
const errorValues: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const completeValues: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
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
          return p + errorValues[char];
        }
      }
      return p;
    }, 0);
  }

  public part2(): number {
    const completions = this.lines.reduce<string[]>((p, line) => {
      const stack = [];
      for (const char of line) {
        if (openChars.has(char)) {
          stack.push(char);
          continue;
        }
        const last = stack.pop()!;
        if (char !== dict[last]) {
          return p;
        }
      }
      return p.concat(stack.reverse().map(open => dict[open]).join(''));
    }, []);

    const scores = completions.map(scoreCompletionString).sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
  }
}

function scoreCompletionString(str: string) {
  return str.split('').reduce((p, c) => p * 5 + completeValues[c], 0);
}
