type Dictionary<T> = Record<string, T>;

interface Cave {
  name: string;
  neighbors: Cave[];
}

export class Dec12 {
  private caveDict: Dictionary<Cave>;
  private pathCount: number;

  public constructor(input: string[]) {
    this.caveDict = {};
    this.pathCount = 0;

    input.forEach(connection => {
      const [caveOne, caveTwo] = connection.split('-');
      if (!this.caveDict[caveOne]) {
        this.caveDict[caveOne] = {
          name: caveOne,
          neighbors: [],
        };
      }
      if (!this.caveDict[caveTwo]) {
        this.caveDict[caveTwo] = {
          name: caveTwo,
          neighbors: [],
        };
      }
      this.caveDict[caveOne].neighbors.push(this.caveDict[caveTwo]);
      this.caveDict[caveTwo].neighbors.push(this.caveDict[caveOne]);
    });
  }

  public part1(): number {
    this.dfs(new Set(), this.caveDict['start']);
    return this.pathCount;
  }

  public part2(): number {
    throw new Error('not implemented');
  }

  private dfs(visited: Set<Cave>, cave: Cave) {
    if (cave.name === 'end') {
      this.pathCount++;
      return;
    }
    if (isCaveSmall(cave)) {
      visited.add(cave);
    }
    cave.neighbors.filter(w => !visited.has(w)).forEach(w => this.dfs(new Set(visited), w));
  }
}

function isCaveBig(cave: Cave) {
  return cave.name === cave.name.toUpperCase();
}

function isCaveSmall(cave: Cave) {
  return !isCaveBig(cave);
}
