interface Entry {
  patterns: string[];
  value: string[];
}

export class Dec08 {
  private entries: Entry[];

  public constructor(input: string[]) {
    this.entries = input.map((line) => {
      const [patterns, value] = line.split('|').map(s => s.trim()).map(s => s.split(' ').map(s => s.trim()));
      return { patterns, value };
    });
  }

  public part1(): number {
    return this.entries.reduce((p, c) => {
      return p + c.value.filter(d => {
        switch (d.length) {
          case 2:
          case 3:
          case 4:
          case 7:
            return true;
          default:
            return false;
        }
      }).length;
    }, 0);
  }

  public part2(): number {
    return this.entries.reduce((p, c) => {
      const dict: Record<string, number> = {};
      const reverseLookup: Record<number, string> = {};
      c.patterns.forEach(pattern => {
        const potentialDigit = this.easyPattern(pattern);
        if (typeof potentialDigit === 'number') {
          dict[patternKey(pattern)] = potentialDigit;
          reverseLookup[potentialDigit] = pattern;
        }
      });
      const remaining = c.patterns.filter(pattern => dict[pattern] === undefined);
      // 9 (6) 4 in common with 4 matches with 1, 3, 5, and 7
      // 2 (5) 2 in common with 4
      // 0 (6) 3 in common with 4 matches with 1 and 7
      // 3 (5) 3 in common with 4 matches 7
      const nine = findMatch(remaining, pattern => pattern.length === 6 && intersect(pattern, reverseLookup[4]) === 4);
      const two = findMatch(remaining, pattern => pattern.length === 5 && intersect(pattern, reverseLookup[4]) === 2);
      const zero = findMatch(remaining, pattern => pattern.length === 6 && intersect(pattern, reverseLookup[7]) === 3);
      const three = findMatch(remaining, pattern => pattern.length === 5 && intersect(pattern, reverseLookup[7]) === 3);
      // 5 (5) 3 in common with 4 matches 6
      // 6 (6) 3 in common with 4
      const fiveSix = remaining.filter(pattern => ![nine, two, zero, three].includes(pattern));
      const five = findMatch(fiveSix, pattern => pattern.length === 5);
      const six = findMatch(fiveSix, pattern => pattern.length === 6);
      dict[patternKey(nine)] = 9;
      dict[patternKey(two)] = 2;
      dict[patternKey(zero)] = 0;
      dict[patternKey(three)] = 3;
      dict[patternKey(five)] = 5;
      dict[patternKey(six)] = 6;

      return p + +(c.value.map(c => {
        const digit = dict[patternKey(c)];
        return digit;
      }).join(''));
    }, 0);
  }

  private easyPattern(pattern: string): number | undefined {
    switch (pattern.length) {
      case 2: return 1;
      case 3: return 7;
      case 4: return 4;
      case 7: return 8;
      default: return undefined;
    }
  }
}

function patternKey(pattern: string): string {
  return pattern.split('').sort().join('');
}

function intersect(a: string, b: string): number {
  return a.split('').filter(aa => b.includes(aa)).length;
}

function findMatch(A: string[], pred: (p: string) => boolean): string {
  const filtered = A.filter(pred);
  if (filtered.length !== 1) {
    throw new Error('you were wrong');
  }
  const [match] = filtered;
  A.splice(A.indexOf(match), 1);
  return match;
}
