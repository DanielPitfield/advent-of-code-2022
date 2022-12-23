import { Position } from "../../Days 1 - 9/Day9/utils";
import { getFloorYPos, getRockWalls, getRestingSandPositions } from "./utils";

// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls({ includeFloor: true });
// At what yPos is the floor?
const floorYPos = getFloorYPos({ rockWalls, isFloorSolid: true });

// TODO: Long run time, the endless floor is bruteforced
const sandPositions: Position[] = getRestingSandPositions(rockWalls, floorYPos);
const numSandUnits = sandPositions.length;

console.log(numSandUnits);
