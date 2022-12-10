import { input } from "./input";

const calorieTotals: number[] = input
  // Split by empty lines
  .split("\n\n")
  // Map each list/block (where the values are seperated by a new line) to their sum
  .map((list: string) => {
    const calorieValues: number[] = list.split("\n").map((x) => parseInt(x));
    return calorieValues.reduce((a, b) => a + b, 0);
  });

function sumOfLargest(arr: number[], numValues: number) {
  // Largest to smallest
  const sortedArr = arr.sort((a, b) => {
    return b - a;
  });

  // Sum of the provided number of values
  return sortedArr.slice(0, numValues).reduce((a, b) => a + b, 0);
}

// Largest value
const maxTotal: number = Math.max(...calorieTotals);
console.log(maxTotal);

// Sum of the largest three values in calorieTotals
console.log(sumOfLargest(calorieTotals, 3));
