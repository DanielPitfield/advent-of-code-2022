import { input } from "./input";

const calorieArrays: string[][] = input
// Split by empty lines
.split("\n\n")
// Map each block of values to an array of string values
.map((x) => x.split("\n"));

const totals: number[] = [];

for (const item of calorieArrays) {
    const calorieArray: number[] = item.map(x => parseInt(x));
    const sum: number = calorieArray.reduce((a,b) => a+b, 0);
    totals.push(sum);
}

const maxTotal: number = Math.max(...totals);
console.log(maxTotal);