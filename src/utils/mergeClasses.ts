import { identity } from 'fp-ts/lib/function';
import { isObject, isString } from './helpers';

export type Classes = string | { [K: string]: boolean } | null | undefined | Classes[];

export function mergeClasses(existingClasses?: Classes, newClasses?: Classes): Classes {
  if (Array.isArray(existingClasses)) {
    return [
      ...existingClasses.filter(identity),
      ...(Array.isArray(newClasses) ? newClasses.filter(identity) : [newClasses])
    ];
  } else if (isObject(existingClasses) || isString(existingClasses)) {
    return [existingClasses, ...(Array.isArray(newClasses) ? newClasses.filter(identity) : [newClasses])];
  } else {
    return newClasses;
  }
}
