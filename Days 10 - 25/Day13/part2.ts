import { input } from "./input";
import { isPairOrdered } from "./utils";

// Divider packets
const dividerPackets = ["[[2]]", "[[6]]"].map((x) => JSON.parse(x));

const lines = input
  .split("\n")
  .filter((line) => line)
  .map((x) => JSON.parse(x))
  // Add the divider packets in (so they can be sorted)
  .concat(dividerPackets);

const sortedLines = lines.sort((a, b) => {
  if (isPairOrdered(a, b)) {
    return -1;
  }

  if (isPairOrdered(a, b) === undefined) {
    return 0;
  }

  return 1;
});

const decoderKey: number =
  (sortedLines.findIndex((x) => JSON.stringify(x) === JSON.stringify(dividerPackets[0])) + 1) *
  (sortedLines.findIndex((x) => JSON.stringify(x) === JSON.stringify(dividerPackets[1])) + 1);

console.log(decoderKey);
