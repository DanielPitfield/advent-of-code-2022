import { input } from "./input";
import { isPairOrdered } from "./utils";

const pairs = input.split("\n\n");

let sumIndices = 0;

for (let i = 0; i < pairs.length; i++) {
  const [leftSide, rightSide] = pairs[i].split("\n").map((x) => JSON.parse(x));

  if (isPairOrdered(leftSide, rightSide)) {
    // First pair is index 1 (therefore i + 1)
    sumIndices += i + 1;
  }
}

console.log(sumIndices);

// This should be true and not undefined
console.log(isPairOrdered([1], [[1], 1]));

// Should this also be true?
console.log(isPairOrdered([4], [4]));
