import { input } from "./input";

const rows: string[] = input.split("\n");
export const grid: number[][] = rows.map((row) => row.split("").map((x) => parseInt(x)));

export function checkRowVisibility(xPos: number, yPos: number): boolean {
  const value = grid[yPos][xPos];

  const entireRow: number[] = grid[yPos];
  const portionBefore: number[] = entireRow.slice(0, xPos);
  const portionAfter: number[] = entireRow.slice(xPos + 1);

  if (portionBefore.every((x) => x < value)) {
    return true;
  }

  if (portionAfter.every((x) => x < value)) {
    return true;
  }

  return false;
}

export function checkColumnVisibility(xPos: number, yPos: number): boolean {
  const value = grid[yPos][xPos];

  const portionBefore: number[] = [];
  // For every row before the row which contains the value
  for (let i = yPos - 1; i >= 0; i--) {
    // Push the value at the same x position as the value from each row
    portionBefore.push(grid[i][xPos]);
  }

  const portionAfter: number[] = [];
  for (let i = yPos + 1; i < grid.length; i++) {
    portionAfter.push(grid[i][xPos]);
  }

  if (portionBefore.every((x) => x < value)) {
    return true;
  }

  if (portionAfter.every((x) => x < value)) {
    return true;
  }

  return false;
}

export function getVisibilityGrid(): boolean[][] {
  return grid.map((row, yPos) =>
    row.map((_, xPos) => {
      if (checkRowVisibility(xPos, yPos) || checkColumnVisibility(xPos, yPos)) {
        return true;
      }

      return false;
    })
  );
}

const visibiltyGrid = getVisibilityGrid();

function getLeftViewingDistance(xPos: number, yPos: number): number {
  const entireRow: boolean[] = visibiltyGrid[yPos];

  // The portion from left of the value to the left edge of the grid
  const portion: boolean[] = entireRow.slice(0, xPos).reverse();

  // First tree which is blocking
  const blockingIndex: number = portion.findIndex((x) => x);

  if (blockingIndex >= 0) {
    return blockingIndex + 1;
  }

  // Else, can see edge of grid
  return portion.length;
}

function getRightViewingDistance(xPos: number, yPos: number): number {
  const entireRow: boolean[] = visibiltyGrid[yPos];

  // The portion from right of the value to the right edge of the grid
  const portion: boolean[] = entireRow.slice(xPos + 1);

  const blockingIndex: number = portion.findIndex((x) => x);

  if (blockingIndex >= 0) {
    return blockingIndex + 1;
  }

  return portion.length;
}

function getTopViewingDistance(xPos: number, yPos: number): number {
  const portion: boolean[] = [];
  for (let i = yPos - 1; i >= 0; i--) {
    portion.push(visibiltyGrid[i][xPos]);
  }

  const blockingIndex: number = portion.findIndex((x) => x);

  if (blockingIndex >= 0) {
    return blockingIndex + 1;
  }

  return portion.length;
}

function getBottomViewingDistance(xPos: number, yPos: number): number {
  const portion: boolean[] = [];
  for (let i = yPos + 1; i < visibiltyGrid.length; i++) {
    portion.push(visibiltyGrid[i][xPos]);
  }

  const blockingIndex: number = portion.findIndex((x) => x);

  if (blockingIndex >= 0) {
    return blockingIndex + 1;
  }

  return portion.length;
}

export function getScenicScore(xPos: number, yPos: number): number {
  return (
    getLeftViewingDistance(xPos, yPos) *
    getRightViewingDistance(xPos, yPos) *
    getTopViewingDistance(xPos, yPos) *
    getBottomViewingDistance(xPos, yPos)
  );
}
