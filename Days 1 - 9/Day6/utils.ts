import { input } from "./input";

export function getPacketPosition(markerSize: number): number {
  for (let i = 0; i < input.length - markerSize; i++) {
    // Take a markerSize sized portion of the input
    const block: string = input.slice(i, i + markerSize);
    // How many unique values are within this portion?
    const numUniqueValues: number = new Set([...block]).size;

    // Is every value within the block unique?
    if (numUniqueValues === markerSize) {
      // The position of the final letter
      return i + markerSize;
    }
  }

  return 0;
}
