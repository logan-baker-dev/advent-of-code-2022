export default class Position {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static getDistance(head, tail) {
    const dX = Math.abs(head.x - tail.x);
    const dY = Math.abs(head.y - tail.y);

    return Math.max(dX, dY);
  }

  moveIn(direction) {
    this.x += direction.x;
    this.y += direction.y;
  }

  moveTowards(position) {
    if (position.x > this.x) {
      this.x += 1;
    }
    else if (position.x < this.x) {
      this.x -= 1;
    }

    if (position.y > this.y) {
      this.y += 1;
    }
    else if (position.y < this.y) {
      this.y -= 1;
    }
  }

  serialize() {
    return `${this.x}:${this.y}`;
  }

}