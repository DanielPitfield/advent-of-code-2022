import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";

// The Manhattan distance between two points
export function calculateManhattanDistance(point1: Position, point2: Position): number {
  const diffX = Math.abs(point1.xPos - point2.xPos);
  const diffY = Math.abs(point1.yPos - point2.yPos);

  return diffX + diffY;
}

// The position of every sensor and the manhattan distance to their nearest beacon
export function getSensorData(): { position: Position; manhattanDistance: number }[] {
  const lines = input.split("\n");

  return lines.map((line) => {
    const [sensorDescription, beaconDescription] = line.split(":");

    const sensorXPos = sensorDescription.split(" ")[2].split("=")[1];
    const sensorYPos = sensorDescription.split(" ")[3].split("=")[1];
    const sensorPosition: Position = { xPos: parseInt(sensorXPos), yPos: parseInt(sensorYPos) };

    const beaconXPos = beaconDescription.split(" ")[5].split("=")[1];
    const beaconYPos = beaconDescription.split(" ")[6].split("=")[1];
    const beaconPosition: Position = { xPos: parseInt(beaconXPos), yPos: parseInt(beaconYPos) };

    // The Manhattan distance between the sensor and the beacon
    const manhattanDistance = calculateManhattanDistance(sensorPosition, beaconPosition);

    return { position: sensorPosition, manhattanDistance };
  });
}
