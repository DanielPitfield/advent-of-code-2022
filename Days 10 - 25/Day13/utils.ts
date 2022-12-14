export function isPairOrdered(leftSide: any[], rightSide: any[]): boolean | undefined {
  // How many items is in the largest array of the pair?
  const maxLength = Math.max(leftSide.length, rightSide.length);

  for (let i = 0; i < maxLength; i++) {
    const leftSideItem = leftSide[i];
    const rightSideItem = rightSide[i];

    // Ran out of items on the left side, the pair is ordered
    if (leftSideItem === undefined) {
      return true;
    }

    if (rightSideItem === undefined) {
      return false;
    }

    // Both integers
    if (Number.isInteger(leftSideItem) && Number.isInteger(rightSideItem)) {
      // The items currently being checked on each side are equal, check the next item
      if (leftSideItem === rightSideItem) {
        if (i === maxLength - 1) {
          return true;
        }

        continue;
      }

      // The left side item must be smaller than the right side item (for the pair to be ordered)
      return leftSideItem < rightSideItem;
    }

    // Right side is an array but the left side is not
    if (!Array.isArray(leftSideItem)) {
      // Recursively call function with left side as an array
      return isPairOrdered([leftSideItem], rightSideItem);
    }

    if (!Array.isArray(rightSideItem)) {
      return isPairOrdered(leftSideItem, [rightSideItem]);
    }

    if (JSON.stringify(leftSideItem) === JSON.stringify(rightSideItem)) {
      if (i === maxLength - 1) {
        return true;
      }

      continue;
    }

    const currentOutcome: boolean | undefined = isPairOrdered(leftSideItem, rightSideItem);

    // If the outcome can be determined at this stage in the recursion, return (stop recursion)
    if (currentOutcome !== undefined) {
      return currentOutcome;
    }
  }
}
