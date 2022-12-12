import { completeInspection, getBusinessLevel } from "./utils";

const monkeyInventories = completeInspection({ numRounds: 20, isWorried: false });
const monkeyBusinessLevel = getBusinessLevel(monkeyInventories);

console.log(monkeyBusinessLevel);
