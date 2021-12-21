interface Dot {
  x: number;
  y: number;
}

interface Fold {
  axis: 'x' | 'y';
  coord: number;
}

export class Dec13 {
  private dots: Dot[];
  private folds: Fold[];

  public constructor(input: string[]) {
    this.dots = [];
    this.folds = [];
    input.forEach(line => {
      if (line === '') {
        return;
      }
      const [x, y] = line.split(',');
      if (!isNaN(+x) && !isNaN(+y)) {
        this.dots.push({ x: +x, y: +y });
      } else {
        const regex = /fold along ([xy])=(\d+)/;
        const result = regex.exec(line);
        if (result) {
          const [, axis, coord] = result;
          this.folds.push({ axis: axis as any, coord: +coord });
        }
      }
    });
  }

  public part1(): number {
    const [firstFold] = this.folds;
    const uniqueCoords = new Set<string>();
    if (firstFold.axis === 'x') {
      this.dots.forEach(dot => {
        if (dot.x < firstFold.coord) { // don't transform
          uniqueCoords.add([dot.x, dot.y].join(','));
        } else {
          const deltaX = dot.x - firstFold.coord;
          const newX = dot.x - 2 * deltaX;
          uniqueCoords.add([newX, dot.y].join(','));
        }
      });
    }
    if (firstFold.axis === 'y') {
      this.dots.forEach(dot => {
        if (dot.y < firstFold.coord) { // don't transform
          uniqueCoords.add([dot.x, dot.y].join(','));
        } else {
          const deltaY = dot.y - firstFold.coord;
          const newY = dot.y - 2 * deltaY;
          uniqueCoords.add([dot.x, newY].join(','));
        }
      });
    }
    return uniqueCoords.size;
  }

  public part2(): number {
    throw new Error('not implemented');
  }
}
