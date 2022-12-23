import { Position } from "../../Days 1 - 9/Day9/utils";
import { getFloorYPos, getRockWalls, getRestingSandPositions } from "./utils";

// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls({ includeFloor: false });
// At what yPos is the lowest rock wall of the cave?
const floorYPos = getFloorYPos({ rockWalls, isFloorSolid: false });

const sandPositions: Position[] = getRestingSandPositions(rockWalls, floorYPos);
const numSandUnits = sandPositions.length;

console.log(numSandUnits);
