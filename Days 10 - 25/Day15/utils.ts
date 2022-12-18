import { Position } from "../../Days 1 - 9/Day9/utils";

// The Manhattan distance between two points
export function calculateManhattanDistance(point1: Position, point2: Position): number {
  const diffX = Math.abs(point1.xPos - point2.xPos);
  const diffY = Math.abs(point1.yPos - point2.yPos);

  return diffX + diffY;
}

// What positions can't have another sensor (when given a sensor position and the distance around it where another sensor cannot be)?
export function getExcludedPositions(sensorPosition: Position, distance: number): Position[] {
  const excludedPositions: Position[] = [];

  // From the row (which is distance number of rows above the sensor position) to the row (which is distance number of rows below the sensor position)
  for (let yPos = sensorPosition.yPos - distance; yPos <= sensorPosition.yPos + distance; yPos++) {
    // How many rows away from the sensor position?
    const rowDiff = Math.abs(sensorPosition.yPos - yPos);
    // How many positions will be excluded on this row (2n + 1)?
    const numExcludedPositionsForRow = Math.abs(distance - rowDiff) * 2 + 1;
    // Middle/center is the sensor, half of the rest of the positions to left, half on right
    const distanceEitherWay = Math.floor((numExcludedPositionsForRow - 1) / 2);

    for (let xPos = sensorPosition.xPos - distanceEitherWay; xPos <= sensorPosition.xPos + distanceEitherWay; xPos++) {
      const excludedPosition: Position = { xPos: xPos, yPos: yPos };
      excludedPositions.push(excludedPosition);
    }
  }

  return excludedPositions;
}
