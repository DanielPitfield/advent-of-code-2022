import { input } from "./input";

export function getPacketPosition(markerSize: number): number {
  for (let i = 0; i < input.length - markerSize; i++) {
    const block: string = input.slice(i, i + markerSize);
    const uniqueValues: string[] = Array.from(new Set([...block]));

    if (uniqueValues.length === markerSize) {
      return i + markerSize;
    }
  }

  return 0;
}
