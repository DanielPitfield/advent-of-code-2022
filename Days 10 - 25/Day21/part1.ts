import { operatorMappings } from "../Day11/utils";
import { input } from "./input";
import { isJobValuePrimitive } from "./utils";

type MonkeyJob = { name: string; value: string };

const monkeyJobs: MonkeyJob[] = input.split("\n").map((monkey) => {
  const [name, value] = monkey.split(":");
  return { name, value };
});

const resolvedMonkeyJobs: MonkeyJob[] = monkeyJobs.map((monkeyJob) => {
  // The value of the job is already just an integer
  if (isJobValuePrimitive(monkeyJob.value)) {
    return monkeyJob;
  }

  // Otherwise, the value is still an expression
  let [_, firstValue, operatorSymbol, secondValue] = monkeyJob.value.split(/[.\*+-/_]/);

  // Both the operands are primitive and the expression can be resolved
  if (isJobValuePrimitive(firstValue) && isJobValuePrimitive(secondValue)) {
    const newValue: string =
      operatorMappings
        .find((x) => x.symbol === operatorSymbol)
        ?.function(parseInt(firstValue), parseInt(secondValue))
        .toString() ?? "";

    return { ...monkeyJob, value: newValue };
  }

  // TODO: Values aren't primitive, try and look for their value

});

console.log(resolvedMonkeyJobs);
