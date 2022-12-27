import { totalSurfaceArea } from "./part1";
import { getNumAirDroplets, NUM_CUBE_SIDES } from "./utils";

// How many cube positions are there within the free spaces of allCubes that have no sides exposed?
const airDropletSurfaceArea: number = getNumAirDroplets() * NUM_CUBE_SIDES;

const exteriorSurfaceArea: number = totalSurfaceArea - airDropletSurfaceArea;
console.log(exteriorSurfaceArea);
