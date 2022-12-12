import { input } from "./input";

type OperatorSymbol = "/" | "-" | "+" | "*";
type Monkey = {
  monkeyNumber: number;
  items: number[];
  numItemsInspected: number;
  operator: OperatorSymbol;
  operand: string;
  testOperand: number;
  newTrueMonkeyNumber: number;
  newFalseMonkeyNumber: number;
};

const initialMonkeyNotes = input.split("\n\n");

const operatorMappings: {
  symbol: OperatorSymbol;
  function: (num1: number, num2: number) => number;
}[] = [
  {
    symbol: "/",
    function: (num1: number, num2: number): number => num1 / num2,
  },
  {
    symbol: "-",
    function: (num1: number, num2: number): number => num1 - num2,
  },
  {
    symbol: "+",
    function: (num1: number, num2: number): number => num1 + num2,
  },
  {
    symbol: "*",
    function: (num1: number, num2: number): number => num1 * num2,
  },
];

// Store what items each monkey has (throughout)
const monkeyInventories: Monkey[] = initialMonkeyNotes.map((note) => {
  const lines = note.split("\n");

  const monkeyNumber: number = parseInt(lines[0].split(" ")[1]);
  const items: number[] = lines[1]
    .split(":")[1]
    .split(",")
    .flatMap((x) => parseInt(x.trim()));

  const [_, operator, operand]: string[] = lines[2].split("=")[1].trim().split(" ");
  const testOperand: number = parseInt(lines[3].split(":")[1].split(" ").at(-1) ?? "0");

  const newTrueMonkeyNumber: number = parseInt(lines[4].split(" ").at(-1) ?? "0");
  const newFalseMonkeyNumber: number = parseInt(lines[5].split(" ").at(-1) ?? "0");

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

function processInspectionRound(isWorried: boolean) {
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

      let newWorryLevel: number =
        operatorMappings
          .find((x) => x.symbol === monkey.operator)
          // Sometimes, the operation can refer to the worry level using "old" (e.g new = old * old)
          ?.function(item, monkey.operand === "old" ? item : parseInt(monkey.operand)) ?? item;

      // Monkeys are not so worried and get bored, divide worry levels by 3
      if (!isWorried) {
        newWorryLevel = Math.floor(newWorryLevel / 3);
      }

      // All tests are determining whether the worry level is divisible by the testOperand
      const testOutcome: boolean = newWorryLevel % monkey.testOperand === 0;

      // Throw item to new monkey (the monkey thrown to depends on the testOutcome)
      const index = monkeyInventories.findIndex(
        (x) => x.monkeyNumber === (testOutcome ? monkey.newTrueMonkeyNumber : monkey.newFalseMonkeyNumber)
      );
      monkeyInventories[index].items.push(newWorryLevel);
    }

    /*
    Items are always thrown to other monkeys, regardless of test outcome
    So once every item has been processed, empty the items for the current monkey (they have all been moved elsewhere)
    */
    monkey.items = [];
  }
}

export function completeInspection(numRounds: number, isWorried: boolean) {
  for (let i = 0; i < numRounds; i++) {
    processInspectionRound(isWorried);
  }

  return monkeyInventories;
}

export function getBusinessLevel(monkeyInventories: Monkey[]) {
  const monkeysNumItemsProcessed: number[] = monkeyInventories
    .map((monkey) => monkey.numItemsInspected)
    .sort((a, b) => b - a);

  return monkeysNumItemsProcessed[0] * monkeysNumItemsProcessed[1];
}
