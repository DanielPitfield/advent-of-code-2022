import { input } from "./input";

// The list of numbers in the initial arrangement
export const initialList: number[] = input.split("\n").map((x) => parseInt(x));
export const listLength = initialList.length;

// TODO: Too many edge cases, refactor
export function getNewIndex(index: number, value: number): number | null {
  // No movement
  if (value === 0) {
    return index;
  }

  // How many index positions forwards or backwards should the value be moved?
  const newRelativeIndex = (index + value) % listLength;

  // Pushed back and circularly wrapped to end of array
  if (newRelativeIndex === 0) {
    return listLength - 1;
  }

  // Wrapped circularly forwards (add 1 as wrapping around doesn't count as moving a position)
  if (index + value > listLength) {
    return newRelativeIndex + 1;
  }

  // Wrapped circularly backwards (subtract 1 as wrapping around doesn't count as moving a position)
  if (newRelativeIndex < 0) {
    return listLength + newRelativeIndex - 1;
  }

  // Within the bounds of the initialList array
  if (newRelativeIndex > 0 && newRelativeIndex < listLength) {
    return newRelativeIndex;
  }

  return null;
}

export function getGroveSum(newList: number[]): number | null {
  // Where is the value 0 in the list?
  const foundIndex = newList.findIndex((num) => num === 0);

  // The value 0 couldn't be found in the list
  if (foundIndex === -1) {
    return null;
  }

  // The positions to check
  const positions: number[] = [1000, 2000, 3000];

  const groveValues: number[] = positions.map((position) => {
    const positionIndex = getNewIndex(foundIndex, position);

    if (positionIndex === null) {
      return 0;
    }

    return newList[positionIndex];
  });

  return groveValues.reduce((a, b) => a + b, 0);
}
