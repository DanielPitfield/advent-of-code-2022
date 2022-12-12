import { completeInspection, getBusinessLevel } from "./utils";

const NUM_ROUNDS = 10000;
const monkeyInventories = completeInspection(NUM_ROUNDS, true);
const monkeyBusinessLevel = getBusinessLevel(monkeyInventories);

console.log(monkeyBusinessLevel);
