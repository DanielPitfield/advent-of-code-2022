import { getGroveSum, getNewIndex, initialList } from "./utils";

function getNewList(): number[] {
  // Make a copy of the initial arrangement
  const newList: number[] = initialList.slice();

  // For each value in the initialList
  for (let i = 0; i < initialList.length; i++) {
    const value = initialList[i];
    const oldIndex = newList.findIndex((num) => num === value);
    const newIndex = getNewIndex(oldIndex, value);

    if (newIndex === null) {
      continue;
    }

    // Remove from old position
    const movedValues = newList.splice(oldIndex, 1);
    // Insert into new position
    newList.splice(newIndex, 0, movedValues[0]);
  }

  return newList;
}

const groveSum = getGroveSum(getNewList());
console.log(groveSum);
