export class Dec07 {
  private positions: number[];
  public constructor(input: string[]) {
    this.positions = input[0].split(',').map(s => +s);
  }

  public part1(): number {
    const min = Math.min(...this.positions);
    const max = Math.max(...this.positions);

    let pos = 0;
    let minFuel = Number.MAX_SAFE_INTEGER;
    for (let i = min; i <= max; i++) {
      const fuel = this.positions.reduce((p, c) => p + Math.abs(c - i), 0);
      if (fuel < minFuel) {
        minFuel = fuel;
        pos = i;
      }
    }
    return minFuel;
  }

  public part2(): number {
    const min = Math.min(...this.positions);
    const max = Math.max(...this.positions);

    let pos = 0;
    let minFuel = Number.MAX_SAFE_INTEGER;
    for (let i = min; i <= max; i++) {
      const fuel = this.positions.reduce((p, c) => {
        const delta = Math.abs(c - i);
        return p + delta * (1 + delta) / 2;
      }, 0);
      if (fuel < minFuel) {
        minFuel = fuel;
        pos = i;
      }
    }
    return minFuel;
  }
}
