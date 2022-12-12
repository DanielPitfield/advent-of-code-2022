import { initialMonkeyNotes, operatorMappings } from "./utils";

// Store what items each monkey has (throughout)
const monkeyInventories: { monkeyNumber: number; items: number[]; numItemsInspected: number }[] =
  initialMonkeyNotes.map((note) => {
    const lines = note.split("\n");
    const monkeyNumber: number = parseInt(lines[0].split(" ")[1]);
    const items: number[] = lines[1]
      .split(":")[1]
      .split(",")
      .flatMap((x) => parseInt(x.trim()));

    return { monkeyNumber, items, numItemsInspected: 0 };
  });

const NUM_ROUNDS = 20;

for (let i = 0; i < NUM_ROUNDS; i++) {
  // Process the monkey note/instruction block for every monkey (and apply the result as mutating monkeyInventories)
  for (const note of initialMonkeyNotes) {
    const lines = note.split("\n");

    const monkeyNumber: number = parseInt(lines[0].split(" ")[1]);
    const currentMonkey = monkeyInventories.find((monkey) => monkey.monkeyNumber === monkeyNumber);

    if (currentMonkey) {
      const currentItems: number[] = currentMonkey.items ?? [];

      // No point inspecting, processing and moving items, if there are none
      if (!currentItems) {
        continue;
      }

      const [_, operator, operand]: string[] = lines[2].split("=")[1].split(" ");
      const testOperand: number = parseInt(lines[3].split(":")[1].split(" ").at(-1) ?? "0");

      const newTrueMonkeyNumber: number = parseInt(lines[4].split("").at(-1) ?? "0");
      const newFalseMonkeyNumber: number = parseInt(lines[5].split("").at(-1) ?? "0");

      for (const item of currentItems) {
        // Increment how many items the current monkey has now inspected
        currentMonkey.numItemsInspected++;

        const newWorryLevel: number = Math.floor(
          (operatorMappings
            .find((x) => x.symbol === operator)
            // Sometimes, the operation can refer to the worry level using "old" (e.g new = old * old)
            ?.function(item, operand === "old" ? item : parseInt(operand)) ?? item) /
            // Monkey gets bored, divide by 3
            3
        );

        // All tests are determining whether the worry level is divisible by the testOperand
        const testOutcome: boolean = newWorryLevel % testOperand === 0;

        // TODO: Remove from current monkey before throwing


        // Throw item to new monkey (the monkey thrown to depends on the testOutcome)
        const index = monkeyInventories.findIndex(
          (monkey) => monkey.monkeyNumber === (testOutcome ? newTrueMonkeyNumber : newFalseMonkeyNumber)
        );
        monkeyInventories[index].items.push(newWorryLevel);
      }
    }
  }
}

const monkeysNumItemsProcessed: number[] = monkeyInventories
  .map((monkey) => monkey.numItemsInspected)
  .sort((a, b) => b - a);

  console.log(monkeysNumItemsProcessed);

const monkeyBusinessLevel = monkeysNumItemsProcessed[0] * monkeysNumItemsProcessed[1];
console.log(monkeyBusinessLevel);
