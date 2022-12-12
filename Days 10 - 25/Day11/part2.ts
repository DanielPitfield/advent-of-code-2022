import { completeInspection, getBusinessLevel } from "./utils";

const monkeyInventories = completeInspection({numRounds: 10000, isWorried: true});
const monkeyBusinessLevel = getBusinessLevel(monkeyInventories);

console.log(monkeyBusinessLevel);
