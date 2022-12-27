import { allCubes, getNumberOfSidesExposed } from "./utils";

// Map each sube to its exposed surface area (each exposed side is 1 unit)
const allCubesExposedSurfaceAreas: number[] = allCubes.map((cube) => {
  return getNumberOfSidesExposed(cube);
});

// Sum the surface area of every cube together
export const totalSurfaceArea: number = allCubesExposedSurfaceAreas.reduce((a, b) => a + b, 0);
console.log(totalSurfaceArea);
