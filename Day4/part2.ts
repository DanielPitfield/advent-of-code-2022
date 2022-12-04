import { input } from "./input";
import { createNumberRange } from "./part1";

function isOverlap(firstNumberRange: number[], secondNumberRange: number[]): boolean {
  if (firstNumberRange.some((num) => secondNumberRange.includes(num))) {
    return true;
  }

  if (secondNumberRange.some((num) => firstNumberRange.includes(num))) {
    return true;
  }

  return false;
}

const sectionRangePairs: string[] = input.split("\n");

const matchResults: boolean[] = sectionRangePairs.map((pair) => {
  // Split each line by the comma delimiter (to get each of the two ranges)
  const [firstRange, secondRange] = pair.split(",");

  // Split both ranges by the "-" delimiter to get the lower and upper bounds
  const [firstRangeLowerBound, firstRangeUpperBound] = firstRange.split("-").map((x) => parseInt(x));
  const [secondRangeLowerBound, secondRangeUpperBound] = secondRange.split("-").map((x) => parseInt(x));

  const firstNumberRange = createNumberRange(firstRangeLowerBound, firstRangeUpperBound);
  const secondNumberRange = createNumberRange(secondRangeLowerBound, secondRangeUpperBound);

  return isOverlap(firstNumberRange, secondNumberRange);
});

const totalNum: number = matchResults.filter((x) => x).length;
console.log(totalNum);
