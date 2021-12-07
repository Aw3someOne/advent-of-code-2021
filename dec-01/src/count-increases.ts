export function countIncreases(a: number[]): number {
  let count = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] > a[i - 1]) {
      count++;
    }
  }
  return count;
}

function sliceSum(a: number[], start: number, end: number): number {
  return a.slice(start, end).reduce((p, c) => p + c, 0);
}

export function countIncreasesWithWindow(a: number[], window: number): number {
  let count = 0;
  for (let i = window; i < a.length; i++) {
    const start = i - window;
    const end = i;
    const prev = sliceSum(a, start - 1, end - 1);
    const curr = sliceSum(a, start, end);
    if (curr > prev) {
      count++;
    }
  }
  return count;
}
