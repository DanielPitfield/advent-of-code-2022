import { Position } from "../../Days 1 - 9/Day9/utils";
import { getRockWalls } from "./utils";

// Where does the sand start pouring in from?
const startingSandPosition: Position = { xPos: 500, yPos: 0 };
// At what positions are there rock walls?
const rockWalls: Position[] = getRockWalls();

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
function dropSand() {
  let isFalling = true;
  const currentSandPosition: Position = startingSandPosition;

  while (isFalling) {
    currentSandPosition.yPos++;

    if (isPositionOccupied(currentSandPosition)) {
    }
  }
}
