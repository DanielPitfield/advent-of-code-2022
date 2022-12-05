import { getMovedItemStacks, getTopItemMessage } from "./utils";

const itemStacks = getMovedItemStacks(false);
console.log(getTopItemMessage(itemStacks));
