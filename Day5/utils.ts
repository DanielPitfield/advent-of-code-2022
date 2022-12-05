import { input } from "./input";

export const [stackData, instructionsData] = input.split("\n\n");

// The initial items in each of the stacks
export function getInitialItemStacks(): string[][] {
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

// The item stacks after each instruction from the data is applied
export function getMovedItemStacks(isMultipleMoveAllowed: boolean): string[][] {
  const itemStacks = getInitialItemStacks();
  const instructions: string[] = instructionsData.split("\n");

  for (const instruction of instructions) {
    const instructionParts = instruction.split(" ");

    // How many items are being moved?
    const numItems: number = parseInt(instructionParts[1]);
    // Which stack number are the items being taken from?
    const stackNumberFrom: number = parseInt(instructionParts[3]);
    // Which stack number are the items going to?
    const stackNumberTo: number = parseInt(instructionParts[5]);

    // Remove items from stack and keep track of them
    const itemsToMove: string[] = itemStacks[stackNumberFrom - 1].splice(-numItems);

    if (isMultipleMoveAllowed) {
      // Can move the items (in the order that they currently are) all at once
      itemStacks[stackNumberTo - 1] = itemStacks[stackNumberTo - 1].concat(itemsToMove);
    } else {
      // Use a loop instead of concatenating because the items must be added one at a time (from top to bottom)
      for (let i = itemsToMove.length - 1; i >= 0; i--) {
        itemStacks[stackNumberTo - 1].push(itemsToMove[i]);
      }
    }
  }

  return itemStacks;
}

function getTopItem(stack: string[]): string {
  return stack.at(-1) ?? "";
}

export function getTopItemMessage(itemStacks: string[][]): string {
  const topItems: string[] = itemStacks.map((stack) => getTopItem(stack));
  return topItems.join("");
}
