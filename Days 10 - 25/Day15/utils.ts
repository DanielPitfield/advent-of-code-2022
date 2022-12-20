import { Position } from "../../Days 1 - 9/Day9/utils";

// The Manhattan distance between two points
export function calculateManhattanDistance(point1: Position, point2: Position): number {
  const diffX = Math.abs(point1.xPos - point2.xPos);
  const diffY = Math.abs(point1.yPos - point2.yPos);

  return diffX + diffY;
}

// What positions (that have a yPos of the targetRowNumber) cannot be the position of a sensor?
export function getExcludedPositions(sensorPosition: Position, distance: number, targetRowNumber: number): number[] {
  // What xPos (for the yPos of the targetRowNumber) are excluded positions?
  const targetRowXPositions: Set<number> = new Set();

  for (let xPos = sensorPosition.xPos - distance; xPos <= sensorPosition.xPos + distance; xPos++) {
    const currentlyScannedPosition: Position = { xPos: xPos, yPos: targetRowNumber };

    // Within the distance between the sensor and beacon
    if (calculateManhattanDistance(sensorPosition, currentlyScannedPosition) <= distance) {
      targetRowXPositions.add(xPos);
    }
  }

  return Array.from(targetRowXPositions);
}
