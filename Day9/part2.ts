import { Position, instructions, areTouching, moveKnot } from "./utils";

const SNAKE_LENGTH = 10;
let snake: Position[] = new Array(SNAKE_LENGTH).fill("").map(() => ({ xPos: 0, yPos: 0 }));

const visitedPositions = new Set();

for (const instruction of instructions) {
  const [direction, distance] = instruction.split(" ");

  for (let i = 0; i < parseInt(distance); i++) {
    
    switch (direction) {
      case "U":
        snake[0].yPos++;
        break;
      case "D":
        snake[0].yPos--;
        break;
      case "L":
        snake[0].xPos--;
        break;
      case "R":
        snake[0].xPos++;
        break;
    }

    for (let j = 1; j < snake.length; j++) {
      if (!areTouching(snake[j - 1], snake[j])) {
        snake[j] = moveKnot(snake[j - 1], snake[j]);
      }
    }

    visitedPositions.add(`${snake.at(-1)?.xPos},${snake.at(-1)?.yPos}`);
  }
}

const numVisitedTiles = visitedPositions.size;
console.log(numVisitedTiles);
