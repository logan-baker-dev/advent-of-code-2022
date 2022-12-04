import DAYS, { loadData } from '../helper.js';

const buildPriorityMap = () => {
  let map = new Map();

  let priority = 1;
  for (let i = 97; i <= 122; ++i) {
    const letter = String.fromCharCode(i);

    map.set(letter, priority);
    ++priority;
  }

  for (let i = 65; i <= 90; ++i) {
    const letter = String.fromCharCode(i);

    map.set(letter, priority);
    ++priority;
  }

  return map;
}

const getPrioritySum = (day) => {
  const priorityMap = buildPriorityMap();

  const items = loadData(day)
    .map(item => item.replace('\r', ''));

  let sum = 0;

  for (const item of items) {
    const mid = Math.floor(item.length / 2);

    const firstSackSet = new Set(item.substring(0, mid));
    const secondSack = item.substring(mid);

    for (const sackItem of secondSack) {
      if (firstSackSet.has(sackItem)) {
        sum += priorityMap.get(sackItem);
        break;
      }
    }
  }

  return sum;
}

const getThreeElfPrioritySum = (day) => {
  const priorityMap = buildPriorityMap();

  const items = loadData(day)
    .map(item => item.replace('\r', ''));

  const groups = [];

  for (let i = 0; i < items.length; i += 3) {
    groups.push(items.slice(i, i + 3));
  }

  let sum = 0;

  for (const [first, second, third] of groups) {
    const secondSet = new Set(second);
    const thirdSet = new Set(third);

    for (const letter of first) {
      if (secondSet.has(letter) && thirdSet.has(letter)) {
        sum += priorityMap.get(letter);
        break;
      }
    }
  }

  return sum;
}

console.log(getPrioritySum(DAYS.three));
console.log(getThreeElfPrioritySum(DAYS.three));