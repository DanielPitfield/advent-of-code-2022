import { input } from "./input";

function isPairOrdered(leftSide: any[], rightSide: any[]): boolean | undefined {
  // Left side has no items
  if (!leftSide) {
    return true;
  }

  // Right side has no items
  if (!rightSide) {
    return false;
  }

  // How many items (wther that be integers or more nested arrays) does the larger side have?
  const largestSideLength: number = Math.max(leftSide.length, rightSide.length);

  for (let i = 0; i < largestSideLength; i++) {
    const leftSideItem = leftSide[i];
    const rightSideItem = rightSide[i];

    // Left side has ran out of items before the right side, this means they are ordered
    if (!leftSideItem) {
      return true;
    }

    if (!rightSideItem) {
      return false;
    }

    // The currently iterated item on both sides are just integers
    if (Number.isInteger(leftSideItem) && Number.isInteger(rightSideItem)) {
      // Are equal, can't determine whether they are ordered just yet, move on to next integers on each side
      if (leftSideItem === rightSideItem) {
        continue;
      }

      // The integer on the left must be smaller than the integer on the right for the pair to be ordered
      return leftSideItem < rightSideItem;
    }

    // The left side item is not an array but the right side is
    if (!Array.isArray(leftSideItem)) {
      // Recursively call the function, now with the left side as an array
      return isPairOrdered([leftSideItem], rightSideItem);
    }

    if (!Array.isArray(rightSideItem)) {
      return isPairOrdered(leftSideItem, [rightSideItem]);
    }

    // At this stage in the recursion, can it be determined whether the pair is in order?
    const currentOutcome: boolean | undefined = isPairOrdered(leftSideItem, rightSideItem);

    // If the outcome is conclusive (is a boolean and not undefined)
    if (currentOutcome) {
      return currentOutcome;
    }
  }
}

let sumIndices = 0;

const pairs = input.split("\n\n");

for (const [pairIndex, pair] of pairs.entries()) {
  const [leftSide, rightSide] = pair.split("\n").map((x) => JSON.parse(x));

  if (isPairOrdered(leftSide, rightSide)) {
    // Remember first pair has the index 1 (therefore pairIndex + 1)
    sumIndices += pairIndex + 1;
  }
}

console.log(sumIndices);