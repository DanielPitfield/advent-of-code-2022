import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";

let startPosition: Position = { xPos: 0, yPos: 0 };
let endPosition: Position = { xPos: 0, yPos: 0 };

// What is the symbol on the provided elevation map data for the lowest elevation?
const LOWEST_ELEVATION_SYMBOL: string = "a";
// What character code is "a"?
const charCodeOffset: number = LOWEST_ELEVATION_SYMBOL.charCodeAt(0);
// What would be the numeric elevation for the lowest elevation?
const LOWEST_ELEVATION_VALUE = LOWEST_ELEVATION_SYMBOL.charCodeAt(0) - charCodeOffset;

const elevationMap: number[][] = input.split("\n").map((row, xPos) =>
  row.split("").map((value, yPos) => {
    // Value is the starting position, make this the lowest possible elevation
    if (value === "S") {
      startPosition = { xPos, yPos };
      value = "a";
    }

    // Value is ending position, make this the highest possible elevation
    if (value === "E") {
      endPosition = { xPos, yPos };
      value = "z";
    }

    // a-z, 0-26
    return value.charCodeAt(0) - charCodeOffset;
  })
);

function getNeighbors(position: Position): Position[] {
  const offsets: Position[] = [
    { xPos: -1, yPos: 0 },
    { xPos: 1, yPos: 0 },
    { xPos: 0, yPos: 1 },
    { xPos: 0, yPos: -1 },
  ];

  const neighbours: Position[] = offsets.map((offset) => {
    return { xPos: position.xPos + offset.xPos, yPos: position.yPos + offset.yPos };
  });

  return neighbours.filter((position) => {
    const hasPositiveCoordinates: boolean = position.xPos >= 0 && position.yPos >= 0;
    const withinMapBounds = position.xPos < elevationMap.length && position.yPos < elevationMap[0].length;

    return hasPositiveCoordinates && withinMapBounds;
  });
}

export function getShortestPathNumSteps(pathConfig: { isPathGoingUp: boolean }): number | null {
  /*
  If the path is going from the lowest elevation to the highest elevation,
  Then start at the original start position (lowest elevation),
  Otherwise, start at the end position (highest elevation)
  */
  const pathStart: Position = pathConfig.isPathGoingUp ? startPosition : endPosition;

  let queue: [Position, number][] = [[pathStart, 0]];
  const visitedPositions: Set<string> = new Set();

  while (queue.length) {
    const [currentPosition, steps] = queue.shift()!;

    // Already visited the currentPosition
    if (visitedPositions.has(JSON.stringify(currentPosition))) {
      continue;
    }

    // Keep track this position has been visited
    visitedPositions.add(JSON.stringify(currentPosition));

    // Path is going up and have reached the highest elevation
    if (pathConfig.isPathGoingUp && JSON.stringify(currentPosition) === JSON.stringify(endPosition)) {
      return steps;
    }

    // Path is going down and have reached a point of the lowest elevation
    if (
      !pathConfig.isPathGoingUp &&
      elevationMap[currentPosition.xPos][currentPosition.yPos] === LOWEST_ELEVATION_VALUE
    ) {
      return steps;
    }

    // Get all the neighbours of the currentPosition
    const neighbors: Position[] = getNeighbors(currentPosition);

    const possibleMoves: Position[] = neighbors.filter((position) => {
      if (pathConfig.isPathGoingUp) {
        return (
          // The value of the neigbour must be either lower, equal or (at most) 1 higher than the currentPosition
          elevationMap[position.xPos][position.yPos] <= elevationMap[currentPosition.xPos][currentPosition.yPos] + 1
        );
      }

      // In reverse
      return elevationMap[position.xPos][position.yPos] >= elevationMap[currentPosition.xPos][currentPosition.yPos] - 1;
    });

    // Add these possible moves to the queue
    queue = queue.concat(possibleMoves.map((position) => [position, steps + 1]));
  }

  return null;
}
