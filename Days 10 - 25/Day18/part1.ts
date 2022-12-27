import { input } from "./input";

type Cube = { xPos: number; yPos: number; zPos: number };

const allCubes: Cube[] = input.split("\n").map((line) => {
  const [xPos, yPos, zPos] = line.split(",").map((x) => parseInt(x.trim()));
  return { xPos, yPos, zPos };
});

function getNumberOfSidesExposed(cube: Cube): number {
  // The adjacent positions of the cube
  const side1 = { ...cube, xPos: cube.xPos + 1 };
  const side2 = { ...cube, xPos: cube.xPos - 1 };
  const side3 = { ...cube, yPos: cube.yPos + 1 };
  const side4 = { ...cube, yPos: cube.yPos - 1 };
  const side5 = { ...cube, zPos: cube.zPos + 1 };
  const side6 = { ...cube, zPos: cube.zPos - 1 };

  const adjacentSides: Cube[] = [side1, side2, side3, side4, side5, side6];

  // How many of these adjacent sides are found within allCubes?
  const numCoveredSides: number = allCubes
    .map((cube) => JSON.stringify(cube))
    .filter((cube) => adjacentSides.map((cube) => JSON.stringify(cube)).includes(cube)).length;

  // The number of exposed sides is the total number of sides minus the number of covered sides
  return adjacentSides.length - numCoveredSides;
}

const allCubesExposedSurfaceAreas: number[] = allCubes.map((cube) => {
  return getNumberOfSidesExposed(cube);
});

const totalSurfaceArea: number = allCubesExposedSurfaceAreas.reduce((a, b) => a + b, 0);
console.log(totalSurfaceArea);
