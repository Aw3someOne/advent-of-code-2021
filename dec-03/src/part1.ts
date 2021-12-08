export function part1(input: string[]): number {
  const g = [];
  const e = [];
  for (let i = 0; i < input[0].length; i++) {
    const counts = { 0: 0, 1: 0 };
    input.forEach(line => {
      counts[line[i] as '0' | '1']++;
    });
    if (counts[1] > counts[0]) {
      g.push('1');
      e.push('0');
    } else {
      g.push('0');
      e.push('1');
    }
  }
  const gbin = g.join('');
  const ebin = e.join('');
  const gamma = parseInt(gbin, 2);
  const epsilon = parseInt(ebin, 2);
  return gamma * epsilon;
}
