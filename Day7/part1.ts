import { createFileSystem, getTotalDirectorySizes } from "./utils";

const totalDirectorySizes = getTotalDirectorySizes();

const MAX_DIRECTORY_SIZE = 100000;
// The directories below this size
const smallDirectories = Array.from(totalDirectorySizes.entries()).filter(([_, size]) => size <= MAX_DIRECTORY_SIZE);
// The sum of the sizes of all these directories
const result = smallDirectories.map(([_, size]) => size).reduce((a, b) => a + b, 0);
console.log(result);
