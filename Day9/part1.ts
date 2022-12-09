import { input } from "./input";

type Position = { xPos: number; yPos: number };

const GRID_SIZE: number = 2500;
const grid: boolean[][] = new Array(GRID_SIZE).fill(false).map((x) => new Array(GRID_SIZE).fill(false));

// Start in middle indexes of array (to avoid traversing to out of bound indexes)
let headPosition: Position = { xPos: GRID_SIZE / 2, yPos: GRID_SIZE / 2 };
let tailPosition: Position = { xPos: GRID_SIZE / 2, yPos: GRID_SIZE / 2 };

const instructions = input.split("\n");

for (const instruction of instructions) {
  const [direction, distance] = instruction.split(" ");

  switch (direction) {
    case "U":
    case "D":
      const yPositionChange = direction === "U" ? 1 : -1;

      for (let i = 0; i < parseInt(distance); i++) {
        headPosition = { xPos: headPosition.xPos, yPos: headPosition.yPos + yPositionChange };

        const areSameRow = tailPosition.yPos === headPosition.yPos;
        const areSameColumn = tailPosition.xPos === headPosition.xPos;
        const twoStepsApart = Math.abs(tailPosition.yPos - headPosition.yPos) === 2;

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
        headPosition = { xPos: headPosition.xPos + xPositionChange, yPos: headPosition.yPos };

        const areSameRow = tailPosition.yPos === headPosition.yPos;
        const areSameColumn = tailPosition.xPos === headPosition.xPos;
        const twoStepsApart = Math.abs(tailPosition.xPos - headPosition.xPos) === 2;

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

// Debug
//grid[GRID_SIZE / 2][GRID_SIZE / 2] = "hello";
//console.table(grid)

const numVisitedTiles = grid.flatMap((x) => x).filter((x) => x).length;
console.log(numVisitedTiles);
