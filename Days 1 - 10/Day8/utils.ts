import { input } from "./input";

const rows: string[] = input.split("\n");
const grid: number[][] = rows.map((row) => row.split("").map((x) => parseInt(x)));

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

function getLeftViewingDistance(xPos: number, yPos: number): number {
  const value = grid[yPos][xPos];

  const entireRow: number[] = grid[yPos];
  let portion: number[] = entireRow.slice(0, xPos);
  portion = portion.reverse();

  // Navigate leftward in the row
  for (let i = 0; i < portion.length; i++) {
    const height = portion[i];

    if (height >= value) {
      // Return distance visible from xPos to the tree
      return i + 1;
    }
  }

  // Else; can see to edge of grid
  return portion.length; // Return number of trees to left
}

function getRightViewingDistance(xPos: number, yPos: number): number {
  const value = grid[yPos][xPos];

  const entireRow: number[] = grid[yPos];
  const portion: number[] = entireRow.slice(xPos + 1);

  // Navigate rightward in the row
  for (let i = 0; i < portion.length; i++) {
    const height = portion[i];

    if (height >= value) {
      // Return distance visible from xPos to the tree
      return i + 1;
    }
  }

  // Else; can see to edge of grid
  return portion.length; // Return number of trees to right
}

function getTopViewingDistance(xPos: number, yPos: number): number {
  const value = grid[yPos][xPos];

  const portion: number[] = [];
  for (let i = yPos - 1; i >= 0; i--) {
    portion.push(grid[i][xPos]);
  }

  // Navigate upward in the row
  for (let i = 0; i < portion.length; i++) {
    const height = portion[i];

    if (height >= value) {
      // Return distance visible from yPos to the tree
      return i + 1;
    }
  }

  // Else; can see to edge of grid
  return portion.length; // Return number of trees to top
}

function getBottomViewingDistance(xPos: number, yPos: number): number {
  const value = grid[yPos][xPos];

  const portion: number[] = [];
  for (let i = yPos + 1; i < grid.length; i++) {
    portion.push(grid[i][xPos]);
  }

  // Navigate downward in the row
  for (let i = 0; i < portion.length; i++) {
    const height = portion[i];

    if (height >= value) {
      // Return distance visible from yPos to the tree
      return i + 1;
    }
  }

  // Else; can see to edge of grid
  return portion.length; // Return number of trees to bottom
}

export function getScenicScore(xPos: number, yPos: number): number {
  return (
    getLeftViewingDistance(xPos, yPos) *
    getRightViewingDistance(xPos, yPos) *
    getTopViewingDistance(xPos, yPos) *
    getBottomViewingDistance(xPos, yPos)
  );
}
