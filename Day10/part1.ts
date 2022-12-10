import { instructions } from "./utils";

let registerValue: number = 1;
let cycleCounter: number = 0;

const signalStrengths: number[] = [];

function incrementCycleCounter() {
  cycleCounter++;

  // Check whether it is the 20th, 60th, 100th... cycle
  if (cycleCounter % 40 === 20) {
    const signalStrength: number = cycleCounter * registerValue;
    signalStrengths.push(signalStrength);
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

const sumSignalStrengths: number = signalStrengths.reduce((a, b) => a + b, 0);
console.log(sumSignalStrengths);
