import {
  allCubes,
  Cube,
  getAllAdjacentCubes,
  getMaximumPosition,
  getMinimumPosition,
  getNumAdjacentCubesPresent,
  isCubeWithin,
} from "./utils";

// The minimum and maximum values allowed for the cube to be an air droplet
const MIN = getMinimumPosition();
const MAX = getMaximumPosition();

let exteriorSurfaceArea: number = 0;
const visitedCubes: Cube[] = [];

const origin: Cube = { xPos: 0, yPos: 0, zPos: 0 };
let queue: Cube[] = [origin];

// Until the queue is empty
while (queue.length > 0) {
  const currentCube: Cube | undefined = queue.shift();

  // The current cube couldn't be found
  if (!currentCube) {
    continue;
  }

  // Already processed this cube
  if (isCubeWithin(visitedCubes, currentCube)) {
    continue;
  }

  // The cube is within the interior of the droplet structure
  if (isCubeWithin(allCubes, currentCube)) {
    continue;
  }

  // Cube is out of bounds
  if ([currentCube.xPos, currentCube.yPos, currentCube.zPos].some((position) => position < MIN || position > MAX)) {
    continue;
  }

  // This cube is an air droplet, add it's surface area to the sum
  exteriorSurfaceArea += getNumAdjacentCubesPresent(currentCube);

  visitedCubes.push(currentCube);

  const adjacentCubes = getAllAdjacentCubes(currentCube);
  // Push the adjacent cubes of the current cube to the queue
  queue = queue.concat(adjacentCubes);
}

console.log(exteriorSurfaceArea);
