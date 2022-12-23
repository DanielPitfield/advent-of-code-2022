import { Position } from "../../Days 1 - 9/Day9/utils";
import { dropSandUnit, getFloorYPos, getRockWalls } from "./utils";

// Keep track of what positions the sand has come to rest/settled at?
const allSandPositions: Position[] = [];
// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls({ includeFloor: true });
// At what yPos is the lowest rock wall of the cave?
const floorYPos = getFloorYPos({ rockWalls, isFloorSolid: true });

// Keep pouring sand units until sand starts pouring past the floor (lowest rock wall)
function pourSand() {
  while (true) {
    const result = dropSandUnit(allSandPositions, rockWalls, floorYPos);

    if (result === null) {
      return;
    }

    allSandPositions.push(result);
  }
}

pourSand();
const numSandUnits = allSandPositions.length;
console.log(numSandUnits);
