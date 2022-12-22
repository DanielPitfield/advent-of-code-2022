import { getGroveSum, getNewList } from "./utils";

const groveSum = getGroveSum(getNewList({ hasDecryptionKey: true, numListMixes: 10 }));
console.log(groveSum);
