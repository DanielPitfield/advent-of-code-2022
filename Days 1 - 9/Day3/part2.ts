import { input } from "./input";
import { findCommonItem, getItemPriority } from "./part1";

const rucksacks = input.split("\n");

const itemPriorities: number[] = [];

for (let i = 0; i < rucksacks.length; i += 3) {
  const groupCompartments: string[][] = [];

  for (let j = 0; j < 3; j++) {
    groupCompartments.push(rucksacks[i + j].split(""));
  }

  const commonItem = findCommonItem(groupCompartments);
  const itemPriority = getItemPriority(commonItem);

  itemPriorities.push(itemPriority);
}

const totalSum = itemPriorities.reduce((a, b) => a + b, 0);
console.log(totalSum);
