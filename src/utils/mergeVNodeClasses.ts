import { identity } from "fp-ts/lib/function";
import { exists, isObject, isString } from "./helpers";

export const mergeVNodeClasses = (
  existingClasses: any,
  newClasses: any
): any => {
  if (Array.isArray(existingClasses)) {
    return [
      ...existingClasses.filter(identity),
      ...(Array.isArray(newClasses)
        ? newClasses.filter(identity)
        : [newClasses])
    ];
  } else if (isObject(existingClasses) || isString(existingClasses)) {
    return [
      existingClasses,
      ...(Array.isArray(newClasses)
        ? newClasses.filter(identity)
        : [newClasses])
    ];
  } else {
    return newClasses;
  }
};
