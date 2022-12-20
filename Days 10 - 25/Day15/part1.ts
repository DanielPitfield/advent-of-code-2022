import { Position } from "../../Days 1 - 9/Day9/utils";
import { getSensorData, calculateManhattanDistance } from "./utils";

// What is the row number to check?
const targetRowNumber = 2000000;

// What positions (that have a yPos of the targetRowNumber) cannot be the position of a sensor?
function getExcludedPositions(targetRowNumber: number): number[] {
  const sensorData = getSensorData();

  // The xPos values for the excluded positions
  const excludedPositions: Set<number> = new Set();

  // Parsing the sensor and beacon position
  for (const sensor of sensorData) {
    for (
      let xPos = sensor.position.xPos - sensor.manhattanDistance;
      xPos <= sensor.position.xPos + sensor.manhattanDistance;
      xPos++
    ) {
      const currentlyScannedPosition: Position = { xPos: xPos, yPos: targetRowNumber };

      // Within the distance between the sensor and beacon?
      if (calculateManhattanDistance(sensor.position, currentlyScannedPosition) <= sensor.manhattanDistance) {
        excludedPositions.add(xPos);
      }
    }
  }

  return Array.from(excludedPositions);
}

// Subtract 1 as the sensor on the row doesn't count as an excluded position
const numExcludedPositions = getExcludedPositions(targetRowNumber).length - 1;
console.log(numExcludedPositions);
