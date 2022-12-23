import { Position } from "../../Days 1 - 9/Day9/utils";
import { getRockWalls } from "./utils";

// Where does the sand start pouring in from?
const startingSandPosition: Position = { xPos: 500, yPos: 0 };
// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls();
// At what yPos is the bottom floor of the cave?
const floorYPos: number = Math.max(...rockWalls.map((position) => position.yPos));
// At what positions has sand come to rest/settled at?
const allSandPositions: Position[] = [];

// Is there sand or a rock wall at the provided position?
function isPositionOccupied(position: Position): boolean {
  return (
    allSandPositions.some((sand) => sand.xPos == position.xPos && sand.yPos === position.yPos) ||
    rockWalls.some((rock) => rock.xPos === position.xPos && rock.yPos === position.yPos)
  );
}

// Drop one unit of sand (recording where it comes to rest)
function dropSand(): Position | null {
  const currentSandPosition: Position = startingSandPosition;

  while (true) {
    // Fallen off left, filling above starting position, or somehow reached past the floor
    if (currentSandPosition.xPos < 0 || currentSandPosition.yPos < 0 || currentSandPosition.yPos >= floorYPos) {
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

while (true) {
  const result = dropSand();

  if (result === null) {
    break;
  }

  allSandPositions.push(result);
}

const numSandUnits = allSandPositions.length;
console.log(numSandUnits);
