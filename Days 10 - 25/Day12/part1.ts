import { Position } from "../../Days 1 - 9/Day9/utils";
import { input } from "./input";

let startPosition: Position;
let endPosition: Position;

// What character code is "a"?
const charCodeOffset: number = "a".charCodeAt(0);

const elevationMap: number[][] = input.split("\n").map((row, yPos) =>
  row.split("").map((value, xPos) => {
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

console.log(elevationMap);