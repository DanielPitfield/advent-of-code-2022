import { getGroveSum, getMixedList } from "./utils";

const mixedList = getMixedList({ hasDecryptionKey: true, numListMixes: 10 });
const groveSum = getGroveSum(mixedList);

console.log(groveSum);
