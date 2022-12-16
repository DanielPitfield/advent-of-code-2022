import { Position } from "../../Days 1 - 9/Day9/utils";
import { getRockWalls } from "./utils";

const startingSandPosition: Position = { xPos: 500, yPos: 0 };
const rockWalls: Position[] = getRockWalls().flat();

const MIN_XPOS = rockWalls.reduce((min, x) => {
  if (x.xPos < min) {
    min = x.xPos;
  }
  return min;
}, 0);

const MAX_XPOS = rockWalls.reduce((max, x) => {
  if (x.xPos > max) {
    max = x.xPos;
  }
  return max;
}, 0);

const MIN_YPOS = rockWalls.reduce((min, x) => {
  if (x.yPos < min) {
    min = x.yPos;
  }
  return min;
}, 0);

const MAX_YPOS = rockWalls.reduce((max, x) => {
  if (x.yPos > max) {
    max = x.yPos;
  }
  return max;
}, 0);

const Grid = new Array(MAX_YPOS - MIN_YPOS).fill(".").map((row) => new Array(MAX_XPOS - MIN_XPOS).fill("."));

for (let y = 0; y < MAX_YPOS; y++) {
  for (let x = 0; x < MAX_XPOS; x++) {
    console.log(`${x},${y}`);
    if (rockWalls.some((position) => position.xPos === x + MIN_XPOS && position.yPos === y + MIN_YPOS)) {
      Grid[y][x] = "#";
    }
  }
}

console.log(Grid.map((x) => x.join("")).join("\n"));
