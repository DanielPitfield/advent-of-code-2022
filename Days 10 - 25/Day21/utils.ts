import { input } from "./input";

type Monkey = {
  name: string;
  value: number;
  left: string;
  right: string;
  operation: "+" | "-" | "*" | "/";
};

// Parse the input into an object array
const monkeys: Monkey[] = input.split("\n").map((monkey) => {
  const [name, value] = monkey.split(": ");
  const [left, operator, right] = value.split(" ");

  return {
    name: name,
    value: parseInt(left),
    left: left,
    right: right,
    operation: operator,
  } as Monkey;
});

export function getMonkeyValue(monkeyName: string): number {
  const monkey: Monkey = monkeys.find((monkey) => monkey.name === monkeyName)!;

  // Already a numeric value
  if (monkey.operation === undefined) {
    return monkey.value;
  }

  // Otherwise need to evaluate both sides (the expression)
  const left = getMonkeyValue(monkey.left);
  const right = getMonkeyValue(monkey.right);

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
