import { Position, instructions, areTouching, moveKnot } from "./utils";

let snake: Position[] = new Array(10).fill(0).map(() => ({ xPos: 0, yPos: 0 }));

const visitedPositions = new Set();

for (const instruction of instructions) {
  const [direction, distance] = instruction.split(" ");

  for (let i = 0; i < parseInt(distance); i++) {
    if (direction === "U") snake[0].yPos++;
    else if (direction === "D") snake[0].yPos--;
    else if (direction === "L") snake[0].xPos--;
    else if (direction === "R") snake[0].xPos++;

    for (let j = 1; j < snake.length; j++) {
      if (!areTouching(snake[j - 1], snake[j])) {
        snake[j] = moveKnot(snake[j - 1], snake[j]);
      }
    }

    visitedPositions.add(`${snake[9].xPos},${snake[9].yPos}`);
  }
}

const numVisitedTiles = visitedPositions.size;
console.log(numVisitedTiles);
