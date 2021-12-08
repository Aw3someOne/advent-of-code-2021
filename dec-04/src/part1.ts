interface BoardValue {
  value: number;
  marked: boolean;
}

class Board {
  private board: BoardValue[][];
  public constructor(lines: string[]) {
    this.board = lines.map(line =>
      line
        .trim()
        .split(/\s+/)
        .map(s => ({ value: +s, marked: false }))
    );
  }

  public isBingo(): boolean {
    const row = this.board.some(row => row.every(col => col.marked));
    if (row) {
      return true;
    }
    for (let i = 0; i < 5; i++) {
      if (this.board.every(row => row[i].marked)) {
        return true;
      }
    }
    return false;
  }

  public score(): number {
    return this.board
      .flatMap(row => row)
      .filter(c => !c.marked)
      .reduce((p, c) => p + c.value, 0);
  }

  public draw(n: number): void {
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (this.board[r][c].value === n) {
          this.board[r][c].marked = true;
          return;
        }
      }
    }
  }
}

function parseInput(input: string[]) {
  const [first, ...rest] = input;

  const draws = first.split(',').map(s => +s.trim());
  const lines = rest.reduce<string[][]>((p, c) => {
    if (c === '') {
      p.push([]);
    } else {
      p[p.length - 1].push(c);
    }
    return p;
  }, []);

  return { draws, boards: lines.map(board => new Board(board)) };
}

export function part1(input: string[]): number {
  const { draws, boards } = parseInput(input);
  for (const n of draws) {
    boards.forEach(board => board.draw(n));
    const winner = boards.find(board => board.isBingo());
    if (!winner) {
      continue;
    }

    const score = winner.score();
    return score * n;
  }

  throw new Error('should not reach here');
}
