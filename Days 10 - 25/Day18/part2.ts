import { input } from "./input";
import { getMaximumPosition, getMinimumPosition } from "./utils";

let squarePositions = new Set<string>();

input.split("\n").map((line) => {
  let [x, y, z] = line.split(",").map((n) => parseInt(n));
  squarePositions.add(`${x},${y},${z}`);
});

const MIN_POSITION = getMinimumPosition();
const MAX_POSITION = getMaximumPosition();

function countAffectedCubes (x: number, y: number, z: number) {
  let count = 0;

  if (squarePositions.has(`${x + 1},${y},${z}`)) count++;
  if (squarePositions.has(`${x - 1},${y},${z}`)) count++;
  if (squarePositions.has(`${x},${y + 1},${z}`)) count++;
  if (squarePositions.has(`${x},${y - 1},${z}`)) count++;
  if (squarePositions.has(`${x},${y},${z + 1}`)) count++;
  if (squarePositions.has(`${x},${y},${z - 1}`)) count++;

  return count;
};

let visited = new Set();
let surfaceArea = 0;

const origin = { x: 0, y: 0, z: 0 };
let queue = [origin];

while (queue.length > 0) {
  let { x, y, z } = queue.shift()!;

  if (visited.has(`${x},${y},${z}`)) {
    continue;
  }

  if (squarePositions.has(`${x},${y},${z}`)) {
    continue;
  }

  if (x < MIN_POSITION - 1 || y < MIN_POSITION - 1 || z < MIN_POSITION - 1) {
    continue;
  }

  if (x > MAX_POSITION + 1 || y > MAX_POSITION + 1 || z > MAX_POSITION + 1) {
    continue;
  }

  visited.add(`${x},${y},${z}`);
  
  surfaceArea += countAffectedCubes(x, y, z);

  queue.push({ x: x + 1, y, z });
  queue.push({ x: x - 1, y, z });
  queue.push({ x, y: y + 1, z });
  queue.push({ x, y: y - 1, z });
  queue.push({ x, y, z: z + 1 });
  queue.push({ x, y, z: z - 1 });
}

console.log(surfaceArea);
