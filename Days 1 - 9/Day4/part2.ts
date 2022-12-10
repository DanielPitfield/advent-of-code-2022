import { getSectionRangePairs } from "./utils";

// Is there a number which is in both arrays?
function isOverlap(firstNumberRange: number[], secondNumberRange: number[]): boolean {
  return firstNumberRange.some((num) => secondNumberRange.includes(num));
}

const matchResults: boolean[] = getSectionRangePairs().map((pair) => isOverlap(pair.firstRange, pair.secondRange));

const totalNum: number = matchResults.filter((x) => x).length;
console.log(totalNum);