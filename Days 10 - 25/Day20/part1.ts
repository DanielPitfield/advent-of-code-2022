import { getGroveSum, getMixedList } from "./utils";

const mixedList = getMixedList({ hasDecryptionKey: false, numListMixes: 1 });
const groveSum = getGroveSum(mixedList);

console.log(groveSum);
