import { input } from "./input";

export const [stackData, instructionsData] = input.split("\n\n");

export function getItemStacks(): string[][] {
  // Each row of stacked items is a line from stackData
  const stackRows: string[] = stackData.split("\n");

  const stackNumbers: number[] = stackRows
    // The last row of stackRows (this also removes this line from stackRows)
    .splice(-1)[0]
    // Get the characters of the line and remove any characters which can't be parsed to a number
    .split("")
    .filter((x) => parseInt(x) > 0)
    // Parse the remaining characters to numbers
    .map((stackNumber) => parseInt(stackNumber));

  const numStacks: number = Math.max(...stackNumbers);
  const itemStacks: string[][] = new Array(numStacks).fill("").map((x) => []);

  // The notation for stacked items (uppercase letters)
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => letter.toUpperCase());
  // Each item position is an uppercase letter within angled brackets prefixed by an empty space
  const itemNotationSize: number = 4;

  for (const row of stackRows) {
    for (const [index, item] of row.split("").entries()) {
      if (alphabet.includes(item)) {
        // How far along the row and therefore which stackNumber is the item?
        const stackNumber: number = Math.floor(index / itemNotationSize);
        itemStacks[stackNumber].push(item);
      }
    }
  }

  // Every stack starting from the bottom item to top item
  return itemStacks.map((stack) => stack.reverse());
}

export function getTopItem(stack: string[]): string {
  return stack.at(-1) ?? "";
}
