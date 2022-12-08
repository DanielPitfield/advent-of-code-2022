import { input } from "./input";
import { parseInput, sumOfDirectories, getSizeOfDirectoryToDelete } from "./utils";

// Get the directory/size map from the input data
const directories = parseInput(input);

// Get the sum of directory sizes below 100000
const sumBelow100000 = sumOfDirectories(directories, 100000);

console.log("Sum of directory sizes below 100000:", sumBelow100000, "(Part 1)");

// Get the size of the directory to delete in order to free up space
const sizeOfDirectoryToDelete = getSizeOfDirectoryToDelete(
  directories,
  // Total disk space
  70000000,
  // Target unused space
  30000000
);

console.log("Size of directory to delete:", sizeOfDirectoryToDelete, "(Part 2)");
