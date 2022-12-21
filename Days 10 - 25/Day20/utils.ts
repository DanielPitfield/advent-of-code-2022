import { input } from "./input";

// The list of numbers in the initial arrangement
export const initialList: number[] = input.split("\n").map((x) => parseInt(x));
export const listLength = initialList.length;

export function getNewIndex(index: number, value: number): number | null {
  const relativeIndex: number = index + value;

  // Wrap to end of array (can't insert at start)
  if (relativeIndex === 0) {
    return listLength - 1;
  }

  // Within array bounds?
  if (relativeIndex > 0 && relativeIndex <= listLength - 1) {
    return relativeIndex;
  }

  // Circularly wrapping forwards
  if (relativeIndex >= listLength) {
    return relativeIndex % (listLength - 1);
  }

  if (relativeIndex < 0) {
    return listLength + relativeIndex - 1;
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
    return newList[getNewIndex(foundIndex, position) ?? 0];
  });

  return groveValues.reduce((a, b) => a + b, 0);
}
