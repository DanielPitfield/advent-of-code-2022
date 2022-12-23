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
function dropSand(): Position | null {
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
    }

    // Diagonally down and left
    else if (!isPositionOccupied({ xPos: currentSandPosition.xPos - 1, yPos: currentSandPosition.yPos + 1 })) {
      currentSandPosition.xPos--;
      currentSandPosition.yPos++;
    }

    // Diagonally down and right
    else if (!isPositionOccupied({ xPos: currentSandPosition.xPos + 1, yPos: currentSandPosition.yPos + 1 })) {
      currentSandPosition.xPos++;
      currentSandPosition.yPos++;
    }

    // Come to rest
    else {
      return currentSandPosition;
    }
  }
}

while (true) {
  const result = dropSand();

  if (result === null) {
    break;
  }

  allSandPositions.push(result);
}

const numSandUnits = allSandPositions.length;
console.log(numSandUnits);
