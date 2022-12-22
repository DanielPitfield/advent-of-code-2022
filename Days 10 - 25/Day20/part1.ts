import { getGroveSum, getNewList } from "./utils";

const groveSum = getGroveSum(getNewList({ hasDecryptionKey: false, numListMixes: 1 }));
console.log(groveSum);
