import { isObject } from "./helpers";

export function mergeVNodeAttrs(
  existingAttrs: object | undefined,
  newAttrs: object
): object {
  return isObject(existingAttrs) ? { ...existingAttrs, ...newAttrs } : newAttrs;
}
