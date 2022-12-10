import { getMovedItemStacks, getTopItemMessage } from "./utils";

const itemStacks = getMovedItemStacks({ isMultipleMoveAllowed: true });
console.log(getTopItemMessage(itemStacks));
