type Dictionary<T> = Record<string, T>;

export class Dec14 {
  private template: string;
  private instructions: Dictionary<string>;

  public constructor(input: string[]) {
    const [template, _blank, ...rest] = input;
    this.template = template;
    this.instructions = Object.fromEntries(rest.map(line => line.split(' -> ')));
  }

  public part1(): number {
    let polymer = this.template;
    for (let i = 0; i < 10; i++) {
      polymer = this.polymerization(polymer);
    }
    const count: Dictionary<number> = {};
    for (const element of polymer) {
      count[element] ??= 0;
      count[element]++;
    }
    const counts = Object.values(count);
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    return max - min;
  }

  public part2(): number {
    throw new Error('not implemented');
  }

  private polymerization(_polymer: string): string {
    const polymer = _polymer.split('');
    for (let i = polymer.length - 1; i --> 0;) {
      const pair = polymer.slice(i, i + 2).join('');
      const insert = this.instructions[pair];
      if (insert) {
        polymer.splice(i + 1, 0, insert);
      }
    }
    return polymer.join('');
  }
}
