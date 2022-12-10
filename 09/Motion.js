import Position from "./Position.js";

export default class Motion {
  direction = new Position(0, 0);
  moves = 0;

  constructor(coordinateArray, moves) {
    const [x, y] = coordinateArray;

    this.direction = new Position(x, y);
    this.moves = moves;
  }
}