import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";
import { calculateManhattanDistance, getExcludedPositions } from "./utils";

const allExcludedPositions: Position[][] = [];

const lines = input.split("\n");

for (const line of lines) {
  const [sensorDescription, beaconDescription] = line.split(":");

  const sensorXPos = sensorDescription.split(" ")[2].split("=")[1];
  const sensorYPos = sensorDescription.split(" ")[3].split("=")[1];
  const sensorPosition: Position = { xPos: parseInt(sensorXPos), yPos: parseInt(sensorYPos) };

  const beaconXPos = beaconDescription.split(" ")[5].split("=")[1];
  const beaconYPos = beaconDescription.split(" ")[6].split("=")[1];
  const beaconPosition: Position = { xPos: parseInt(beaconXPos), yPos: parseInt(beaconYPos) };

  const distance = calculateManhattanDistance(sensorPosition, beaconPosition);
  const excludedPositions: Position[] = getExcludedPositions(sensorPosition, distance);

  allExcludedPositions.push(excludedPositions);
}
