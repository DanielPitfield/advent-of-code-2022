import {
  allCubes,
  Cube,
  getAllAdjacentCubes,
  getMaximumPosition,
  getMinimumPosition,
  getNumAdjacentCubesPresent,
} from "./utils";

// The minimum and maximum values allowed for the cube to be an air droplet
const MIN = getMinimumPosition();
const MAX = getMaximumPosition();

const allCubesSet: Set<string> = new Set(
  allCubes.map((cube) => {
    return `${cube.xPos},${cube.yPos},${cube.zPos}`;
  })
);

let exteriorSurfaceArea: number = 0;
const visitedCubePositions: Set<string> = new Set();

const origin: Cube = { xPos: 0, yPos: 0, zPos: 0 };
let queue: Cube[] = [origin];

// Until the queue is empty
while (queue.length > 0) {
  const currentCube: Cube = queue.shift()!;
  const currentCubeStringified = `${currentCube.xPos},${currentCube.yPos},${currentCube.zPos}`;

  // Already processed this cube
  if (visitedCubePositions.has(currentCubeStringified)) {
    continue;
  }

  // The cube is within the interior of the droplet structure
  if (allCubesSet.has(currentCubeStringified)) {
    continue;
  }

  // Cube is out of bounds
  if ([currentCube.xPos, currentCube.yPos, currentCube.zPos].some(position => position < MIN || position > MAX))  {
    continue;
  }

  // This cube is an air droplet, add it's surface area to the sum
  exteriorSurfaceArea += getNumAdjacentCubesPresent(currentCube);

  visitedCubePositions.add(currentCubeStringified);

  const adjacentCubes = getAllAdjacentCubes(currentCube);
  // Push the adjacent cubes of the current cube to the queue
  queue = queue.concat(adjacentCubes);
}

console.log(exteriorSurfaceArea)
