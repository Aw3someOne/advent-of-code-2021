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
    this.dfs2([], {}, this.caveDict['start']);
    return this.pathCount;
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

  private paths: Cave[][] = [];

  private dfs2(path: Cave[], visited: Dictionary<number>, cave: Cave) {
    path.push(cave);
    if (cave.name === 'end') {
      this.pathCount++;
      this.paths.push(path);
      return;
    }
    if (isCaveSmall(cave)) {
      visited[cave.name] ??= 0;
      visited[cave.name]++;
    }
    cave.neighbors
      .filter(w => {
        if (w.name === 'start') {
          return false;
        }
        const visitedTwice = Object.values(visited).some(v => v === 2);
        return (visited[w.name] ?? 0) < (1 + (visitedTwice ? 0 : 1));
      })
      .forEach(w => this.dfs2(path.slice(0), { ...visited }, w));
  }
}

function isCaveBig(cave: Cave) {
  return cave.name === cave.name.toUpperCase();
}

function isCaveSmall(cave: Cave) {
  return !isCaveBig(cave);
}
