import { input } from "./input";

export const NUM_CUBE_SIDES = 6;
export type Cube = { xPos: number; yPos: number; zPos: number };

export const allCubes: Cube[] = input.split("\n").map((line) => {
  const [xPos, yPos, zPos] = line.split(",").map((x) => parseInt(x.trim()));
  return { xPos, yPos, zPos };
});

export function getNumberOfSidesExposed(cube: Cube): number {
  // The adjacent positions of the cube
  const side1: Cube = { ...cube, xPos: cube.xPos + 1 };
  const side2: Cube = { ...cube, xPos: cube.xPos - 1 };
  const side3: Cube = { ...cube, yPos: cube.yPos + 1 };
  const side4: Cube = { ...cube, yPos: cube.yPos - 1 };
  const side5: Cube = { ...cube, zPos: cube.zPos + 1 };
  const side6: Cube = { ...cube, zPos: cube.zPos - 1 };

  const adjacentSides: Cube[] = [side1, side2, side3, side4, side5, side6];

  // How many of these adjacent sides are found within allCubes?
  const numCoveredSides: number = allCubes
    .map((cube) => JSON.stringify(cube))
    .filter((cube) => adjacentSides.map((cube) => JSON.stringify(cube)).includes(cube)).length;

  // The number of exposed sides is the total number of sides minus the number of covered sides
  return adjacentSides.length - numCoveredSides;
}

// Has to be within the occupied area and not on the edges (hence +1 for minimums and -1 for maximums)
export function getNumAirDroplets(): number {
  const minX: number = Math.min(...allCubes.map((cube) => cube.xPos)) + 1;
  const maxX: number = Math.max(...allCubes.map((cube) => cube.xPos)) - 1;

  const minY: number = Math.min(...allCubes.map((cube) => cube.yPos)) + 1;
  const maxY: number = Math.max(...allCubes.map((cube) => cube.yPos)) - 1;

  const minZ: number = Math.min(...allCubes.map((cube) => cube.zPos)) + 1;
  const maxZ: number = Math.max(...allCubes.map((cube) => cube.zPos)) - 1;

  let counter = 0;

  // Loop through all the positions (of the cubular space from the origin to the furthest cube)
  for (let xPos = minX; xPos <= maxX; xPos++) {
    for (let yPos = minY; yPos <= maxY; yPos++) {
      for (let zPos = minZ; zPos <= maxZ; zPos++) {
        // The current position to check
        const cubeToCheck: Cube = { xPos, yPos, zPos };
        // Not a cube occupied, but is fully covered
        if (!allCubes.includes(cubeToCheck) && getNumberOfSidesExposed(cubeToCheck) === 0) {
          counter++;
        }
      }
    }
  }

  return counter;
}
