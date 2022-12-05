import { getMovedItemStacks, getTopItemMessage } from "./utils";

const itemStacks = getMovedItemStacks(true);
console.log(getTopItemMessage(itemStacks));