import { createFileSystem, getFileSystemDirectorySizes } from "./utils";

const fileSystem = createFileSystem();
const directorySizes: number[] = getFileSystemDirectorySizes(fileSystem);

const MAX_LIMIT: number = 100000;
const filteredDirectorySizes: number[] = directorySizes.filter((size) => size <= MAX_LIMIT);

const sumFilteredDirectorySizes: number = filteredDirectorySizes.reduce((a, b) => a + b, 0);
console.log(sumFilteredDirectorySizes);