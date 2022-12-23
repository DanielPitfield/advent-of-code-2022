import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";

export function getAllLinePoints(point1: Position, point2: Position): Position[] {
  const points: Position[] = [];

  // Horizontal line
  if (point1.yPos === point2.yPos) {
    const startingXPos = Math.min(point1.xPos, point2.xPos);
    const endingXPos = Math.max(point1.xPos, point2.xPos);

    for (let xPos = startingXPos; xPos <= endingXPos; xPos++) {
      points.push({ xPos, yPos: point1.yPos });
    }
  }

  // Vertical line
  if (point1.xPos === point2.xPos) {
    const startingYPos = Math.min(point1.yPos, point2.yPos);
    const endingYPos = Math.max(point1.yPos, point2.yPos);

    for (let yPos = startingYPos; yPos <= endingYPos; yPos++) {
      points.push({ xPos: point1.xPos, yPos });
    }
  }

  return points;
}

// At what positions is there a rock wall (denoted by the symbol # in the example)?
export function getRockWalls(): Position[] {
  const lines = input.split("\n");

  const rockWalls: Position[][] = [];

  for (const line of lines) {
    const linePoints: Position[] = line
      // Each point in the line is delimited by ->
      .split("->")
      // Remove whitespace
      .map((point) => point.trim())
      // Split the point into the xPos and yPos
      .map((point) => point.split(","))
      // Convert to Position
      .map((point) => {
        return { xPos: parseInt(point[0]), yPos: parseInt(point[1]) };
      });

    for (let i = 0; i < linePoints.length - 1; i++) {
      const entireLine = getAllLinePoints(linePoints[i], linePoints[i + 1]);
      rockWalls.push(entireLine);
    }
  }

  return rockWalls.flat();
}
