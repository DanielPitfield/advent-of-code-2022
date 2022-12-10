import { input } from "./input";

export const instructions = input.split("\n");

export type Position = { xPos: number; yPos: number; prevX?: number; prevY?: number };

// Are the head and the tail touching (less than 1 move apart in either vertically or horizontally)
export function areTouching(headPosition: Position, tailPosition: Position): boolean {
  const xDiff = Math.abs(headPosition.xPos - tailPosition.xPos);
  const yDiff = Math.abs(headPosition.yPos - tailPosition.yPos);
  return xDiff <= 1 && yDiff <= 1;
}

export const moveKnot = (firstPosition: Position, secondPosition: Position) => {
  let newPos = { ...secondPosition };
  let xDiff = secondPosition.xPos - firstPosition.xPos;
  let yDiff = secondPosition.yPos - firstPosition.yPos;

  if (xDiff > 0) newPos.xPos--;
  else if (xDiff < 0) newPos.xPos++;
  if (yDiff > 0) newPos.yPos--;
  else if (yDiff < 0) newPos.yPos++;

  return newPos;
};
