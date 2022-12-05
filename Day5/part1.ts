import { getItemStacks, getTopItem, instructionsData } from "./utils";

const itemStacks = getItemStacks();
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

  // Use a loop instead of concatenating because the items must be added one at a time (from top to bottom)
  for (let i = itemsToMove.length - 1; i >= 0; i--) {
    itemStacks[stackNumberTo - 1].push(itemsToMove[i]);
  }
}

const topItems: string[] = itemStacks.map((stack) => getTopItem(stack));
console.log(topItems.join(""));
