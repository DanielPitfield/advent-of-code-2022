import { input } from "./input";

// Create a number array of every number between the two provided numbers
export function createNumberRange(lowerBound: number, upperBound: number) {
  const rangeLength = upperBound - lowerBound;
  return Array.from({ length: rangeLength + 1 }).map((_, index) => lowerBound + index);
}

// Parse the data and return the two number ranges from each line
export function getSectionRangePairs(): { firstRange: number[]; secondRange: number[] }[] {
  const sectionRangePairs: string[] = input.split("\n");

  return sectionRangePairs.map((pair) => {
    // Split each line by the comma delimiter (to get each of the two ranges)
    const [firstRange, secondRange] = pair.split(",");

    // Split both ranges by the "-" delimiter to get the lower and upper bounds
    const [firstRangeLowerBound, firstRangeUpperBound] = firstRange.split("-").map((x) => parseInt(x));
    const [secondRangeLowerBound, secondRangeUpperBound] = secondRange.split("-").map((x) => parseInt(x));

    const firstNumberRange = createNumberRange(firstRangeLowerBound, firstRangeUpperBound);
    const secondNumberRange = createNumberRange(secondRangeLowerBound, secondRangeUpperBound);

    return { firstRange: firstNumberRange, secondRange: secondNumberRange };
  });
}
