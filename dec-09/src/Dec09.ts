export class Dec09 {
  private heightmap: number[][];
  private numRows: number;
  private numCols: number;

  public constructor(input: string[]) {
    this.heightmap = input.map(row => row.split('').map(s => +s));
    this.numRows = this.heightmap.length;
    this.numCols = this.heightmap[0].length;
  }

  public part1(): number {
    let sumOfRiskLevels = 0;
    for (let r = 0; r < this.heightmap.length; r++) {
      for (let c = 0; c < this.heightmap[r].length; c++) {
        if (this.isLocalMin(r, c)) {
          sumOfRiskLevels += 1 + this.heightmap[r][c];
        }
      }
    }
    return sumOfRiskLevels;
  }

  public part2(): number {
    throw new Error('not implemented');
  }

  private isLocalMin(row: number, col: number): boolean {
    const height = this.heightmap[row][col];
    {
      const up = row - 1;
      if (up >= 0 && this.heightmap[up][col] <= height) {
        return false;
      }
    }
    {
      const down = row + 1;
      if (down < this.numRows && this.heightmap[down][col] <= height) {
        return false;
      }
    }
    {
      const left = col - 1;
      if (left >= 0 && this.heightmap[row][left] <= height) {
        return false;
      }
    }
    {
      const right = col + 1;
      if (right < this.numCols && this.heightmap[row][right] <= height) {
        return false;
      }
    }
    return true;
  }
}
