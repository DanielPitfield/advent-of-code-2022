import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";
import { calculateManhattanDistance, getExcludedPositions } from "./utils";

// Array to hold arrays of the x positions of excluded positions (which have a yPos of the targetRowNumber)
const allExcludedPositions: number[][] = [];

const lines = input.split("\n");

// What is the row number to check?
const targetRowNumber = 2000000;

// Parsing the sensor and beacon position
for (const line of lines) {
  const [sensorDescription, beaconDescription] = line.split(":");

  const sensorXPos = sensorDescription.split(" ")[2].split("=")[1];
  const sensorYPos = sensorDescription.split(" ")[3].split("=")[1];
  const sensorPosition: Position = { xPos: parseInt(sensorXPos), yPos: parseInt(sensorYPos) };

  const beaconXPos = beaconDescription.split(" ")[5].split("=")[1];
  const beaconYPos = beaconDescription.split(" ")[6].split("=")[1];
  const beaconPosition: Position = { xPos: parseInt(beaconXPos), yPos: parseInt(beaconYPos) };

  // The Manhattan distance between the sensor and the beacon
  const distance = calculateManhattanDistance(sensorPosition, beaconPosition);

  // What positions can there not be another sensor (because the current sensor must be the closest to the beacon)?
  const excludedPositions = getExcludedPositions(sensorPosition, distance, targetRowNumber);

  allExcludedPositions.push(excludedPositions);
}

// How many positions on this row cannot be the position of a sensor?
const numTargetExcludedPositions = new Set(allExcludedPositions.flat());
console.log(numTargetExcludedPositions.size);
