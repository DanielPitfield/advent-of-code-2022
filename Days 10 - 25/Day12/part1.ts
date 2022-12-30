import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";

let startPosition: Position = { xPos: 0, yPos: 0 };
let endPosition: Position = { xPos: 0, yPos: 0 };

// What character code is "a"?
const charCodeOffset: number = "a".charCodeAt(0);

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

function getShortestPathSteps(): number | null {
  let queue: [Position, number][] = [[startPosition, 0]];
  const visitedPositions: Position[] = [];

  while (queue.length) {
    const [currentPosition, steps] = queue.shift()!;

    // Already visited the currentPosition
    if (
      visitedPositions
        .map((position) => JSON.stringify(position))
        .some((position) => position === JSON.stringify(currentPosition))
    ) {
      continue;
    }

    // Keep track this position has been visited
    visitedPositions.push(currentPosition);

    // Reached the destination, return how many steps to get there
    if (JSON.stringify(currentPosition) === JSON.stringify(endPosition)) {
      return steps;
    }

    // Get all the neighbours of the currentPosition
    const neighbors: Position[] = getNeighbors(currentPosition);
    /*
    Filter the neighbours which are able to be moved to next
    The value of the neigbour must be either lower, equal or (at most) 1 higher than the currentPosition
    */
    const possibleMoves: Position[] = neighbors.filter(
      (position) => elevationMap[position.xPos][position.yPos] <= elevationMap[currentPosition.xPos][currentPosition.yPos] + 1
    );

    // Add these possible moves to the queue
    queue = queue.concat(possibleMoves.map((position) => [position, steps + 1]));
  }

  return null;
}

console.log(getShortestPathSteps());
