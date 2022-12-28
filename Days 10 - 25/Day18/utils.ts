import { input } from "./input";

export const NUM_CUBE_SIDES = 6;
export type Cube = { xPos: number; yPos: number; zPos: number };

export const allCubes: Cube[] = input.split("\n").map((line) => {
  const [xPos, yPos, zPos] = line.split(",").map((x) => parseInt(x.trim()));
  return { xPos, yPos, zPos };
});

export const allCubesStringified: string[] = allCubes.map((cube) => JSON.stringify(cube));

export function getAllAdjacentCubes(cube: Cube): Cube[] {
  const side1: Cube = { ...cube, xPos: cube.xPos + 1 };
  const side2: Cube = { ...cube, xPos: cube.xPos - 1 };
  const side3: Cube = { ...cube, yPos: cube.yPos + 1 };
  const side4: Cube = { ...cube, yPos: cube.yPos - 1 };
  const side5: Cube = { ...cube, zPos: cube.zPos + 1 };
  const side6: Cube = { ...cube, zPos: cube.zPos - 1 };

  return [side1, side2, side3, side4, side5, side6];
}

export function getNumberOfSidesExposed(cube: Cube): number {
  const adjacentCubes: Cube[] = getAllAdjacentCubes(cube);

  // How many of these adjacent sides are found within allCubes?
  const numCoveredSides: number = allCubesStringified.filter((cube) =>
    adjacentCubes.map((cube) => JSON.stringify(cube)).includes(cube)
  ).length;

  // The number of exposed sides is the total number of sides minus the number of covered sides
  return adjacentCubes.length - numCoveredSides;
}

export function isCubeWithin(cubeArray: Cube[], cubeToCheck: Cube): boolean {
  return cubeArray.map((cube) => JSON.stringify(cube)).some((cube) => cube === JSON.stringify(cubeToCheck));
}

export function getMinimumPosition(): number {
  const minX: number = Math.min(...allCubes.map((cube) => cube.xPos));
  const minY: number = Math.min(...allCubes.map((cube) => cube.yPos));
  const minZ: number = Math.min(...allCubes.map((cube) => cube.zPos));

  return Math.min(minX, minY, minZ);
}

export function getMaximumPosition(): number {
  const maxX: number = Math.max(...allCubes.map((cube) => cube.xPos));
  const maxY: number = Math.max(...allCubes.map((cube) => cube.yPos));
  const maxZ: number = Math.max(...allCubes.map((cube) => cube.zPos));

  return Math.max(maxX, maxY, maxZ);
}
