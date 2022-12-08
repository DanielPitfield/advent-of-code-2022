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
