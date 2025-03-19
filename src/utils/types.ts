// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T) => args;
export const tupleNum = <T extends number[]>(...args: T) => args;

export function truthy<T>(
  value: T,
): value is T extends null | undefined | false | '' | 0 ? never : T {
  return !!value;
}
