import { input } from "./input";

export const instructions = input.split("\n");

export type Position = { xPos: number; yPos: number; prevX?: number; prevY?: number };

// Are the head and the tail touching (less than 1 move apart in either vertically or horizontally)
export function areTouching(headPosition: Position, tailPosition: Position): boolean {
  const xDiff = Math.abs(headPosition.xPos - tailPosition.xPos);
  const yDiff = Math.abs(headPosition.yPos - tailPosition.yPos);
  return xDiff <= 1 && yDiff <= 1;
}
