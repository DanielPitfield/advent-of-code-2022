import {
  evaluateMonkeyJobValues,
  initialMonkeyJobs,
  hasAnotherMonkeyValue,
  MonkeyJob,
  replaceMonkeyJobValues,
} from "./utils";

function getFinalRootValue(): number | null {
  let currentMonkeyJobs: MonkeyJob[] = initialMonkeyJobs.slice();
  let finalRootValue: string = "abcd";

  while (hasAnotherMonkeyValue(finalRootValue)) {
    const replaced = replaceMonkeyJobValues(currentMonkeyJobs);
    const evaluated = evaluateMonkeyJobValues(replaced);
    currentMonkeyJobs = evaluated;

    const currentRootValue = currentMonkeyJobs.find((monkey) => monkey.name === "root")?.value;
    console.log(currentRootValue)

    if (!currentRootValue) {
      return null;
    }

    finalRootValue = currentRootValue;
  }

  return parseInt(finalRootValue);
}

console.log(getFinalRootValue());
