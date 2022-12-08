import { createFileSystem } from "./utils";

const fileSystem = createFileSystem();
const directories = Array.from(new Set(Array.from(fileSystem.keys()).map((x) => x.split("/").slice(0, -1).join("/"))));

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

const totalDirectorySizes = new Map<string, number>();

for (const [directoryName, _] of internalDirectorySizes) {
  // All children directories (including nested) of this current directory
  const childrenDirectories = Array.from(internalDirectorySizes.entries()).filter(([x]) => x.startsWith(directoryName));

  // Size of all children directories
  const childrenDirectoriesSize = childrenDirectories.map(([_, size]) => size).reduce((a, b) => a + b, 0);

  totalDirectorySizes.set(directoryName, childrenDirectoriesSize);
}


const MAX_DIRECTORY_SIZE = 100000;
// The directories below this size
const smallDirectories = Array.from(totalDirectorySizes.entries()).filter(([_, size]) => size <= MAX_DIRECTORY_SIZE);
// The sum of the sizes of all these directories
const result = smallDirectories.map(([_, size]) => size).reduce((a, b) => a + b, 0);
console.log(result);
