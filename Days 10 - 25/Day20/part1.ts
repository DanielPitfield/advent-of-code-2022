import { getGroveSum, getNewIndex, initialList } from "./utils";

function getNewList(): { value: number; id: number }[] {
  // Make a copy of the initial arrangement
  const newList: { value: number; id: number }[] = initialList.slice();

  // For each value in the initialList
  for (let i = 0; i < initialList.length; i++) {
    const item = initialList[i];

    const oldIndex = newList.findIndex((x) => x.value === item.value && x.id === item.id);
    const newIndex = getNewIndex(oldIndex, item.value);

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
