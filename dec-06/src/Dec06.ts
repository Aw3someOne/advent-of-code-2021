export class Dec06 {
  private fish1: number[]; // naive way of doing this
  private fish2: number[];

  public constructor(input: string[]) {
    this.fish1 = input[0].split(',').map(s => +s);
    this.fish2 = Array.from<number>({ length: 9 }).fill(0);
    input[0].split(',').forEach(s => {
      this.fish2[+s]++;
    });
  }

  public part1(days: number): number {
    for (let i = 0; i < days; i++) {
      this.advance1();
    }
    return this.fish1.length;
  }

  public part2(days: number): number {
    for (let i = 0; i < days; i++) {
      this.advance2();
    }
    return this.fish2.reduce((p, c) => p + c, 0);
  }

  private advance1(): void {
    for (let i = this.fish1.length; i --> 0;) {
      if (this.fish1[i] > 0) {
        this.fish1[i]--;
      } else {
        this.fish1[i] = 6;
        this.fish1.push(8);
      }
    }
  }

  private advance2(): void {
    const prev = this.fish2;
    this.fish2 = [];
    for (let i = 0; i < 8; i++) {
      this.fish2[i] = prev[i + 1];
    }
    this.fish2[6] += prev[0];
    this.fish2[8] = prev[0];
  }
}
