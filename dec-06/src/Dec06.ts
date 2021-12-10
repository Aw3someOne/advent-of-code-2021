export class Dec06 {
  private fish: number[];
  public constructor(input: string[]) {
    this.fish = input[0].split(',').map(s => +s);
  }

  public part1(): number {
    for (let i = 0; i < 80; i++) {
      this.advance();
    }
    return this.fish.length;
  }

  public part2(): number {
    throw new Error('not implemented');
  }

  private advance(): void {
    for (let i = this.fish.length; i --> 0;) {
      if (this.fish[i] > 0) {
        this.fish[i]--;
      } else {
        this.fish[i] = 6;
        this.fish.push(8);
      }
    }
  }
}
