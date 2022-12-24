import { input } from "./input";

export type MonkeyJob = { name: string; value: string };

export const initialMonkeyJobs: MonkeyJob[] = input.split("\n").map((monkey) => {
  const [name, value] = monkey.split(": ");
  return { name, value };
});

export function hasAnotherMonkeyValue(value: string): boolean {
  const alphabetString: string = "abcdefghijklmnopqrstuvwxyz";
  const lowercaseArray: string[] = alphabetString.split("");

  return value.split("").some((letter) => lowercaseArray.includes(letter));
}

// Map over the monkeyJobs replacing any string parts of the job value with known values
export function replaceMonkeyJobValues(monkeyJobs: MonkeyJob[]): MonkeyJob[] {
  return monkeyJobs.map((monkeyJob) => {
    if (!hasAnotherMonkeyValue(monkeyJob.value)) {
      return monkeyJob;
    }

    // The operands and operators of the monkey job's value
    const valueParts: string[] = monkeyJob.value.split(" ");

    const replacedParts: string[] = valueParts.map((part) => {
      // A pointer to another monkey's value
      if (hasAnotherMonkeyValue(part)) {
        // Replace with the value of the monkey that has the name of the part
        return monkeyJobs.find((monkeyJob) => monkeyJob.name === part)?.value ?? part;
      }

      return part;
    });

    // Put expression back together again
    return { ...monkeyJob, value: replacedParts.join(" ") };
  });
}

export function evaluateMonkeyJobValues(monkeyJobs: MonkeyJob[]): MonkeyJob[] {
  return monkeyJobs.map((monkeyJob) => {
    if (!hasAnotherMonkeyValue(monkeyJob.value)) {
      return monkeyJob;
    }

    const valueParts: string[] = monkeyJob.value.split(" ");

    // There are no parts which point to the values of other monkeys
    if (valueParts.every((part) => !hasAnotherMonkeyValue(part))) {
      // Evaluate the expression
      const newValue = parseInt(eval(monkeyJob.value)).toString();
      return { ...monkeyJob, value: newValue };
    }

    return monkeyJob;
  });
}
