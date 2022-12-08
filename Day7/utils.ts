// Creates a key from a given path of directory strings
const createKeyFromPath = (path: string[]) => "/" + path.join("/");

type Directories = Map<string, number>;

// Parses the map of directories and their sizes from the input data
export const parseInput = (input: string) => {
  // Split the input data into individual lines
  const lines = input.split("\n");

  // Create a map of directories...
  const directories = new Map<string, number>() as Directories;
  // ... and an array to store the current directory
  let currentDirectory: string[] = [];

  // For each line of the input:
  lines.forEach((line) => {
    // cd command
    if (line.startsWith("$") && line.includes("cd")) {
      const directoryName: string = line.split(" ").at(-1) ?? "";

      // Back to root path
      if (directoryName === "/") {
        currentDirectory = [];
        return;
      }

      // Move out one directory
      if (directoryName === "..") {
        currentDirectory.pop();
        return;
      }

      // Move into specified directory
      return currentDirectory.push(directoryName);
    }

    // Create a key from the current path...
    const key = createKeyFromPath(currentDirectory);
    // ... and if it doesn't exist in the directories, add it
    if (!directories.has(key)) directories.set(key, 0);

    // dir command
    if (line.startsWith("dir ")) {
      return;
    }

    // File
    const size = Number(line.split(" ")[0]);
    // ... and add it to the current directory's size
    directories.set(key, directories.get(key)! + size);

    // Iterating backwards through the parent directories:
    for (let i = currentDirectory.length - 1; i >= 0; i--) {
      // Get the parent directories key...
      const parent = createKeyFromPath(currentDirectory.slice(0, i));
      // ... and add the file size to it's directory
      directories.set(parent, directories.get(parent)! + size);
    }
  });

  // Finally, return the directories
  return directories;
};

// Returns the sum of every directory's size within a given threshold
export const sumOfDirectories = (directories: Directories, threshold?: number) =>
  // Return the directory values...
  [...directories.values()]
    // 1. Filtered to be below/at the given threshold
    .filter((size) => (threshold ? size <= threshold : true))
    // 2. Added together
    .reduce((a, b) => a + b, 0);

// Returns the minimum size directory to delete in order to free up space
export const getSizeOfDirectoryToDelete = (directories: Directories, totalSpace: number, targetUnusedSpace: number) => {
  // Get the current unused space...
  const unusedSpace = totalSpace - directories.get("/")!;
  // ... and the minimum space needed to reach the target
  const spaceNeeded = targetUnusedSpace - unusedSpace;

  // Return the directory values...
  return (
    [...directories.values()]
      // 1. Filtered to be at/above the space needed
      .filter((size) => size >= spaceNeeded)
      // 2. Sorted in ascending order (smallet to largest)
      .sort((a, b) => a - b)
      // 3. Only the first item (or zero)
      .shift() || 0
  );
};
