import { input } from "./input";

// Create a number array of every number between the two provided numbers
export function createNumberRange(lowerBound: number, upperBound: number) {
  const rangeLength = upperBound - lowerBound;
  return Array.from({ length: rangeLength + 1 }).map((_, index) => lowerBound + index);
}

// Is every number of the smallest of the two arrays within the largest of the two arrays?
function isRangeFullyContained(firstNumberRange: number[], secondNumberRange: number[]): boolean {
  const largestRange = firstNumberRange.length > secondNumberRange.length ? firstNumberRange : secondNumberRange;
  const smallestRange = firstNumberRange.length > secondNumberRange.length ? secondNumberRange : firstNumberRange;

  return smallestRange.every((num) => largestRange.includes(num));
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

  return isRangeFullyContained(firstNumberRange, secondNumberRange);
});

const totalNum: number = matchResults.filter((x) => x).length;
console.log(totalNum);
