import { Position } from "../../Days 1 - 9/Day9/utils";
import { getRockWalls } from "./utils";

// Where does the sand start pouring in from?
const startingSandPosition: Position = { xPos: 500, yPos: 0 };
// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls();

// At what positions has sand come to rest/settled at?
const allSandPositions: Position[] = [];

// Is there a rock wall at the provided position?
function isPositionRockWall(position: Position): boolean {
  return rockWalls.some((rock) => rock.xPos === position.xPos && rock.yPos === position.yPos);
}

// Is there a unit of sand (which has come to rest) at the provided position?
function isPositionSettledSand(position: Position): boolean {
  return allSandPositions.some((sand) => sand.xPos == position.xPos && sand.yPos === position.yPos);
}

// Drop one unit of sand (recording where it comes to rest)
function dropSand() {
  let isFalling = true;
  const currentSandPosition: Position = startingSandPosition;

  while (isFalling) {
    currentSandPosition.yPos++;

    // If the unit of sand has dropped and hit a rock wall
    if (isPositionRockWall(currentSandPosition)) {
    }

    // If the unit of sand has dropped and hit another unit of sand
    if (isPositionSettledSand(currentSandPosition)) {
    }
  }
}
