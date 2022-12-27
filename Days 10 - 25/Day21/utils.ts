import { input } from "./input";

type Monkey = {
  name: string;
  value: number;
  left: string;
  right: string;
  operation: "+" | "-" | "*" | "/";
};

type MonkeyMap = {
  [name: string]: Monkey;
};

// Parse the input into an object array
const initialMonkeys: Monkey[] = input.split("\n").map((monkey) => {
  const [name, value] = monkey.split(": ").map((x) => x.trim());
  const [left, operator, right] = value.split(" ");

  return {
    name: name,
    value: Number(left),
    left: left,
    right: right,
    operation: operator,
  } as Monkey;
});

// Convert the object array to a map
export const monkeys: MonkeyMap = initialMonkeys.reduce((monkeyMap: MonkeyMap, currMonkey: Monkey) => {
  return {
    ...monkeyMap,
    [currMonkey.name]: currMonkey,
  };
}, {});

export function getMonkeyValue(monkey: Monkey): number {
  // Already a numeric value
  if (monkey.operation === undefined) {
    return monkey.value;
  }

  // Otherwise need to evaluate the expression
  const left = getMonkeyValue(monkeys[monkey.left]);
  const right = getMonkeyValue(monkeys[monkey.right]);

  switch (monkey.operation) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
  }
}
