// Is the monkey job value simply a value and not an expression?
export function isJobValuePrimitive(value: string) {
  return parseInt(value).toString() === value;
}
