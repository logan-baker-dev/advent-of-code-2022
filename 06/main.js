import DAYS, { loadRawData } from '../helper.js';

const isUniqueStream = (currentStream) => {
  return new Set(currentStream).size === currentStream.length;
}

const getProcessedCount = (day, limit) => {
  const dataStream = loadRawData(day);

  let left = 0;
  for (let right = limit; right < dataStream.length; ++right) {
    let currentStream = dataStream.slice(left, right + 1);

    while (!isUniqueStream(currentStream)) {
      ++left;
      currentStream = dataStream.slice(left, right + 1);
    }

    if (currentStream.length === limit) return right + 1;
  }

  return 0;
}

console.log(getProcessedCount(DAYS.six, 4));
console.log(getProcessedCount(DAYS.six, 14));