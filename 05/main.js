import DAY, { loadRawData } from "../helper.js";

const buildCrateStacks = (crates) => {
  const numberRow = crates[crates.length - 1];
  const stackSize = +numberRow[numberRow.length - 2];

  crates = crates.slice(0, crates.length - 1); // Get rid of the numberRow before parsing.

  const stacks = Array(stackSize).fill()
    .map(() => new Array());

  for (const layer of crates) {
    let currentStack = 0;

    for (let i = 0; i < layer.length; i += 4) {
      const crateId = layer[i + 1];

      if (crateId !== ' ') {
        stacks[currentStack].push(crateId);
      }

      ++currentStack;
    }
  }

  return stacks.map(stack => stack.reverse());
}

const parseInstruction = (instruction) => {
  instruction = instruction.replaceAll(/move |from | to/g, '');

  let [amount, from, to] = instruction.split(' ')
    .map(number => +number);

  return [amount, from - 1, to - 1];
}

const moveCrates = (crateStacks, from, to, amount) => {

  try {
    for (let i = 0; i < amount; ++i) {
      const crate = crateStacks[from].pop();
      crateStacks[to].push(crate);
    }
  }
  catch (error) {
    console.log(error);
  }

  return crateStacks;
}

const moveMultipleCrates = (crateStacks, from, to, amount) => {
  const buffer = [];

  for (let i = 0; i < amount; ++i) {
    const crate = crateStacks[from].pop();
    buffer.push(crate);
  }

  while (buffer.length > 0) {
    crateStacks[to].push(buffer.pop());
  }

  return crateStacks;
}

const buildMessageFromCrateStacks = (crateStacks) => {
  let message = '';

  for (const stack of crateStacks) {
    message += stack.pop();
  }

  return message;
}

const getTopCrates = (day) => {
  const procedures = loadRawData(day);

  const [crateData, instructions] = procedures
    .split('\r\n\r\n')
    .map(str => str.split('\r\n'));

  let crateStacks = buildCrateStacks(crateData);

  for (const instruction of instructions) {
    const [amount, from, to] = parseInstruction(instruction);
    crateStacks = moveCrates(crateStacks, from, to, amount);
  }

  return buildMessageFromCrateStacks(crateStacks);
}

const getTopCreatesWithNewCrane = (day) => {
  const procedures = loadRawData(day);

  const [crateData, instructions] = procedures
    .split('\r\n\r\n')
    .map(str => str.split('\r\n'));


  let crateStacks = buildCrateStacks(crateData);

  for (const instruction of instructions) {
    const [amount, from, to] = parseInstruction(instruction);
    crateStacks = moveMultipleCrates(crateStacks, from, to, amount);
  }

  return buildMessageFromCrateStacks(crateStacks);
}

console.log(getTopCrates(DAY.five));
console.log(getTopCreatesWithNewCrane(DAY.five));