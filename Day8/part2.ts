import { getScenicScore, grid } from "./utils";

const scenicScores: number[][] = grid.map((row, yPos) =>
  row.map((_, xPos) => {
    return getScenicScore(xPos, yPos);
  })
);

const highestScore = Math.max(...scenicScores.flatMap((x) => x));
//console.log(highestScore);
