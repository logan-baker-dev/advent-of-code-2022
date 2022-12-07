import DAYS, { loadRawData } from '../helper.js';

const isUniqueStream = (currentStream) => {
  return new Set(currentStream).size === currentStream.length;
}

const getProcessedCount = (day, limit) => {
  const dataStream = loadRawData(day);

  let left = 0;
  for (let right = limit; right < dataStream.length; ++right) {
    let currentStream = dataStream.slice(left, right);

    while (!isUniqueStream(currentStream)) {
      ++left;
      currentStream = dataStream.slice(left, right);
    }

    if (currentStream.length === limit) return right;
  }

  return 0;
}

console.log(getProcessedCount(DAYS.six, 4));
console.log(getProcessedCount(DAYS.six, 14));