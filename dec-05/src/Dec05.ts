interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

function isLineHorizontalOrVertical({ x1, y1, x2, y2 }: Line) {
  return x1 === x2 || y1 === y2;
}

export class Dec05 {
  private lines: Line[];
  private danger: number[][];
  public constructor(input: string[]) {
    this.lines = input.map(line => {
      const [[x1, y1], [x2, y2]] = line
        .split(' -> ')
        .map(s => s
          .split(',')
          .map(s => +s)
        );
      return {
        x1, y1,
        x2, y2,
      };
    });
    const numCols = Math.max(...this.lines.flatMap(({ x1, x2 }) => [x1, x2])) + 1;
    const numRows = Math.max(...this.lines.flatMap(({ y1, y2 }) => [y1, y2])) + 1;
    this.danger = Array.from<number[]>({ length: numCols })
      .map(() => Array.from<number>({ length: numRows }).fill(0));
  }

  public part1(): number {
    this.lines.forEach(({ x1, y1, x2, y2 }) => {
      if (x1 === x2) {
        const low = Math.min(y1, y2);
        const high = Math.max(y1, y2);
        for (let y = low; y <= high; y++) {
          this.danger[x1][y]++;
        }
      } else if (y1 === y2) {
        const low = Math.min(x1, x2);
        const high = Math.max(x1, x2);
        for (let x = low; x <= high; x++) {
          this.danger[x][y1]++;
        }
      }
    });
    return this.danger.flatMap(d => d).filter(d => d >= 2).length;
  }

  public part2(): number {
    throw new Error('not implemented');
  }
}
