import { allCubes, getMaximumPosition, getMinimumPosition } from "./utils";

const MIN = getMinimumPosition();
const MAX = getMaximumPosition();

const cubesAsStrings = allCubes.map((cube) => {
  return `${cube.xPos},${cube.yPos},${cube.zPos}`;
});
const squarePositions = new Set(cubesAsStrings);

function countAffectedCubes(x: number, y: number, z: number) {
  let count = 0;
  
  if (squarePositions.has(`${x + 1},${y},${z}`)) count++;
  if (squarePositions.has(`${x - 1},${y},${z}`)) count++;
  if (squarePositions.has(`${x},${y + 1},${z}`)) count++;
  if (squarePositions.has(`${x},${y - 1},${z}`)) count++;
  if (squarePositions.has(`${x},${y},${z + 1}`)) count++;
  if (squarePositions.has(`${x},${y},${z - 1}`)) count++;

  return count;
}

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

  if (x < MIN - 1 || y < MIN - 1 || z < MIN - 1) {
    continue;
  }

  if (x > MAX + 1 || y > MAX + 1 || z > MAX + 1) {
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
