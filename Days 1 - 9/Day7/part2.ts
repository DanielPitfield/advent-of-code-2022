import { getTotalDirectorySizes } from "./utils";

// Total capacity of disk
const TOTAL_DISK_SPACE: number = 70000000;
// How big is the update?
const UPDATE_SIZE: number = 30000000;

const totalDirectorySizes = getTotalDirectorySizes();
// How much capacity of the disk is currently used?
const rootDirectorySize: number = totalDirectorySizes.get("") ?? 0;

// How much capacity is left unused on the disk?
const TOTAL_FREE_SPACE = TOTAL_DISK_SPACE - rootDirectorySize;

// Not enough space for the update
if (TOTAL_FREE_SPACE < UPDATE_SIZE) {
  // How much more space is needed?
  const SIZE_TO_DELETE = UPDATE_SIZE - TOTAL_FREE_SPACE;
  // Directories large enough, that when deleted, would free up enough space
  const suitableDirectories = Array.from(totalDirectorySizes.entries()).filter(([_, size]) => size >= SIZE_TO_DELETE);

  // Smallest to largest
  const sortedSuitableDirectories = suitableDirectories.map(([_, size]) => size).sort((a, b) => a - b);
  // The smallest directory large enough to allow update
  const result = sortedSuitableDirectories[0];
  console.log(result);
} else {
  console.log("Already enough space for update");
}
