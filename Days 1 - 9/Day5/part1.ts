import { getMovedItemStacks, getTopItemMessage } from "./utils";

const itemStacks = getMovedItemStacks({ isMultipleMoveAllowed: false });
console.log(getTopItemMessage(itemStacks));
