import DAY, { loadData } from '../helper.js';

const CRT_WIDTH = 40;
const CRT_HEIGHT = 6;

const getTickCount = (instruction) => {
  return instruction === 'noop' ? 1 : 2;
}

const generateSprite = (register) => {
  return [register - 1, register, register + 1];
}

const drawSprite = (crt, cycle, sprite) => {
  const row = Math.floor(cycle / CRT_WIDTH);
  const col = (cycle - 1) % CRT_WIDTH;

  if (sprite.includes(col)) {
    crt[row][col] = '#';
  }

  return crt;
}

const partOne = (day) => {
  const instructions = loadData(day)
    .map(instruction => {
      const [command, value] = instruction.split(' ');

      if (value) return [command, +value];

      return [command, 0];
    });

  let cycle = 1;
  let register = 1;
  let signalStrengthSum = 0;

  for (const [instruction, value] of instructions) {
    const tickCount = getTickCount(instruction);

    for (let i = 0; i < tickCount; ++i) {
      if (cycle === 20 || (cycle - 20) % 40 === 0) { // 20th cycle or every 40th cycle after the 20th.
        const signalStrength = cycle * register;

        signalStrengthSum += signalStrength;
      }

      ++cycle;
    }

    register += value;
  }

  return signalStrengthSum;
}

const partTwo = (day) => {
  const instructions = loadData(day)
    .map(instruction => {
      const [command, value] = instruction.split(' ');

      if (value) return [command, +value];

      return [command, 0];
    });


  let cycle = 1;
  let register = 1;

  let screen = new Array(CRT_HEIGHT)
    .fill(0)
    .map(row => new Array(CRT_WIDTH).fill(' '));

  for (const [instruction, value] of instructions) {
    const tickCount = getTickCount(instruction);
    let sprite = generateSprite(register);

    for (let i = 0; i < tickCount; ++i) {
      screen = drawSprite(screen, cycle, sprite);

      ++cycle;
    }

    register += value;
  }

  return screen.map(row => row.join(''))
    .join('\n');
}

console.log(partOne(DAY.ten));
console.log(partTwo(DAY.ten));