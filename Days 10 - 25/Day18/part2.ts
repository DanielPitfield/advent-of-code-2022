import { allCubes, getMaximumPosition, getMinimumPosition, getNumAdjacentCubesPresent } from "./utils";

const MIN = getMinimumPosition();
const MAX = getMaximumPosition();

const allCubesSet: Set<string> = new Set(allCubes.map((cube) => {
  return `${cube.xPos},${cube.yPos},${cube.zPos}`;
}));

let surfaceArea = 0;
let visitedCubePositions: Set<string> = new Set();


const origin = { x: 0, y: 0, z: 0 };
let queue = [origin];

while (queue.length > 0) {
  let { x, y, z } = queue.shift()!;

  if (visitedCubePositions.has(`${x},${y},${z}`)) {
    continue;
  }

  if (allCubesSet.has(`${x},${y},${z}`)) {
    continue;
  }

  if (x < MIN - 1 || y < MIN - 1 || z < MIN - 1) {
    continue;
  }

  if (x > MAX + 1 || y > MAX + 1 || z > MAX + 1) {
    continue;
  }

  visitedCubePositions.add(`${x},${y},${z}`);

  surfaceArea += getNumAdjacentCubesPresent({ xPos: x, yPos: y, zPos: z });

  queue.push({ x: x + 1, y, z });
  queue.push({ x: x - 1, y, z });
  queue.push({ x, y: y + 1, z });
  queue.push({ x, y: y - 1, z });
  queue.push({ x, y, z: z + 1 });
  queue.push({ x, y, z: z - 1 });
}

console.log(surfaceArea);
