import { Position } from "../../Days 1 - 9/Day9/utils";

export function getAllPointsBetween(point1: Position, point2: Position): Position[] {
  const points: Position[] = [];

  // Horizontal line
  if (point1.yPos === point2.yPos) {
    const startingXPos = Math.min(point1.xPos, point2.xPos);
    const endingXPos = Math.max(point1.xPos, point2.xPos);

    for (let i = startingXPos + 1; i < endingXPos; i++) {
      points.push({ xPos: i, yPos: point1.yPos });
    }
  }

  // Vertical line
  if (point1.xPos === point2.xPos) {
    const startingYPos = Math.min(point1.yPos, point2.yPos);
    const endingYPos = Math.max(point1.yPos, point2.yPos);

    for (let i = startingYPos + 1; i < endingYPos; i++) {
      points.push({ xPos: point1.xPos, yPos: i });
    }
  }

  return points;
}
