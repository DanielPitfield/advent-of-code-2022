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
