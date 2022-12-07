import DAYS, { loadData } from '../helper.js';
import File, { Directory } from './File.js';

const buildTree = (commands) => {
  const root = new Directory('/');

  let cwd = root;
  for (const command of commands) {
    const [type, action, name] = command.split(' ');

    if (type === '$') {
      if (action === 'cd' && name === '/') {
        cwd = root;
      }
      else if (action === 'cd' && name === '..') {
        cwd = cwd.parent;
      }
      else if (action === 'cd') {
        cwd = cwd.findDirectory(name);
      }
      else {
        // TO-DO: Implement printing method.
      }
    }
    else if (type === 'dir') {
      cwd.addChild(new Directory(action, cwd)); // action is the file's name in this context.
    }
    else {
      cwd.addChild(new File(action, cwd, +type)) // action is the file name and type is the file size in this context.
    }
  }

  return root;
}

const getSumOfDirectorySizes = (day, limit) => {
  const commands = loadData(day);

  const root = buildTree(commands);

  let stack = [root];
  let visited = new Set();
  let sum = 0;

  while (stack.length > 0) {
    const dir = stack.pop();

    const id = File.generateUniqueId(dir);

    if (visited.has(id)) continue;

    visited.add(id);

    if (dir.size <= limit) {
      sum += dir.size;
    }

    for (const child of dir.children.values()) {
      const childId = File.generateUniqueId(child);

      if (child instanceof Directory && !visited.has(childId)) {
        stack.push(child);
      }
    }
  }

  return sum;
}

const getSmallestDirectoryToFreeSpace = (day, totalDiskSpace, requiredDiskSpace) => {
  const commands = loadData(day);

  const root = buildTree(commands);

  const freeDiskSpace = totalDiskSpace - root.size;

  let stack = [root];
  let visited = new Set();
  let minSpaceToRemove = Number.MAX_SAFE_INTEGER;

  while (stack.length > 0) {
    const dir = stack.pop();

    const id = File.generateUniqueId(dir);

    if (visited.has(id)) continue;

    visited.add(id);

    if ((freeDiskSpace + dir.size) >= requiredDiskSpace) {
      minSpaceToRemove = Math.min(minSpaceToRemove, dir.size);
    }

    for (const child of dir.children.values()) {
      const childId = File.generateUniqueId(child);

      if (child instanceof Directory && !visited.has(childId)) {
        stack.push(child);
      }
    }
  }

  return minSpaceToRemove;
}

console.log(getSumOfDirectorySizes(DAYS.seven, 100000));
console.log(getSmallestDirectoryToFreeSpace(DAYS.seven, 70000000, 30000000));