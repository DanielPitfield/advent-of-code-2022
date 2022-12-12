import { initialMonkeyNotes, operatorMappings, OperatorSymbol } from "./utils";

// Store what items each monkey has (throughout)
const monkeyInventories: {
  monkeyNumber: number;
  items: number[];
  numItemsInspected: number;
  operator: OperatorSymbol;
  operand: string;
  testOperand: number;
  newTrueMonkeyNumber: number;
  newFalseMonkeyNumber: number;
}[] = initialMonkeyNotes.map((note) => {
  const lines = note.split("\n");

  const monkeyNumber: number = parseInt(lines[0].split(" ")[1]);
  const items: number[] = lines[1]
    .split(":")[1]
    .split(",")
    .flatMap((x) => parseInt(x.trim()));

  const [_, operator, operand]: string[] = lines[2].split("=")[1].trim().split(" ");
  const testOperand: number = parseInt(lines[3].split(":")[1].split(" ").at(-1) ?? "0");

  const newTrueMonkeyNumber: number = parseInt(lines[4].split("").at(-1) ?? "0");
  const newFalseMonkeyNumber: number = parseInt(lines[5].split("").at(-1) ?? "0");

  return {
    monkeyNumber,
    items,
    numItemsInspected: 0,
    operator: operator as OperatorSymbol,
    operand,
    testOperand,
    newTrueMonkeyNumber,
    newFalseMonkeyNumber,
  };
});

const NUM_ROUNDS = 20;

for (let i = 0; i < NUM_ROUNDS; i++) {
  // Process the monkey note/instruction block for every monkey (and apply the result as mutating monkeyInventories)
  for (const monkey of monkeyInventories) {
    // No point inspecting, processing and moving items, if there are none
    if (!monkey.items) {
      continue;
    }

    for (let j = 0; j < monkey.items.length; j++) {
      const item = monkey.items[j];

      // Increment how many items the current monkey has now inspected
      monkey.numItemsInspected++;

      const newWorryLevel: number = Math.floor(
        (operatorMappings
          .find((x) => x.symbol === monkey.operator)
          // Sometimes, the operation can refer to the worry level using "old" (e.g new = old * old)
          ?.function(item, monkey.operand === "old" ? item : parseInt(monkey.operand)) ?? item) /
          // Monkey gets bored, divide by 3
          3
      );

      // All tests are determining whether the worry level is divisible by the testOperand
      const testOutcome: boolean = newWorryLevel % monkey.testOperand === 0;

      // Remove from current monkey before throwing
      monkey.items.splice(j, 1);

      // Throw item to new monkey (the monkey thrown to depends on the testOutcome)
      const index = monkeyInventories.findIndex(
        (x) => x.monkeyNumber === (testOutcome ? monkey.newTrueMonkeyNumber : monkey.newFalseMonkeyNumber)
      );
      monkeyInventories[index].items.push(newWorryLevel);
    }
  }
}

const monkeysNumItemsProcessed: number[] = monkeyInventories
  .map((monkey) => monkey.numItemsInspected)
  .sort((a, b) => b - a);

console.log(monkeysNumItemsProcessed);

const monkeyBusinessLevel = monkeysNumItemsProcessed[0] * monkeysNumItemsProcessed[1];
console.log(monkeyBusinessLevel);
