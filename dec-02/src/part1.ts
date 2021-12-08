export function part1(commands: string[]): number {
  let x = 0;
  let depth = 0;
  commands.forEach(command => {
    const [direction, amountStr] = command.split(' ');
    const amount = +amountStr;
    switch (direction) {
      case 'forward':
        x += amount;
        break;
      case 'up':
        depth -= amount;
        break;
      case 'down':
        depth += amount;
        break;
    }
  });

  return x * depth;
}
