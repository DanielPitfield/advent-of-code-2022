import { getTraversedGrid } from "./utils";

const numVisitedTiles = getTraversedGrid()
  .flat()
  .filter((x) => x).length;
console.log(numVisitedTiles);
