import { input } from "./input";

const rucksacks = input.split("\n");

// Which letter (case sensitive) is in both compartments?
export function findCommonItem(compartments: string[][]): string | null {
  for (const item of compartments[0]) {
    if (compartments.every((x) => x.includes(item))) {
      return item;
    }
  }

  return null;
}

/*
  What is the number priority for the provided item?
  a-z (1 to 26)
  A-Z (27 to 52)
*/
export function getItemPriority(item: string | null): number {
  if (!item) {
    return 0;
  }

  const alphabetString: string = "abcdefghijklmnopqrstuvwxyz";
  const lowercaseArray: string[] = alphabetString.split("");
  const uppercaseArray: string[] = alphabetString.split("").map((letter) => letter.toUpperCase());
  const alphabetArray: string[] = lowercaseArray.concat(uppercaseArray);

  const positionIndex: number = alphabetArray.indexOf(item);

  if (!positionIndex) {
    return 0;
  }

  return positionIndex + 1;
}

const rucksackPriorties = rucksacks.map((rucksack) => {
  const items: string[] = rucksack.split("");
  const halfwayIndex: number = Math.floor(items.length / 2);

  const firstCompartment: string[] = items.slice(0, halfwayIndex);
  const secondCompartment: string[] = items.slice(halfwayIndex, items.length);

  const commonItem = findCommonItem([firstCompartment, secondCompartment]);

  return getItemPriority(commonItem);
});

const totalSum = rucksackPriorties.reduce((a, b) => a + b, 0);
console.log(totalSum);
