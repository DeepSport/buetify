"use strict";
exports.__esModule = true;
exports.camelize = exports.extractProp = exports.isEmptyString = exports.isFragment = exports.toggleListItem = exports.removeListItem = exports.constEmptyString = exports.constZero = exports.constNone = exports.constEmptyArray = exports.isHTMLElement = exports.isNumber = exports.isString = exports.exists = exports.isNil = exports.isPrimitive = exports.isFunction = exports.isObject = exports.isBoolean = exports.getObjectValueByPath = exports.getNestedValue = exports.deepEqual = exports.keys = exports.capitalizeFirstLetter = exports.isMobile = void 0;
var vue_1 = require("vue");
var Array_1 = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
exports.isMobile = {
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
        return exports.isMobile.Android() || exports.isMobile.BlackBerry() || exports.isMobile.iOS() || exports.isMobile.Opera() || exports.isMobile.Windows();
    }
};
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function keys(o) {
    return Object.keys(o);
}
exports.keys = keys;
// eslint-disable-next-line
function deepEqual(a, b) {
    if (a === b)
        return true;
    if (a instanceof Date && b instanceof Date) {
        // If the values are Date, they were convert to timestamp with getTime and compare it
        if (a.getTime() !== b.getTime())
            return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
        // If the values aren't objects, they were already checked for equality
        return false;
    }
    var props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false;
    }
    return props.every(function (p) { return deepEqual(a[p], b[p]); });
}
exports.deepEqual = deepEqual;
// eslint-disable-next-line
function getNestedValue(obj, path, fallback) {
    var last = path.length - 1;
    if (last < 0)
        return obj === undefined ? fallback : obj;
    for (var i = 0; i < last; i++) {
        if (obj == null) {
            return fallback;
        }
        obj = obj[path[i]];
    }
    if (obj == null)
        return fallback;
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
exports.getNestedValue = getNestedValue;
// eslint-disable-next-line
function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (obj == null || !path || typeof path !== 'string')
        return fallback;
    if (obj[path] !== undefined)
        return obj[path];
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
}
exports.getObjectValueByPath = getObjectValueByPath;
// eslint-disable-next-line
function isBoolean(val) {
    return typeof val === 'boolean';
}
exports.isBoolean = isBoolean;
// eslint-disable-next-line
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
// eslint-disable-next-line
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
// eslint-disable-next-line
function isPrimitive(val) {
    return typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean';
}
exports.isPrimitive = isPrimitive;
// eslint-disable-next-line
function isNil(arg) {
    return arg === null || arg === undefined;
}
exports.isNil = isNil;
exports.exists = function_1.not(isNil);
// eslint-disable-next-line
function isString(arg) {
    return typeof arg === 'string';
}
exports.isString = isString;
// eslint-disable-next-line
function isNumber(arg) {
    return typeof arg === 'number';
}
exports.isNumber = isNumber;
// eslint-disable-next-line
function isHTMLElement(obj) {
    return typeof HTMLElement === 'object'
        ? obj instanceof HTMLElement //DOM2
        : obj && typeof isObject(obj) && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}
exports.isHTMLElement = isHTMLElement;
exports.constEmptyArray = function_1.constant([]);
exports.constNone = function_1.constant(Option_1.none);
exports.constZero = function_1.constant(0);
exports.constEmptyString = function_1.constant('');
function removeListItem(E) {
    return function (a, as) {
        var index = as.findIndex(function (i) { return E.equals(a, i); });
        return index > -1 ? Array_1.unsafeDeleteAt(index, as) : as;
    };
}
exports.removeListItem = removeListItem;
function toggleListItem(E) {
    return function (a, as) {
        var index = as.findIndex(function (i) { return E.equals(a, i); });
        return index > -1 ? Array_1.unsafeDeleteAt(index, as) : Array_1.snoc(as, a);
    };
}
exports.toggleListItem = toggleListItem;
function isFragment(node) {
    return node.type === vue_1.Fragment;
    ;
}
exports.isFragment = isFragment;
function isEmptyString(str) {
    return str === '';
}
exports.isEmptyString = isEmptyString;
function prop(key, obj) {
    return obj[key];
}
// eslint-disable-next-line
function extractProp(extractor, item) {
    if (isFunction(extractor)) {
        return extractor(item);
    }
    else if (isObject(item) && isString(extractor) && Object.hasOwnProperty.call(item, extractor)) {
        // eslint-disable-next-line
        return prop(extractor, item);
    }
    else {
        return item;
    }
}
exports.extractProp = extractProp;
var camelizeRE = /-(\w)/g;
function camelize(str) {
    return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ''); });
}
exports.camelize = camelize;
