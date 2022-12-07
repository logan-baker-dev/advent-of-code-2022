export default class File {
  name = '';
  parent = null;
  size = 0;

  constructor(name, parent = null, size = 0) {
    this.name = name;
    this.parent = parent;
    this.size = size;
  }

  static generateUniqueId(file) {
    if (!file.parent) return `null:0:${file.name}:${file.size}`;

    return `${file.parent.name}:${file.parent.size}:${file.name}:${file.size}`;
  }

  static printContents(file) { }
}

export class Directory extends File {
  children = new Map();

  constructor(name, parent = null, size = 0, children = new Map()) {
    super(name, parent, size);
    this.children = children;
  }

  addChild(file) {
    this.children.set(file.name, file);

    this.size += file.size;

    let currParent = this.parent;

    while (currParent) {
      currParent.size += file.size;
      currParent = currParent.parent;
    }
  }

  findDirectory(directoryName) {
    const stack = [this];
    const visited = new Set();

    while (stack.length > 0) {
      const cwd = stack.pop();

      const id = File.generateUniqueId(cwd);

      if (visited.has(id)) continue;
      if (cwd.name === directoryName && cwd.parent === this) return cwd;

      visited.add(id);

      for (const child of this.children.values()) {
        const childId = File.generateUniqueId(child);

        if (child instanceof Directory && !visited.has(childId)) {
          stack.push(child);
        }
      }
    }

    return null;
  }
}