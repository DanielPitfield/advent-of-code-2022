import { input } from "./input";

type OperatorSymbol = "/" | "-" | "+" | "*";

export const initialMonkeyNotes = input.split("\n\n");

export const operatorMappings: {
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
