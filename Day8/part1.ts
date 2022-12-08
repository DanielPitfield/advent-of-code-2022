import { checkColumnVisibility, checkRowVisibility, grid } from "./utils";

const visibilityGrid: boolean[][] = grid.map((row, yPos) =>
  row.map((_, xPos) => {
    if (checkRowVisibility(xPos, yPos) || checkColumnVisibility(xPos, yPos)) {
      return true;
    }

    return false;
  })
);

const numVisibleTrees = visibilityGrid.flatMap(x => x).filter(x => x).length;
console.log(numVisibleTrees);
