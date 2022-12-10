import { instructions } from "./utils";

let registerValue: number = 1;
let cycleCounter: number = 0;

// Keep track of whether a pixel is lit (true) or dark (false)
const pixelStates: boolean[] = [];
const SCREEN_WIDTH = 40;

function incrementCycleCounter() {
  // If the current position is over the sprite (which is 3 wide)
  const isInSprite =
    cycleCounter === registerValue - 1 || cycleCounter === registerValue || cycleCounter === registerValue + 1;

  // Keep track of the state of the pixel, whether it is lit (true) or dark (false)
  pixelStates[cycleCounter] = isInSprite;

  // Increment the cycle (AFTER determining the pixel state)
  cycleCounter++;

  // If this is the end of the row
  if (cycleCounter % SCREEN_WIDTH === 0) {
    // Print the completed row
    console.log(
      pixelStates
        .slice(cycleCounter - SCREEN_WIDTH, cycleCounter)
        .map((isLit) => (isLit ? "#" : " "))
        .join("")
    );

    // Increment the sprite position to the next row
    registerValue += SCREEN_WIDTH;
  }
}

for (const instruction of instructions) {
  const [command, operand] = instruction.split(" ");

  // 1 cycle, does nothing
  if (command === "noop") {
    incrementCycleCounter();
    continue;
  }

  // After 2 cycles, adds operand to register
  if (command === "addx") {
    incrementCycleCounter();
    incrementCycleCounter();
    registerValue += parseInt(operand);
  }
}
