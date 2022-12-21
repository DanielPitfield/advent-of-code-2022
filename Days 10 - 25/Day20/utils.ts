import { input } from "./input";

// The list of numbers in the initial arrangement
export const initialList: { value: number; id: number }[] = input
  .split("\n")
  .map((value, index) => ({ value: parseInt(value), id: index }));
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

export function getGroveSum(newList: { value: number; id: number }[]): number | null {
  // Where is the value 0 in the list?
  const foundIndex = newList.findIndex((x) => x.value === 0);

  // The value 0 couldn't be found in the list
  if (foundIndex === -1) {
    return null;
  }

  // The positions to check
  const grovePositions: number[] = [1000, 2000, 3000];

  const groveValues: number[] = grovePositions.map((position) => {
    const positionIndex = (position + foundIndex) % listLength;
    return newList[positionIndex].value;
  });

  return groveValues.reduce((a, b) => a + b, 0);
}
