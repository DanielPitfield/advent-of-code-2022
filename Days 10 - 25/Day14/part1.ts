import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";
import { getAllPointsBetween } from "./utils";

const lines = input.split("\n");

for (const line of lines.slice(0, 1)) {
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

  const pointsBetween: Position[][] = [];

  // What are the points between each pair of line points?
  for (let i = 0; i < linePoints.length - 1; i++) {
    pointsBetween.push(getAllPointsBetween(linePoints[i], linePoints[i + 1]));
  }

  // The entire line is the original line points and any points inbetween each of the pairs of line points
  const entireLine: Position[] = linePoints.concat(pointsBetween.flat());

  console.log(entireLine)
}
