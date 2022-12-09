import { getVisibilityGrid } from "./utils";

const numVisibleTrees = getVisibilityGrid()
  .flatMap((x) => x)
  .filter((x) => x).length;
  
console.log(numVisibleTrees);
