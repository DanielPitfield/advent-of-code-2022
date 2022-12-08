import { input } from "./input";

type Command = cdCommand | lsCommand;
type cdCommand = { command: "cd"; directory: string };
type lsCommand = { command: "ls"; nestedDirectories: string[]; files: { name: string; size: number }[] };

export function createFileSystem() {
  const commands: string[] = input.split("$").filter((x) => x);
  const commandBlocks: string[][] = commands.map((command) => command.trim().split("\n"));
  const parsedCommandInstructions: Command[] = commandBlocks.map((commandBlock, index) => {
    const [command, directory] = commandBlock[0].split(" ");

    switch (command) {
      case "cd":
        return { command: "cd", directory: directory } as cdCommand;

      case "ls":
        const files = [];
        const nestedDirectories = [];

        // For all lines except the first
        for (const command of commandBlock.slice(1)) {
          if (command.startsWith("dir ")) {
            nestedDirectories.push(command.split(" ").at(-1));
            continue;
          }

          const [size, name] = command.split(" ");
          files.push({ name, size: parseInt(size) });
        }

        return { command: "ls", nestedDirectories, files } as lsCommand;

      default:
        throw new Error(`Unrecognised command. Index: ${index} Command: "${command}"`);
    }
  });

  let currentDirectory: string = "";
  const fileSystem = new Map<string, { name: string; size: number }>();

  for (const instruction of parsedCommandInstructions) {
    switch (instruction.command) {
      case "cd":
        if (instruction.directory === "..") {
          currentDirectory = `/${currentDirectory.split("/").slice(0, -1).join("/")}`;
        } else if (instruction.directory === "/") {
          currentDirectory = "/";
        } else {
          currentDirectory += `/${instruction.directory}`;
        }
        break;

      case "ls":
        for (const file of instruction.files) {
          const key = currentDirectory.endsWith("/")
            ? `${currentDirectory}${file.name}`
            : `${currentDirectory}/${file.name}`;
          fileSystem.set(key, file);
        }

        for (const dir of instruction.nestedDirectories) {
          const key = currentDirectory.endsWith("/") ? `${currentDirectory}${dir}` : `${currentDirectory}/${dir}`;
          fileSystem.set(key, { name: "_", size: 0 });
        }

        break;
    }

    currentDirectory = `/${currentDirectory
      .split("/")
      .filter((x) => x)
      .join("/")}`;
  }

  return fileSystem;
}

export function getInternalDirectorySizes(): Map<string, number> {
  const fileSystem = createFileSystem();
  const directories = Array.from(
    new Set(Array.from(fileSystem.keys()).map((x) => x.split("/").slice(0, -1).join("/")))
  );

  return new Map(
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
}

export function getTotalDirectorySizes(): Map<string, number> {
  const totalDirectorySizes = new Map<string, number>();
  const internalDirectorySizes = getInternalDirectorySizes();

  for (const [directoryName, _] of internalDirectorySizes) {
    // All children directories (including nested) of this current directory
    const childrenDirectories = Array.from(internalDirectorySizes.entries()).filter(([x]) =>
      x.startsWith(directoryName)
    );

    // Size of all children directories
    const childrenDirectoriesSize = childrenDirectories.map(([_, size]) => size).reduce((a, b) => a + b, 0);

    totalDirectorySizes.set(directoryName, childrenDirectoriesSize);
  }

  return totalDirectorySizes;
}
