interface Octopus {
  energy: number;
  neighbors: Octopus[];
}

export class Dec11 {
  private nodes: Octopus[][];
  private flatnodes: Octopus[];

  public constructor(input: string[]) {
    const energyLevels = input.map(row => row.split('').map(s => +s));
    this.nodes = [];
    for (let r = 0; r < energyLevels.length; r++) {
      this.nodes[r] = [];
      for (let c = 0; c < energyLevels[r].length; c++) {
        this.nodes[r][c] = {
          energy: energyLevels[r][c],
          neighbors: [],
        };
      }
    }

    for (let r = 0; r < this.nodes.length; r++) {
      for (let c = 0; c < this.nodes[r].length; c++) {
        const node = this.nodes[r][c];

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) {
              continue;
            }
            const row = r + dr;
            const col = c + dc;
            if (!(0 <= row && row < this.nodes.length)) {
              continue;
            }
            if (!(0 <= col && col < this.nodes[row].length)) {
              continue;
            }
            node.neighbors.push(this.nodes[row][col]);
          }
        }
      }
    }

    this.flatnodes = this.nodes.flatMap(r => r);
  }

  public part1(): number {
    return Array.from<number>({ length: 100 })
      .reduce((p) => p += this.simulate(), 0);
  }

  public part2(): number {
    for (let i = 1;; i++) {
      if (this.simulate() === this.flatnodes.length) {
        return i;
      }
    }
  }

  private simulate(): number {
    const flashes = new Set();
    this.flatnodes.forEach(u => u.energy++);

    let didFlash = false;
    function flash(octopus: Octopus) {
      didFlash = true;
      flashes.add(octopus);
      octopus.neighbors.forEach(v => {
        v.energy++;
        if (v.energy > 9 && !flashes.has(v)) {
          flash(v);
        }
      });
    }

    do {
      didFlash = false;
      this.flatnodes.forEach(u => {
        if (u.energy > 9 && !flashes.has(u)) {
          flash(u);
        }
      });
    } while (didFlash);

    this.flatnodes.forEach(u => {
      if (u.energy > 9) {
        u.energy = 0;
      }
    });
    return flashes.size;
  }
}
