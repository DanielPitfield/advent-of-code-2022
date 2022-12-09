import { getScenicScore, getVisibilityGrid } from "./utils";

const scenicScores: number[] = getVisibilityGrid().map((row, yPos) => {
  return row.map((_, xPos) => {
    return getScenicScore(xPos, yPos);
  });
}).flat();

const highestScore = Math.max(...scenicScores);
console.log(highestScore);
