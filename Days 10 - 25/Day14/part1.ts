import { Position } from "../../Days 1 - 9/Day9/utils";
import { getRockWalls } from "./utils";

// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls();
// At what yPos is the bottom floor of the cave?
const floorYPos: number = Math.max(...rockWalls.map((position) => position.yPos));
// At what positions has sand come to rest/settled at?
const allSandPositions: Position[] = [];

// Is there sand or a rock wall at the provided position?
function isPositionOccupied(position: Position): boolean {
  return (
    allSandPositions.some((sand) => sand.xPos === position.xPos && sand.yPos === position.yPos) ||
    rockWalls.some((rock) => rock.xPos === position.xPos && rock.yPos === position.yPos)
  );
}

// Drop one unit of sand (recording where it comes to rest)
function dropSandUnit(): Position | null {
  // The sand unit's position starts as the postion from where the sand is poured in
  const currentSandPosition: Position = { xPos: 500, yPos: 0 };

  while (true) {
    // Sand has reached or surpassed the yPos of the lowest wall
    if (currentSandPosition.yPos >= floorYPos) {
      return null;
    }

    // Directly down
    if (!isPositionOccupied({ xPos: currentSandPosition.xPos, yPos: currentSandPosition.yPos + 1 })) {
      currentSandPosition.yPos++;
      continue;
    }

    // Diagonally down and left
    if (!isPositionOccupied({ xPos: currentSandPosition.xPos - 1, yPos: currentSandPosition.yPos + 1 })) {
      currentSandPosition.xPos--;
      currentSandPosition.yPos++;
      continue;
    }

    // Diagonally down and right
    if (!isPositionOccupied({ xPos: currentSandPosition.xPos + 1, yPos: currentSandPosition.yPos + 1 })) {
      currentSandPosition.xPos++;
      currentSandPosition.yPos++;
      continue;
    }

    // Come to rest
    return currentSandPosition;
  }
}

// Keep pouring sand units until sand starts pouring past the floor (lowest rock wall)
function pourSand() {
  while (true) {
    const result = dropSandUnit();

    if (result === null) {
      return;
    }

    allSandPositions.push(result);
  }
}

pourSand();
const numSandUnits = allSandPositions.length;
console.log(numSandUnits);
