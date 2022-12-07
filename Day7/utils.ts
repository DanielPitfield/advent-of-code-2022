import { input } from "./input";

type FileSystem = Directory[];
type Directory = { name: string; files: File[]; nestedDirectories: Directory[] };
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
      // What is the parentDirectory of the currentDirectory?
      const parentDirectory: Directory | undefined = fileSystem.find((directory) =>
        directory.nestedDirectories.includes(currentDirectory)
      );

      // Move out one directory
      if (chosenDirectoryName === ".." && parentDirectory) {
        currentDirectory = parentDirectory;
        continue;
      }

      // Otherwise, go directly to a named directory
      const isDirectoryPresent: boolean = fileSystem.some((directory) => directory.name === chosenDirectoryName);

      if (isDirectoryPresent) {
        const existingDirectory: Directory = fileSystem.find((directory) => directory.name === chosenDirectoryName)!;
        currentDirectory = existingDirectory;
        continue;
      }

      // No directory, make one
      const newDirectory: Directory = { name: chosenDirectoryName, files: [], nestedDirectories: [] };
      fileSystem.push(newDirectory);
      currentDirectory = newDirectory;
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
      const newDirectory: Directory = { name: newDirectoryName, files: [], nestedDirectories: [] };

      const currentDirectoryIndex: number = fileSystem.findIndex(
        (directory) => directory.name === currentDirectory.name
      );
      fileSystem[currentDirectoryIndex].nestedDirectories.push(newDirectory);
      continue;
    }

    // file
    const [size, name] = line.split(" ");
    const newFile: File = { name: name, size: parseInt(size) };

    const currentDirectoryIndex: number = fileSystem.findIndex((directory) => directory.name === currentDirectory.name);
    fileSystem[currentDirectoryIndex].files.push(newFile);
  }

  return fileSystem;
}