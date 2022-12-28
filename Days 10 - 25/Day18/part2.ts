import {
  allCubes,
  Cube,
  getAllAdjacentCubes,
  getMaximumPosition,
  getMinimumPosition,
  getNumAdjacentCubesPresent,
} from "./utils";

const MIN = getMinimumPosition();
const MAX = getMaximumPosition();

const allCubesSet: Set<string> = new Set(
  allCubes.map((cube) => {
    return `${cube.xPos},${cube.yPos},${cube.zPos}`;
  })
);

let surfaceArea = 0;
let visitedCubePositions: Set<string> = new Set();

const origin: Cube = { xPos: 0, yPos: 0, zPos: 0 };
let queue: Cube[] = [origin];

while (queue.length > 0) {
  let currentCube: Cube = queue.shift()!;
  const currentCubeStringified = `${currentCube.xPos},${currentCube.yPos},${currentCube.zPos}`;

  if (visitedCubePositions.has(currentCubeStringified)) {
    continue;
  }

  if (allCubesSet.has(currentCubeStringified)) {
    continue;
  }

  if (currentCube.xPos < MIN || currentCube.yPos < MIN || currentCube.zPos < MIN) {
    continue;
  }

  if (currentCube.xPos > MAX || currentCube.yPos > MAX || currentCube.zPos > MAX) {
    continue;
  }

  visitedCubePositions.add(currentCubeStringified);

  surfaceArea += getNumAdjacentCubesPresent(currentCube);
  const adjacentCubes = getAllAdjacentCubes(currentCube);

  queue = queue.concat(adjacentCubes);
}

console.log(surfaceArea);
