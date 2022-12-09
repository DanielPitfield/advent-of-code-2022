import { input } from "./input";

// Debug: print the grid
const DEBUG_PRINT_GRID_EACH_STEP = false;

type Position = { xPos: number; yPos: number };

const GRID_SIZE: number = 2000;
const grid: boolean[][] = new Array(GRID_SIZE).fill(false).map((x) => new Array(GRID_SIZE).fill(false));

// Start in middle indexes of array (to avoid traversing to out of bound indexes)
let headPosition: Position = { xPos: GRID_SIZE / 2, yPos: GRID_SIZE / 2 };
let tailPosition: Position = { xPos: GRID_SIZE / 2, yPos: GRID_SIZE / 2 };

// Register the starting position as visited
grid[tailPosition.yPos][tailPosition.xPos] = true;

export function getTraversedGrid(): boolean[][] {
  const instructions = input.split("\n");

  for (const instruction of instructions) {
    const [direction, distance] = instruction.split(" ");

    switch (direction) {
      case "U":
      case "D":
        const yPositionChange = direction === "D" ? 1 : -1;

        for (let i = 0; i < parseInt(distance); i++) {
          printGrid(`${direction} 1`);
          headPosition = { xPos: headPosition.xPos, yPos: headPosition.yPos + yPositionChange };

          const areSameRow = tailPosition.yPos === headPosition.yPos;
          const areSameColumn = tailPosition.xPos === headPosition.xPos;
          const twoStepsApart = Math.abs(tailPosition.yPos - headPosition.yPos) === 2;

          // Determine if the Tail is diagnonally touching the Head
          const isDiagonallyTouching = (() => {
            const possibleDiagnonalHeadPositions = [
              { xPos: tailPosition.xPos - 1, yPos: tailPosition.yPos - 1 }, // Top-left,
              { xPos: tailPosition.xPos + 1, yPos: tailPosition.yPos - 1 }, // Top-right,
              { xPos: tailPosition.xPos - 1, yPos: tailPosition.yPos + 1 }, // Bottom-left,
              { xPos: tailPosition.xPos + 1, yPos: tailPosition.yPos + 1 }, // Bottom-right,
            ];

            return possibleDiagnonalHeadPositions.some(
              ({ xPos, yPos }) => headPosition.xPos === xPos && headPosition.yPos === yPos
            );
          })();

          // If diagnollay touching
          if (isDiagonallyTouching) {
            // Do not move the tail
            continue;
          }

          if (areSameColumn && twoStepsApart) {
            tailPosition = { xPos: tailPosition.xPos, yPos: tailPosition.yPos + yPositionChange };
            grid[tailPosition.yPos][tailPosition.xPos] = true;
            continue;
          }

          if (!areSameColumn && !areSameRow) {
            // Catching up to head (subtract/opposite of yPositionChange)
            tailPosition = { xPos: headPosition.xPos, yPos: headPosition.yPos - yPositionChange };
            grid[tailPosition.yPos][tailPosition.xPos] = true;
            continue;
          }
        }

        break;

      case "L":
      case "R":
        const xPositionChange = direction === "R" ? 1 : -1;

        for (let i = 0; i < parseInt(distance); i++) {
          printGrid(`${direction} 1`);
          headPosition = { xPos: headPosition.xPos + xPositionChange, yPos: headPosition.yPos };

          const areSameRow = tailPosition.yPos === headPosition.yPos;
          const areSameColumn = tailPosition.xPos === headPosition.xPos;
          const twoStepsApart = Math.abs(tailPosition.xPos - headPosition.xPos) === 2;

          // Determine if the Tail is diagnonally touching the Head
          const isDiagonallyTouching = (() => {
            const possibleDiagnonalHeadPositions = [
              { xPos: tailPosition.xPos - 1, yPos: tailPosition.yPos - 1 }, // Top-left,
              { xPos: tailPosition.xPos + 1, yPos: tailPosition.yPos - 1 }, // Top-right,
              { xPos: tailPosition.xPos - 1, yPos: tailPosition.yPos + 1 }, // Bottom-left,
              { xPos: tailPosition.xPos + 1, yPos: tailPosition.yPos + 1 }, // Bottom-right,
            ];

            return possibleDiagnonalHeadPositions.some(
              ({ xPos, yPos }) => headPosition.xPos === xPos && headPosition.yPos === yPos
            );
          })();

          // If diagnollay touching
          if (isDiagonallyTouching) {
            // Do not move the tail
            continue;
          }

          if (areSameRow && twoStepsApart) {
            tailPosition = { xPos: tailPosition.xPos + xPositionChange, yPos: tailPosition.yPos };
            grid[tailPosition.yPos][tailPosition.xPos] = true;
          }

          if (!areSameColumn && !areSameRow) {
            // Catching up to head (subtract/opposite of yPositionChange)
            tailPosition = { xPos: headPosition.xPos - xPositionChange, yPos: headPosition.yPos };
            grid[tailPosition.yPos][tailPosition.xPos] = true;
          }
        }

        break;
    }
  }

  return grid;
}

function printGrid(instruction: string) {
  if (!DEBUG_PRINT_GRID_EACH_STEP) {
    return;
  }

  if (GRID_SIZE > 20) {
    throw new Error("GRID_SIZE is too large to print; use a smaller GRID_SIZE and smaller set of instructions");
  }

  const visibleGrid = grid.map((row, y) => {
    return row.map((visited, x) => {
      if (tailPosition.xPos === x && tailPosition.yPos === y) {
        return "T";
      }

      if (headPosition.xPos === x && headPosition.yPos === y) {
        return "H";
      }

      if (visited) {
        return "#";
      }

      return "-";
    });
  });
  console.table(visibleGrid);
  console.log(`\n${instruction}`);
}
