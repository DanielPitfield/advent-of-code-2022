import { getMonkeyValue, monkeys } from "./utils";

const rootMonkey = monkeys["root"];
const rootMonkeyValue = getMonkeyValue(rootMonkey);

console.log(rootMonkeyValue);
