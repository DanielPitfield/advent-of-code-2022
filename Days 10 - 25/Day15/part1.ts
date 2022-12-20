import { getExcludedPositions } from "./utils";

// What is the row number to check?
const targetRowNumber = 2000000;
const excludedPositions = getExcludedPositions(targetRowNumber);

// Subtract 1 as the sensor on the row doesn;t count as an excluded position
const numExcludedPositions = excludedPositions.length - 1;
console.log(numExcludedPositions);
