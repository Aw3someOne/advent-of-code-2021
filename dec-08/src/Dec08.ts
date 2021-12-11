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
    throw new Error('not implemented');
  }
}
