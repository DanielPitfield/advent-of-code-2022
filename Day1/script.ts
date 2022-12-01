import { input } from "./input";

const calorieArrays: string[][] = input
  // Split by empty lines
  .split("\n\n")
  // Map each block of values to an array of string values
  .map((x) => x.split("\n"));

const totals: number[] = [];

for (const item of calorieArrays) {
  const calorieArray: number[] = item.map((x) => parseInt(x));
  const sum: number = calorieArray.reduce((a, b) => a + b, 0);
  totals.push(sum);
}

const maxTotal: number = Math.max(...totals);
console.log(maxTotal)

// Largest to smallest
const sortedTotals = totals.sort((a, b) => {
  return b - a;
});
// Largest three values
const topThree = sortedTotals.slice(0, 3);

const sumTopThree = topThree.reduce((a, b) => a + b, 0);
console.log(sumTopThree);
