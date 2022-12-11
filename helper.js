import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DAY = {
  one: '01',
  two: '02',
  three: '03',
  four: '04',
  five: '05',
  six: '06',
  seven: '07',
  eight: '08',
  nine: '09',
  ten: '10'
}

export const loadData = (day) => {
  return readFileSync(`${__dirname}/${day}/input.txt`, 'utf-8')
    .split('\n');
}

export const loadRawData = (day) => {
  return readFileSync(`${__dirname}/${day}/input.txt`, 'utf-8');
}

export default DAY;