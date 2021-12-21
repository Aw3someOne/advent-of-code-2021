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
    return this.foldPaper(firstFold).length;
  }

  public part2() {
    const uniqueDots = this.folds.reduce((p, c) => {
      return this.foldPaper(c, p);
    }, this.dots);

    const max = uniqueDots.reduce((p, c) => {
      return {
        x: Math.max(c.x, p.x),
        y: Math.max(c.y, p.y),
      };
    }, { x: 0, y: 0 });

    const paper: boolean[][] = Array.from({ length: max.y + 1 }).map(() => Array.from<boolean>({ length: max.x + 1 }).fill(false));
    uniqueDots.forEach(dot => {
      paper[dot.y][dot.x] = true;
    });
    paper.forEach(row => {
      console.log(row.map(b => b ? '#' : '.').join(''));
    });
  }

  private foldPaper(fold: Fold, dotArr = this.dots) {
    const uniqueCoords = new Set<string>();
    if (fold.axis === 'x') {
      dotArr.forEach(dot => {
        if (dot.x < fold.coord) { // don't transform
          uniqueCoords.add([dot.x, dot.y].join(','));
        } else {
          const deltaX = dot.x - fold.coord;
          const newX = dot.x - 2 * deltaX;
          uniqueCoords.add([newX, dot.y].join(','));
        }
      });
    }
    if (fold.axis === 'y') {
      dotArr.forEach(dot => {
        if (dot.y < fold.coord) { // don't transform
          uniqueCoords.add([dot.x, dot.y].join(','));
        } else {
          const deltaY = dot.y - fold.coord;
          const newY = dot.y - 2 * deltaY;
          uniqueCoords.add([dot.x, newY].join(','));
        }
      });
    }
    return Array.from(uniqueCoords).map(s => {
      const [x, y] = s.split(',');
      return { x: +x, y: +y };
    });
  }
}
