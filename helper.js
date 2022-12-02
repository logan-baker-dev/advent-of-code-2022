import fs from 'fs';

const DAY = {
  one: '01'
}

const getFilePath = (day) => {
  let filePath = process.cwd();

  // Remove the day from the path if it already exists.
  // The day is added to the path when loading the data, so not removing it will cause a duplication.

  // EX: advent-of-code-2022/01/01/input.txt
  if (filePath.includes(day)) {
    filePath = filePath.replace(day, '');
  }

  return filePath;
}

export const loadData = (day) => {
  const filePath = getFilePath(day);

  return fs.readFileSync(`${filePath}/${day}/input.txt`, 'utf-8')
    .split('\n');
}

export default DAY;