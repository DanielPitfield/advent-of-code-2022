import { createFileSystem } from "./utils";

const fileSystem = createFileSystem();
//console.table(fileSystem)

const directories = Array.from(new Set(Array.from(fileSystem.keys()).map((x) => x.split("/").slice(0, -1).join("/"))));
//console.table(directories);

const internalDirectorySizes: Map<string, number> = new Map(
  Array.from(
    new Map(
      directories.map((directoryName) => [
        directoryName,
        Array.from(fileSystem.entries())
          .filter(([key, file]) => key === `${directoryName}/${file.name}`)
          .map(([_, value]) => value.size)
          .reduce((a, b) => a + b, 0),
      ])
    )
  ).sort(([a], [b]) => a.toString().split("/").length - b.toString().split("/").length)
);

//console.table(internalDirectorySizes);

const totalDirectorySizes = new Map<string, number>();

for (const [directoryName, size] of internalDirectorySizes) {
  // All children directories (including nested) of this current directory
  const childrenDirectories = Array.from(internalDirectorySizes.entries()).filter(([x]) => x.startsWith(directoryName));

  // Size of all children directories
  const childrenDirectoriesSize = childrenDirectories.map(([_, size]) => size).reduce((a, b) => a + b, 0);

  totalDirectorySizes.set(directoryName, childrenDirectoriesSize);
}

// console.table(totalDirectorySizes)

const MAX_DIRECTORY_SIZE = 100000;

const smallDirectories = Array.from(totalDirectorySizes.entries()).filter(([name, size]) => size <= MAX_DIRECTORY_SIZE);
//console.table(smallDirectories);

const result = smallDirectories.map(([name, size]) => size).reduce((a, b) => a + b, 0);

console.log(result);
