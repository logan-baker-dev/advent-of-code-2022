export default class File {
  name = '';
  parent = null;
  size = 0;

  constructor(name, parent = null, size = 0) {
    this.name = name;
    this.parent = parent;
    this.size = size;
  }
}

export class Directory extends File {
  subFiles = new Map();

  constructor(name, parent = null, size = 0, subFiles = new Map()) {
    super(name, parent, size);
    this.subFiles = subFiles;
  }

  addSubFile(file) {
    this.subFiles.set(file.name, file);

    this.size += file.size;

    let currParent = this.parent;

    while (currParent) {
      currParent.size += file.size;
      currParent = currParent.parent;
    }
  }

  findSubDirectory(directoryName) {
    for (const [fileName, file] of this.subFiles) {
      if (directoryName === fileName && file instanceof Directory) {
        return file;
      }
    }

    return this;
  }
}