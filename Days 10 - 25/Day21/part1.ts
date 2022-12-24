import {
  evaluateMonkeyJobValues,
  initialMonkeyJobs,
  isAnotherMonkeyValue,
  MonkeyJob,
  replaceMonkeyJobValues,
} from "./utils";

function getFinalRootValue(): number | null {
  let currentMonkeyJobs: MonkeyJob[] = initialMonkeyJobs.slice();
  let finalRootValue: string = "abcd";

  while (isAnotherMonkeyValue(finalRootValue)) {
    const replaced = replaceMonkeyJobValues(currentMonkeyJobs);
    const evaluated = evaluateMonkeyJobValues(replaced);
    currentMonkeyJobs = evaluated;

    const currentRootValue = currentMonkeyJobs.find((monkey) => monkey.name === "root")?.value;

    if (!currentRootValue) {
      return null;
    }

    finalRootValue = currentRootValue;
  }

  return parseInt(finalRootValue);
}

console.log(getFinalRootValue());
