import DAYS, { loadData } from '../helper.js';
import File, { Directory } from './File.js';

const buildFileSystem = (commands) => {
  const root = new Directory('/');

  let cwd = root;

  for (const command of commands) {
    const token = command.split(' ');

    if (token[0] === '$') {
      if (token[1] === 'cd' && token[2] === '/') {
        cwd = root;
      }
      else if (token[1] === 'cd' && token[2] === '..') {
        cwd = cwd.parent;
      }
      else if (token[1] === 'cd') {
        cwd = cwd.findSubDirectory(token[2]);
      }
    }
    else if (token[0] === 'dir') {
      cwd.addSubDirectory(new Directory(token[1], cwd));
    }
    else {
      cwd.addSubDirectory(new File(token[1], cwd, +token[0]))
    }
  }

  return root;
}

const getSumOfDirectorySizes = (day, limit) => {
  const commands = loadData(day);

  const root = buildFileSystem(commands);

  let stack = [root];
  let sum = 0;

  while (stack.length > 0) {
    const directory = stack.pop();

    if (directory.size <= limit) {
      sum += directory.size;
    }

    for (const subFile of directory.subFiles.values()) {
      if (subFile instanceof Directory) {
        stack.push(subFile);
      }
    }
  }

  return sum;
}

const getSmallestDirectoryToFreeSpace = (day, totalDiskSpace, requiredDiskSpace) => {
  const commands = loadData(day);
  const root = buildFileSystem(commands);

  const freeDiskSpace = totalDiskSpace - root.size;

  let stack = [root];
  let minSpaceToRemove = root.size;

  while (stack.length > 0) {
    const directory = stack.pop();

    if ((freeDiskSpace + directory.size) >= requiredDiskSpace) {
      minSpaceToRemove = Math.min(minSpaceToRemove, directory.size);
    }

    for (const subFile of directory.subFiles.values()) {
      if (subFile instanceof Directory) {
        stack.push(subFile);
      }
    }
  }

  return minSpaceToRemove;
}

console.log(getSumOfDirectorySizes(DAYS.seven, 100000));
console.log(getSmallestDirectoryToFreeSpace(DAYS.seven, 70000000, 30000000));