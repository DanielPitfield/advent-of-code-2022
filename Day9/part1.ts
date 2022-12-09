import { Position, instructions, areTouching } from "./utils";

let headPosition: Position = { xPos: 0, yPos: 0, prevX: 0, prevY: 0 };
let tailPosition: Position = { xPos: 0, yPos: 0 };

const visitedPositions = new Set();

for (const instruction of instructions) {
  const [direction, distance] = instruction.split(" ");

  for (let i = 0; i < parseInt(distance); i++) {
    headPosition.prevX = headPosition.xPos;
    headPosition.prevY = headPosition.yPos;

    switch (direction) {
      case "U":
        headPosition.yPos++;
        break;
      case "D":
        headPosition.yPos--;
        break;
      case "L":
        headPosition.xPos--;
        break;
      case "R":
        headPosition.xPos++;
        break;
    }

    if (!areTouching(headPosition, tailPosition)) {
      tailPosition.xPos = headPosition.prevX;
      tailPosition.yPos = headPosition.prevY;
    }

    visitedPositions.add(`${tailPosition.xPos},${tailPosition.yPos}`);
  }
}

const numVisitedTiles = visitedPositions.size;
console.log(numVisitedTiles);
