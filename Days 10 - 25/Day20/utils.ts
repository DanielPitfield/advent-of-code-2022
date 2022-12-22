import { input } from "./input";

type ListItem = { value: number; id: number };

// The list of numbers in the initial arrangement
function getIntiialList(listConfig: { hasDecryptionKey: boolean }): ListItem[] {
  const initialList: ListItem[] = input.split("\n").map((value, index) => ({ value: parseInt(value), id: index }));

  if (!listConfig.hasDecryptionKey) {
    return initialList;
  }

  const DECRYPTION_KEY = 811589153;

  return initialList.map((x) => ({ value: x.value * DECRYPTION_KEY, id: x.id }));
}

function getNewIndex(index: number, value: number, listLength: number): number {
  return (index + Math.abs(value)) % listLength;
}

export function getMixedList(listConfig: { hasDecryptionKey: boolean; numListMixes: number }): ListItem[] {
  const initialList: ListItem[] = getIntiialList({ hasDecryptionKey: listConfig.hasDecryptionKey });

  // Make a copy of the initial arrangement
  const mixedList: ListItem[] = initialList.slice();

  // numListMixes number of times
  for (let i = 0; i < listConfig.numListMixes; i++) {
    // For each value in the initialList
    for (let j = 0; j < initialList.length; j++) {
      const item = initialList[j];

      // The list is circular so the list can be reversed instead of finding the modulus using negative numbers
      if (item.value < 0) {
        mixedList.reverse();
      }

      const oldIndex = mixedList.indexOf(item);
      // Remove from old position
      mixedList.splice(oldIndex, 1);

      const newIndex = getNewIndex(oldIndex, item.value, mixedList.length);
      // Insert into new position
      mixedList.splice(newIndex, 0, item);

      // Undo reversing (if previously reversed)
      if (item.value < 0) {
        mixedList.reverse();
      }
    }
  }

  return mixedList;
}

export function getGroveSum(list: ListItem[]): number | null {
  // Where is the value 0 in the list?
  const foundIndex = list.findIndex((item) => item.value === 0);

  // The value 0 couldn't be found in the list
  if (foundIndex === -1) {
    return null;
  }

  // The positions to check
  const groveIndexes: number[] = [1000, 2000, 3000];

  const groveValues: number[] = groveIndexes.map((position) => {
    const positionIndex = getNewIndex(foundIndex, position, list.length);
    return list[positionIndex].value;
  });

  return groveValues.reduce((a, b) => a + b, 0);
}
