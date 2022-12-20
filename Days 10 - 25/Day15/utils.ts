import { Position } from "../../Days 1 - 9/Day9/utils";

// The Manhattan distance between two points
export function calculateManhattanDistance(point1: Position, point2: Position): number {
  const diffX = Math.abs(point1.xPos - point2.xPos);
  const diffY = Math.abs(point1.yPos - point2.yPos);

  return diffX + diffY;
}

// What positions (that have a yPos of the targetRowNumber) cannot be the position of a sensor?
export function getExcludedPositions(sensorPosition: Position, distance: number, targetRowNumber: number): number[] {
  const minimumY = sensorPosition.yPos - distance;
  const maximumY = sensorPosition.yPos + distance;

  // None of the excluded positions will have a yPos which relates to the targetRowNumber
  if (!(targetRowNumber > minimumY && targetRowNumber < maximumY)) {
    return [];
  }

  // How many rows away from the sensor position?
  const rowDiff = Math.abs(sensorPosition.yPos - targetRowNumber);
  // How many positions will be excluded on this row (2n + 1)?
  const numExcludedPositionsForRow = Math.abs(distance - rowDiff) * 2 + 1;
  // Sensor is centered, same number of positions to the left than to the right
  const distanceEitherWay = (numExcludedPositionsForRow - 1) / 2;

  // What xPos (for the yPos of the targetRowNumber) are excluded positions?
  const targetRowXPositions: number[] = [];

  for (let xPos = sensorPosition.xPos - distanceEitherWay; xPos <= sensorPosition.xPos + distanceEitherWay; xPos++) {
    targetRowXPositions.push(xPos);
  }

  return targetRowXPositions;
}
