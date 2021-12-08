export function part2(commands: string[]): number {
  let x = 0;
  let depth = 0;
  let aim = 0;
  commands.forEach(command => {
    const [direction, amountStr] = command.split(' ');
    const amount = +amountStr;
    switch (direction) {
      case 'forward':
        x += amount;
        depth += amount * aim;
        break;
      case 'up':
        aim -= amount;
        break;
      case 'down':
        aim += amount;
        break;
    }
  });
  return x * depth;
}
