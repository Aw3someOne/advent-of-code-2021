export function countIncreases(a: number[]): number {
  let count = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] > a[i - 1]) {
      count++;
    }
  }
  return count;
}
