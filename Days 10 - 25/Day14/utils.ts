import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";

export function getAllLinePoints(point1: Position, point2: Position): Position[] {
  const points: Position[] = [];

  // Horizontal line
  if (point1.yPos === point2.yPos) {
    const startingXPos = Math.min(point1.xPos, point2.xPos);
    const endingXPos = Math.max(point1.xPos, point2.xPos);

    for (let xPos = startingXPos; xPos <= endingXPos; xPos++) {
      points.push({ xPos, yPos: point1.yPos });
    }
  }

  // Vertical line
  if (point1.xPos === point2.xPos) {
    const startingYPos = Math.min(point1.yPos, point2.yPos);
    const endingYPos = Math.max(point1.yPos, point2.yPos);

    for (let yPos = startingYPos; yPos <= endingYPos; yPos++) {
      points.push({ xPos: point1.xPos, yPos });
    }
  }

  return points;
}

// At what positions is there a rock wall (denoted by the symbol # in the example)?
export function getRockWalls(floorConfig: { includeFloor: boolean }): Position[] {
  const lines = input.split("\n");

  const rockWalls: Position[][] = [];

  for (const line of lines) {
    const linePoints: Position[] = line
      // Each point in the line is delimited by ->
      .split("->")
      // Remove whitespace
      .map((point) => point.trim())
      // Split the point into the xPos and yPos
      .map((point) => point.split(","))
      // Convert to Position
      .map((point) => {
        return { xPos: parseInt(point[0]), yPos: parseInt(point[1]) };
      });

    for (let i = 0; i < linePoints.length - 1; i++) {
      const entireLine = getAllLinePoints(linePoints[i], linePoints[i + 1]);
      rockWalls.push(entireLine);
    }
  }

  if (floorConfig.includeFloor) {
    const FLOOR_HALF_WIDTH = 1000;
    const floorYPos = getFloorYPos({ rockWalls: rockWalls.flat(), isFloorSolid: true });
    
    const startOfFloor: Position = { xPos: -(FLOOR_HALF_WIDTH), yPos: floorYPos };
    const endOfFloor: Position = { xPos: FLOOR_HALF_WIDTH, yPos: floorYPos };
    const floor: Position[] = getAllLinePoints(startOfFloor, endOfFloor);

    rockWalls.push(floor);
  }

  return rockWalls.flat();
}

export function getFloorYPos(floorConfig: { rockWalls: Position[]; isFloorSolid: boolean }): number {
  // At what yPos is the lowest rock wall of the cave?
  const highestYPos = Math.max(...floorConfig.rockWalls.map((position) => position.yPos));

  // There is no floor, only the void
  if (!floorConfig.isFloorSolid) {
    return highestYPos;
  }

  // When the floor is solid, the floor is 2 positions below the lowest rock wall
  return highestYPos + 2;
}

// Is there sand or a rock wall at the provided position?
export function isPositionOccupied(allSandPositions: Position[], rockWalls: Position[], position: Position): boolean {
  return (
    allSandPositions.some((sand) => sand.xPos === position.xPos && sand.yPos === position.yPos) ||
    rockWalls.some((rock) => rock.xPos === position.xPos && rock.yPos === position.yPos)
  );
}

// Drop one unit of sand (recording where it comes to rest)
export function dropSandUnit(allSandPositions: Position[], rockWalls: Position[], floorYPos: number): Position | null {
  // The sand unit's position starts as the postion from where the sand is poured in
  const currentSandPosition: Position = { xPos: 500, yPos: 0 };

  while (true) {
    // Sand has reached or surpassed the yPos of the lowest wall
    if (currentSandPosition.yPos >= floorYPos) {
      return null;
    }

    // Source of the sand is blocked
    const sourcePosition: Position = { xPos: 500, yPos: 0 };
    if (isPositionOccupied(allSandPositions, rockWalls, sourcePosition)) {
      return null;
    }

    // Directly down
    const down: Position = { xPos: currentSandPosition.xPos, yPos: currentSandPosition.yPos + 1 };
    if (!isPositionOccupied(allSandPositions, rockWalls, down)) {
      currentSandPosition.yPos++;
      continue;
    }

    // Diagonally down and left
    const downLeft: Position = { xPos: currentSandPosition.xPos - 1, yPos: currentSandPosition.yPos + 1 };
    if (!isPositionOccupied(allSandPositions, rockWalls, downLeft)) {
      currentSandPosition.xPos--;
      currentSandPosition.yPos++;
      continue;
    }

    // Diagonally down and right
    const downRight: Position = { xPos: currentSandPosition.xPos + 1, yPos: currentSandPosition.yPos + 1 };
    if (!isPositionOccupied(allSandPositions, rockWalls, downRight)) {
      currentSandPosition.xPos++;
      currentSandPosition.yPos++;
      continue;
    }

    // Come to rest
    return currentSandPosition;
  }
}
