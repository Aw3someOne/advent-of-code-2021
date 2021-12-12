interface Node {
  row: number;
  column: number;
  height: number;
  neighbors: Node[];
}

export class Dec09 {
  private numRows: number;
  private numCols: number;
  private nodes: Node[][];
  private flatNodes: Node[];

  public constructor(input: string[]) {
    const heightmap = input.map(row => row.split('').map(s => +s));
    this.numRows = heightmap.length;
    this.numCols = heightmap[0].length;

    this.nodes = [];
    for (let r = 0; r < heightmap.length; r++) {
      this.nodes[r] = [];
      for (let c = 0; c < heightmap[r].length; c++) {
        const node: Node = {
          row: r,
          column: c,
          height: heightmap[r][c],
          neighbors: [],
        };
        this.nodes[r][c] = node;
      }
    }

    for (let r = 0; r < heightmap.length; r++) {
      for (let c = 0; c < heightmap[r].length; c++) {
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
    return this.flatNodes.filter(this.isLocalMin, this).reduce((p, c) => p + c.height + 1, 0);
  }

  public part2(): number {
    const basins = this.flatNodes.filter(this.isLocalMin, this).map(this.measureBasin, this);
    basins.sort((a, b) => b - a);
    return basins.slice(0, 3).reduce((p, c) => p * c, 1);
  }

  private isLocalMin(node: Node): boolean {
    return node.neighbors.every(n => n.height >= node.height);
  }

  private measureBasin(node: Node): number {
    const dist: Map<Node, number> = new Map();
    const prev: Map<Node, Node> = new Map();
    this.flatNodes.forEach(v => {
      dist.set(v, Number.POSITIVE_INFINITY);
    });
    dist.set(node, 0);

    const Q = [node];
    const visited = new Set();
    while (Q.length > 0) {
      const u = Q.reduce((p, c) => { // node u in Q with min dist[u]
        if (!p) {
          return c;
        }
        if (dist.get(c)! < dist.get(p)!) {
          return c;
        }
        return p;
      });

      Q.splice(Q.indexOf(u), 1); // remove u from Q
      visited.add(u);

      for (const v of u.neighbors) {
        if (visited.has(v) || v.height === 9) {
          continue;
        }
        Q.push(v);
        const alt = dist.get(u)! + 1;
        if (alt < dist.get(v)!) {
          dist.set(v, alt);
          prev.set(v, u);
        }
      }
    }
    return visited.size;
  }
}
