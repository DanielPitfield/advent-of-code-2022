import { getSectionRangePairs } from "./utils";

// Is every number of the smallest of the two arrays within the largest of the two arrays?
function isRangeFullyContained(firstNumberRange: number[], secondNumberRange: number[]): boolean {
  const largestRange = firstNumberRange.length > secondNumberRange.length ? firstNumberRange : secondNumberRange;
  const smallestRange = firstNumberRange.length > secondNumberRange.length ? secondNumberRange : firstNumberRange;

  return smallestRange.every((num) => largestRange.includes(num));
}

const matchResults: boolean[] = getSectionRangePairs().map((pair) =>
  isRangeFullyContained(pair.firstRange, pair.secondRange)
);

const totalNum: number = matchResults.filter((x) => x).length;
console.log(totalNum);
