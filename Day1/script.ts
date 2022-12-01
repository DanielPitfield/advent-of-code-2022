import { input } from "./input";

const calorieTotals: number[] = input
  // Split by empty lines
  .split("\n\n")
  // Map each block of values to their sum
  .map((x) => {
    const stringValues: string[] = x.split("\n");
    const numberValues: number[] = stringValues.map((x) => parseInt(x));
    const sum: number = numberValues.reduce((a, b) => a + b, 0);
    return sum;
  });

// Largest value
const maxTotal: number = Math.max(...calorieTotals);
console.log(maxTotal);

function sumOfLargest(numValues: number) {
  // Largest to smallest
  const sortedTotals = calorieTotals.sort((a, b) => {
    return b - a;
  });

  // Sum of the provided number of values
  return sortedTotals.slice(0, numValues).reduce((a, b) => a + b, 0);
}

// Sum of largest three values
console.log(sumOfLargest(3));
