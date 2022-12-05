import DAY, { loadData } from "../helper.js";

const buildCrateStacks = (crates) => {
  const stacks = Array(9).fill()
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
  instruction = instruction.replaceAll(/[a-z ]/g, '');

  return instruction.split('')
    .map(number => +number);
}

const moveCrates = (crateStacks, from, to, amount) => {
  for (let i = 0; i < amount; ++i) {
    const crate = crateStacks[from].pop();
    crateStacks[to].push(crate);
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
  const procedures = loadData(day);
  const crates = procedures.slice(0, 8); // First 7 rows of input file. (Use 8 here because end index is exclusive.)
  const instructions = procedures.slice(10); // Every row in the input file after line 10.

  let crateStacks = buildCrateStacks(crates);

  for (const instruction of instructions) {
    const [amount, from, to] = parseInstruction(instruction);
    crateStacks = moveCrates(crateStacks, from - 1, to - 1, amount);
  }

  return buildMessageFromCrateStacks(crateStacks);
}

const getTopCreatesWithNewCrane = (day) => {
  const procedures = loadData(day);
  const crates = procedures.slice(0, 8); // First 7 rows of input file. (Use 8 here because end index is exclusive.)
  const instructions = procedures.slice(10); // Every row in the input file after line 10.

  let crateStacks = buildCrateStacks(crates);

  for (const instruction of instructions) {
    const [amount, from, to] = parseInstruction(instruction);
    crateStacks = moveMultipleCrates(crateStacks, from - 1, to - 1, amount);
  }

  return buildMessageFromCrateStacks(crateStacks);
}

console.log(getTopCrates(DAY.five));
console.log(getTopCreatesWithNewCrane(DAY.five));