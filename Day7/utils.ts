import { input } from "./input";

type FileSystem = Directory[];
type Directory = { parentDirectory?: Directory; name: string; files: File[]; nestedDirectories: Directory[] };
type File = { name: string; size: number };

export function createFileSystem(): FileSystem {
  const fileSystem: FileSystem = [];
  let currentDirectory: Directory = { name: "start", files: [], nestedDirectories: [] };
  let isListingCurrentDirectory: boolean = false;

  // The lines of the terminal output
  const terminalOutputLines: string[] = input.split("\n");

  for (const line of terminalOutputLines) {
    // cd command
    if (line.startsWith("$") && line.includes("cd")) {
      // Not listing the files of a directory anymore, instead navigating to a new directory
      isListingCurrentDirectory = false;
      // Which directory to navigate to?
      const chosenDirectoryName: string = line.split(" ").at(-1) ?? "";

      // Root directory
      if (chosenDirectoryName === "/") {
        const rootDirectory = { name: "/", files: [], nestedDirectories: [] };
        fileSystem.push(rootDirectory);
        currentDirectory = rootDirectory;
        continue;
      }

      // Move out one directory
      if (chosenDirectoryName === ".." && currentDirectory.parentDirectory) {
        currentDirectory = currentDirectory.parentDirectory;
        continue;
      }

      // Move out to root directory
      if (chosenDirectoryName === ".." && !currentDirectory.parentDirectory) {
        currentDirectory = fileSystem.find(directory => directory.name === "/") ?? currentDirectory;
        continue;
      }

      // Move into a specified nested directory
      currentDirectory =
        currentDirectory.nestedDirectories.find((directory) => directory.name === chosenDirectoryName) ??
        currentDirectory;
      continue;
    }

    // ls command
    if (line.startsWith("$") && line.includes("ls")) {
      isListingCurrentDirectory = true;
      continue;
    }

    // directory folder
    if (line.split(" ")[0] === "dir" && isListingCurrentDirectory) {
      const newDirectoryName: string = line.split(" ").at(-1) ?? "";

      // Directory not yet within the nested directories of current directory
      if (!currentDirectory.nestedDirectories.some((directory) => directory.name === newDirectoryName)) {
        // Make the directory
        const newDirectory: Directory = {
          parentDirectory: currentDirectory,
          name: newDirectoryName,
          files: [],
          nestedDirectories: [],
        };

        // TODO: Add newDirectory to nestedDirectories of currentDirectory in fileSystem
      }

      continue;
    }

    // file
    const [size, name] = line.split(" ");
    const newFile: File = { name: name, size: parseInt(size) };

    // TODO: Add newFile to currentDirectory.files in fileSystem


  }

  return fileSystem;
}

// The sum of the file sizes of every file within a directory (including files within any nested directories)
export function getDirectoryTotalFileSize(directory: Directory): number[] {
  let size: number = 0;
  let accumulator: number = 0;

  // The sum of every file size at the top level of the directory
  const internalFileSizes: number[] = directory.files.map((file) => file.size);
  const totalInternalFileSize: number = internalFileSizes.reduce((a, b) => a + b, 0);
  size += totalInternalFileSize;

  for (const nestedDirectory of directory.nestedDirectories) {
    // Find the sum of every file size within the nested directory (recursion)
    const [nestedDirectorySize, nestedDirectoryAccumulator] = getDirectoryTotalFileSize(nestedDirectory);
    size += nestedDirectorySize;
    accumulator += nestedDirectoryAccumulator;
  }

  accumulator += size;

  // Return both values so that the nested function can recursively sum the file size (of every internal file or files within a nested directory)
  return [size, accumulator];
}

export function getFileSystemDirectorySizes(fileSystem: FileSystem): number[] {
  /*
  The recursive function, getDirectoryTotalFileSize() requires that two values are returned, to allow for recursion
  Once the recursion has finished, both of the values returned will be the same
  Therefore only one of the values is needed
  */
  return fileSystem.map((directory) => getDirectoryTotalFileSize(directory)[0]);
}
