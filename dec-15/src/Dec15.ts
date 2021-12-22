interface Node {
  row: number;
  col: number;
  danger: number;
  neighbors: Node[];
}

export class Dec15 {
  private numRows: number;
  private numCols: number;
  private nodes: Node[][];
  private flatNodes: Node[];

  public constructor(input: string[]) {
    const dangermap = input.map(row => row.split('').map(s => +s));
    this.numRows = dangermap.length;
    this.numCols = dangermap[0].length;

    this.nodes = [];
    for (let r = 0; r < dangermap.length; r++) {
      this.nodes[r] = [];
      for (let c = 0; c < dangermap[r].length; c++) {
        const node: Node = {
          row: r,
          col: c,
          danger: dangermap[r][c],
          neighbors: [],
        };
        this.nodes[r][c] = node;
      }
    }

    for (let r = 0; r < dangermap.length; r++) {
      for (let c = 0; c < dangermap[r].length; c++) {
        const node = this.nodes[r][c];
        {
          const up = r - 1;
          if (up >= 0) {
            node.neighbors.push(this.nodes[up][c]);
          }
        }
        {
          const down = r + 1;
          if (down < this.numRows) {
            node.neighbors.push(this.nodes[down][c]);
          }
        }
        {
          const left = c - 1;
          if (left >= 0) {
            node.neighbors.push(this.nodes[r][left]);
          }
        }
        {
          const right = c + 1;
          if (right < this.numCols) {
            node.neighbors.push(this.nodes[r][right]);
          }
        }
      }
    }

    this.flatNodes = this.nodes.flatMap(n => n);
  }

  public part1(): number {
    // problem says to omit starting node's danger level
    const [, ...safestPath] = this.aStar(this.nodes[0][0], this.nodes[this.numRows - 1][this.numCols - 1]);
    return safestPath.reduce((p, c) => p + c.danger, 0);
  }

  public part2(): number {
    throw new Error('not implemented');
  }

  private reconstruct_path(prev: Map<Node, Node>, curr: Node): Node[] {
    const path = [curr];
    while (prev.has(curr)) {
      curr = prev.get(curr)!;
      path.unshift(curr);
    }
    return path;
  }

  private aStar(src: Node, dest: Node): Node[] {
    const h = (n: Node): number => {
      return this.manhattanDist(n, dest);
    };

    const queue = [src];
    const prev = new Map<Node, Node>();
    const gScore = new Map<Node, number>();
    const fScore = new Map<Node, number>();
    this.flatNodes.forEach(node => {
      gScore.set(node, Number.MAX_SAFE_INTEGER);
      fScore.set(node, Number.MAX_SAFE_INTEGER);
    });

    gScore.set(src, 0);
    fScore.set(src, h(src));

    while (queue.length > 0) {
      const curr = queue.reduce((p, c) => {
        if (!p) {
          return c;
        }
        return fScore.get(c)! < fScore.get(p)! ? c : p;
      });

      if (curr === dest) {
        return this.reconstruct_path(prev, curr);
      }

      queue.splice(queue.indexOf(curr), 1);
      curr.neighbors.forEach(n => {
        const alt = gScore.get(curr)! + n.danger;
        if (alt < gScore.get(n)!) {
          prev.set(n, curr);
          gScore.set(n, alt);
          fScore.set(n, alt + h(n));
          if (queue.indexOf(n) < 0) {
            queue.push(n);
          }
        }
      });
    }

    throw new Error('goal never reached');
  }

  private manhattanDist(a: Node, b: Node): number {
    return Math.abs(a.row - a.row) + Math.abs(a.col - a.col);
  }
}
