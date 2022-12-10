import DAY, { loadData } from "../helper.js"
import Motion from "./Motion.js";
import Position from "./Position.js";

const DIRECTIONS = new Map([
  ['U', [0, 1]],
  ['D', [0, -1]],
  ['R', [1, 0]],
  ['L', [-1, 0]]
])

const partOne = (day) => {
  const motions = loadData(day)
    .map(line => {
      const [direction, moves] = line.split(' ');

      return new Motion(DIRECTIONS.get(direction), +moves);
    });

  const headPos = new Position(0, 0);
  const tailPos = new Position(0, 0);

  const tailPositionHistory = new Set([tailPos.serialize()]);

  for (const { direction, moves } of motions) {
    for (let i = 0; i < moves; ++i) {
      headPos.moveIn(direction);

      if (!Position.shouldMove(headPos, tailPos)) continue;

      tailPos.moveTowards(headPos);

      if (tailPositionHistory.has(tailPos.serialize())) continue;

      tailPositionHistory.add(tailPos.serialize());
    }
  }

  return tailPositionHistory.size;
}

const partTwo = (day, size = 2) => {
  const motions = loadData(day)
    .map(line => {
      const [direction, moves] = line.split(' ');

      return new Motion(DIRECTIONS.get(direction), +moves);
    });

  const positions = Array(size)
    .fill(0)
    .map(element => new Position(0, 0));

  const tailHistory = new Set(['0:0']);

  for (const { direction, moves } of motions) {
    for (let move = 0; move < moves; ++move) {

      positions[0].moveIn(direction); // Move the head.

      for (let i = 1; i < positions.length; ++i) {
        const headPos = positions[i - 1];
        const currentPos = positions[i];

        if (!Position.shouldMove(headPos, currentPos)) continue;

        currentPos.moveTowards(headPos);
      }

      const tailPos = positions[positions.length - 1];

      if (tailHistory.has(tailPos.serialize())) continue;

      tailHistory.add(tailPos.serialize());
    }
  }

  return tailHistory.size;
}

console.log(partOne(DAY.nine));
console.log(partTwo(DAY.nine, 10));