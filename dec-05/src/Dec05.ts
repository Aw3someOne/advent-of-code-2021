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

  private makeOverlapCalculator = (includeDiagonals: boolean) => {
    return ({ x1, y1, x2, y2 }: Line): void => {
      if (x1 === x2) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          this.danger[x1][y]++;
        }
      } else if (y1 === y2) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          this.danger[x][y1]++;
        }
      } else if (includeDiagonals) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dydx = dy / dx;
        for (let i = Math.min(0, dx); i <= Math.max(0, dx); i++) {
          this.danger[x1 + i][y1 + dydx * i]++;
        }
      }
    };
  };

  public part1(): number {
    this.lines.forEach(this.makeOverlapCalculator(false));
    return this.danger.flatMap(d => d).filter(d => d >= 2).length;
  }

  public part2(): number {
    this.lines.forEach(this.makeOverlapCalculator(true));
    return this.danger.flatMap(d => d).filter(d => d >= 2).length;
  }
}
