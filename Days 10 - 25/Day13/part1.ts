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
