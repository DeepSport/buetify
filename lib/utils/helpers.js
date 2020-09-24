import { snoc, unsafeDeleteAt } from 'fp-ts/lib/Array';
import { constant, not } from 'fp-ts/lib/function';
import { none } from 'fp-ts/lib/Option';
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */

export const isMobile = {
  Android: function () {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function keys(o) {
  return Object.keys(o);
}
export function deepEqual(a, b) {
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
export function getObjectValueByPath(obj, path, fallback) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

  path = path.replace(/^\./, ''); // strip a leading dot

  return getNestedValue(obj, path.split('.'), fallback);
}
export function isBoolean(val) {
  return typeof val === 'boolean';
}
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
export function isFunction(obj) {
  return typeof obj === 'function';
}
export function getNestedValue(obj, path, fallback) {
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
export function isPrimitive(val) {
  return typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean';
}
export function isNil(arg) {
  return arg === null || arg === undefined;
}
export const exists = not(isNil);
export function isString(arg) {
  return typeof arg === 'string';
}
export function isNumber(arg) {
  return typeof arg === 'number';
}
export function isHTMLElement(obj) {
  return typeof HTMLElement === 'object' ? obj instanceof HTMLElement //DOM2
  : obj && typeof isObject(obj) && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}
export const alwaysEmptyArray = constant([]);
export const alwaysNone = constant(none);
export const alwaysZero = constant(0);
export const alwaysEmptyString = constant('');
export function removeListItem(E) {
  return (a, as) => {
    const index = as.findIndex(i => E.equals(a, i));
    return index > -1 ? unsafeDeleteAt(index, as) : as;
  };
}
export function toggleListItem(E) {
  return (a, as) => {
    const index = as.findIndex(i => E.equals(a, i));
    return index > -1 ? unsafeDeleteAt(index, as) : snoc(as, a);
  };
}
export function isEmptyString(str) {
  return str.length === 0;
}

function prop(key, obj) {
  return obj[key];
}

export function extractProp(extractor, item) {
  if (isFunction(extractor)) {
    return extractor(item);
  } else if (isObject(item) && isString(extractor) && item.hasOwnProperty(extractor)) {
    return prop(extractor, item);
  } else {
    return item;
  }
}
const camelizeRE = /-(\w)/g;
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
}
//# sourceMappingURL=helpers.js.map