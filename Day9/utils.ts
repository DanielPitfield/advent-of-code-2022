import { input } from "./input";

type Position = { xPos: number; yPos: number; prevX?: number; prevY?: number };

let headPosition: Position = { xPos: 0, yPos: 0, prevX: 0, prevY: 0 };
let tailPosition: Position = { xPos: 0, yPos: 0 };

function isTouching(): boolean {
  const xDiff = Math.abs(headPosition.xPos - tailPosition.xPos);
  const yDiff = Math.abs(headPosition.yPos - tailPosition.yPos);
  return xDiff <= 1 && yDiff <= 1;
}

export function getVisitedPositions() {
  const visitedPositions = new Set();

  const instructions = input.split("\n");

  for (const instruction of instructions) {
    const [direction, distance] = instruction.split(" ");

    for (let i = 0; i < parseInt(distance); i++) {
      headPosition.prevX = headPosition.xPos;
      headPosition.prevY = headPosition.yPos;

      if (direction === "U") headPosition.yPos++;
      else if (direction === "D") headPosition.yPos--;
      else if (direction === "L") headPosition.xPos--;
      else if (direction === "R") headPosition.xPos++;

      if (!isTouching()) {
        tailPosition.xPos = headPosition.prevX;
        tailPosition.yPos = headPosition.prevY;
      }

      visitedPositions.add(`${tailPosition.xPos},${tailPosition.yPos}`);
    }
  }

  return visitedPositions;
}
