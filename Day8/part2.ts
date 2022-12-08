import { getScenicScore, grid } from "./utils";

const scenicScores: { xPos: number, yPos: number, score: number }[][] = grid.map((row, yPos) =>
  row.map((_, xPos) => {
    return {
        xPos,
        yPos,
        score: getScenicScore(xPos, yPos)
    }
  })
);
//console.table(scenicScores);

const allScores: { xPos: number; yPos: number; score: number }[] = scenicScores.flatMap((x) => x);
console.table(allScores);

const highestScenicScore: number = Math.max(...allScores.map(x => x.score));
//console.log(highestScenicScore);
