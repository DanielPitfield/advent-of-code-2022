import { Position } from "../../Days 1 - 9/Day9/utils";
import { calculateManhattanDistance, getSensorData } from "./utils";

const maxPositionRestrcition = 4000000;
const sensorData = getSensorData();

// Is the position further away than the pairing beacon of every sensor?
function isPositionUndetected(position: Position): boolean {
  return sensorData.every((sensor) => calculateManhattanDistance(sensor.position, position) > sensor.manhattanDistance);
}

// The four possible positions (if the sign of either x or y can be either/both positive or negative)
function getPositionCombinations(position: Position): Position[] {
  const positionCombinations: Position[] = [];

  positionCombinations.push({ xPos: position.xPos, yPos: position.yPos });
  positionCombinations.push({ xPos: position.xPos * -1, yPos: position.yPos });
  positionCombinations.push({ xPos: position.xPos, yPos: position.yPos * -1 });
  positionCombinations.push({ xPos: position.xPos * -1, yPos: position.yPos * -1 });

  return positionCombinations;
}

function getTuningFrequency(maxPositionRestrcition: number): number | null {
  for (const sensor of sensorData) {
    for (let xDiff = 0; xDiff <= sensor.manhattanDistance + 1; xDiff++) {
      // As the xPos increases, the yDiff must decrease for the manhattan distance to stay the same
      const yDiff = sensor.manhattanDistance + 1 - xDiff;

      const xPos = sensor.position.xPos + xDiff;
      const yPos = sensor.position.yPos + yDiff;

      const positionCombinations = getPositionCombinations({ xPos, yPos });

      // Both xPos and yPos are within the restriction and the position is not detected by any sensor
      for (const position of positionCombinations) {
        if (
          position.xPos >= 0 &&
          position.yPos >= 0 &&
          position.xPos <= maxPositionRestrcition &&
          position.yPos <= maxPositionRestrcition &&
          isPositionUndetected(position)
        ) {
          // This position is the distress signal, do the unique calculation to get the tuning frequency
          return position.xPos * 4000000 + position.yPos;
        }
      }
    }
  }

  return null;
}

const tuningFrequency = getTuningFrequency(maxPositionRestrcition);
console.log(tuningFrequency);
