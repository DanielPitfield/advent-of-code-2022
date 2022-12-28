import {
  allCubes,
  allCubesStringified,
  Cube,
  getAllAdjacentCubes,
  getMaximumPosition,
  getMinimumPosition,
} from "./utils";

const MIN = getMinimumPosition();
const MAX = getMaximumPosition();

const cubesAsStrings = allCubes.map((cube) => {
  return `${cube.xPos},${cube.yPos},${cube.zPos}`;
});
const squarePositions = new Set(cubesAsStrings);

function getNumAdjacentCubesPresent(cube: Cube) {
  const adjacentCubes = getAllAdjacentCubes(cube);
  
  // How many of these adjacent sides are found within allCubes?
  return allCubesStringified.filter((cube) => adjacentCubes.map((cube) => JSON.stringify(cube)).includes(cube)).length;
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

  surfaceArea += getNumAdjacentCubesPresent({ xPos: x, yPos: y, zPos: z });

  queue.push({ x: x + 1, y, z });
  queue.push({ x: x - 1, y, z });
  queue.push({ x, y: y + 1, z });
  queue.push({ x, y: y - 1, z });
  queue.push({ x, y, z: z + 1 });
  queue.push({ x, y, z: z - 1 });
}

console.log(surfaceArea);
