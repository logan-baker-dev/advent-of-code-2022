import fs from 'fs';

export const loadData = (day) => {
  return fs.readFileSync(`./${day}/input.txt`, 'utf-8')
    .split('\n');
}