import { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DAY = {
  one: '01'
}

export const loadData = (day) => {
  return readFileSync(`${__dirname}/${day}/input.txt`, 'utf-8')
    .split('\n');
}

export default DAY;