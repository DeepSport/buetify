import { identity } from 'fp-ts/lib/function';
import { isObject, isString } from './helpers';
export function mergeClasses(existingClasses, newClasses) {
    if (Array.isArray(existingClasses)) {
        return [
            ...existingClasses.filter(identity),
            ...(Array.isArray(newClasses) ? newClasses.filter(identity) : [newClasses])
        ];
    }
    else if (isObject(existingClasses) || isString(existingClasses)) {
        return [existingClasses, ...(Array.isArray(newClasses) ? newClasses.filter(identity) : [newClasses])];
    }
    else {
        return newClasses;
    }
}
//# sourceMappingURL=mergeClasses.js.map