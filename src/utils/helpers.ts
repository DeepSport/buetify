import { snoc, unsafeDeleteAt } from 'fp-ts/lib/Array';
import { Eq } from 'fp-ts/lib/Eq';
import { constant, not } from 'fp-ts/lib/function';
import { none } from 'fp-ts/lib/Option';

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */

export const isMobile = {
  Android: function() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function keys<O>(o: O): Array<keyof O> {
  return Object.keys(o) as (keyof O)[];
}

// eslint-disable-next-line
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date) {
    // If the values are Date, they were convert to timestamp with getTime and compare it
    if (a.getTime() !== b.getTime()) return false;
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }

  const props = Object.keys(a);

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }

  return props.every(p => deepEqual(a[p], b[p]));
}

// eslint-disable-next-line
export function getNestedValue(obj: any, path: (string | number)[], fallback?: any): any {
  const last = path.length - 1;

  if (last < 0) return obj === undefined ? fallback : obj;

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }

  if (obj == null) return fallback;

  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}

// eslint-disable-next-line
export function getObjectValueByPath(obj: any, path: string, fallback?: any): any {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback);
}

// eslint-disable-next-line
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}

// eslint-disable-next-line
export function isObject(obj: any): obj is object {
  return obj !== null && typeof obj === 'object';
}

// eslint-disable-next-line
export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

// eslint-disable-next-line
export function isPrimitive(val: any): val is number | string | boolean {
  return typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean';
}

// eslint-disable-next-line
export function isNil(arg: any): boolean {
  return arg === null || arg === undefined;
}

export const exists = not(isNil);

// eslint-disable-next-line
export function isString(arg: any): arg is string {
  return typeof arg === 'string';
}

// eslint-disable-next-line
export function isNumber(arg: any): arg is number {
  return typeof arg === 'number';
}

// eslint-disable-next-line
export function isHTMLElement(obj: any): obj is HTMLElement {
  return typeof HTMLElement === 'object'
    ? obj instanceof HTMLElement //DOM2
    : obj && typeof isObject(obj) && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

export const constEmptyArray = constant([]);

export const constNone = constant(none);

export const constZero = constant(0);

export const constEmptyString = constant('');

export function removeListItem<A>(E: Eq<A>) {
  return (a: A, as: A[]) => {
    const index = as.findIndex(i => E.equals(a, i));
    return index > -1 ? unsafeDeleteAt(index, as) : as;
  };
}

export function toggleListItem<A>(E: Eq<A>) {
  return (a: A, as: A[]) => {
    const index = as.findIndex(i => E.equals(a, i));
    return index > -1 ? unsafeDeleteAt(index, as) : snoc(as, a);
  };
}

export function isEmptyString(str: string): boolean {
  return str === '';
}

// eslint-disable-next-line
export type Result<T, P> = P extends keyof T ? T[P] : P extends (item: T) => any ? ReturnType<P> : T;
// eslint-disable-next-line
export type Extractor<T> = string | ((item: T) => any);

function prop<T extends object, K extends keyof T>(key: K, obj: T): T[K] {
  return obj[key];
}

// eslint-disable-next-line
export function extractProp<T, P extends (item: T) => any | keyof T>(extractor: Extractor<T>, item: T): Result<T, P> {
  if (isFunction(extractor)) {
    return extractor(item);
  } else if (isObject(item) && isString(extractor) && Object.hasOwnProperty.call(item, extractor)) {
    // eslint-disable-next-line
    return prop(extractor as any, item);
  } else {
    return item as Result<T, P>;
  }
}

const camelizeRE = /-(\w)/g;
export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}
