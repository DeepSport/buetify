"use strict";
exports.__esModule = true;
exports.addMonths = exports.getDatesInWeek = exports.addDays = exports.getDaysInMonth = exports.isWithinWeek = exports.getEndOfWeek = exports.getStartOfWeek = exports.getEndOfMonth = exports.getStartOfMonth = exports.elemSerialDate = exports.isOnOrBeforeDate = exports.isOnOrAfterDate = exports.ordSerialDate = exports.eqSerialDate = exports.isSameMonth = exports.isAfterDay = exports.isBeforeDay = exports.isSameDay = exports.getEndOfDay = exports.getStartOfDay = exports.isDate = void 0;
var Array_1 = require("fp-ts/lib/Array");
var Eq_1 = require("fp-ts/lib/Eq");
var Ord_1 = require("fp-ts/lib/Ord");
function isDate(value) {
    // from date-fns
    return (value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]'));
}
exports.isDate = isDate;
function getStartOfDay(date) {
    var clone = new Date(date.getTime());
    clone.setHours(0, 0, 0, 0);
    return clone;
}
exports.getStartOfDay = getStartOfDay;
function getEndOfDay(date) {
    var clone = new Date(date.getTime());
    clone.setHours(23, 59, 59, 999);
    return clone;
}
exports.getEndOfDay = getEndOfDay;
function isSameDay(x, y) {
    return getStartOfDay(x).getTime() === getStartOfDay(y).getTime();
}
exports.isSameDay = isSameDay;
function isBeforeDay(date, isBefore) {
    return date.getTime() < getStartOfDay(isBefore).getTime();
}
exports.isBeforeDay = isBeforeDay;
function isAfterDay(date, isAfter) {
    return date.getTime() > getEndOfDay(isAfter).getTime();
}
exports.isAfterDay = isAfterDay;
function compareSerialDate(x, y) {
    return isBeforeDay(x, y) ? -1 : isAfterDay(x, y) ? 1 : 0;
}
function isSameMonth(x, y) {
    return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth();
}
exports.isSameMonth = isSameMonth;
exports.eqSerialDate = Eq_1.fromEquals(isSameDay);
exports.ordSerialDate = Ord_1.fromCompare(compareSerialDate);
exports.isOnOrAfterDate = Ord_1.geq(exports.ordSerialDate);
exports.isOnOrBeforeDate = Ord_1.leq(exports.ordSerialDate);
exports.elemSerialDate = Array_1.elem(exports.ordSerialDate);
function getStartOfMonth(date) {
    var clone = new Date(date.getTime());
    clone.setDate(1);
    clone.setHours(0, 0, 0, 0);
    return clone;
}
exports.getStartOfMonth = getStartOfMonth;
function getEndOfMonth(date) {
    var clone = new Date(date.getTime());
    var month = clone.getMonth();
    clone.setFullYear(clone.getFullYear(), month + 1, 0);
    clone.setHours(23, 59, 59, 999);
    return clone;
}
exports.getEndOfMonth = getEndOfMonth;
function getStartOfWeek(date, weekStartsOn) {
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    var clone = new Date(date.getTime());
    var day = clone.getDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    clone.setDate(clone.getDate() - diff);
    clone.setHours(0, 0, 0, 0);
    return clone;
}
exports.getStartOfWeek = getStartOfWeek;
function getEndOfWeek(date, weekStartsOn) {
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    var clone = new Date(date.getTime());
    var day = clone.getDay();
    var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
    clone.setDate(clone.getDate() + diff);
    clone.setHours(23, 59, 59, 999);
    return clone;
}
exports.getEndOfWeek = getEndOfWeek;
function isWithinWeek(date, secondDate, weekStartsOn) {
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    return (exports.isOnOrAfterDate(date, getStartOfWeek(secondDate, weekStartsOn)) &&
        exports.isOnOrBeforeDate(date, getEndOfWeek(secondDate, weekStartsOn)));
}
exports.isWithinWeek = isWithinWeek;
function getDaysInMonth(date) {
    var clone = new Date(date.getTime());
    var year = clone.getFullYear();
    var monthIndex = clone.getMonth();
    var lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
}
exports.getDaysInMonth = getDaysInMonth;
function addDays(date, days) {
    var clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + days);
    return clone;
}
exports.addDays = addDays;
function getDatesInWeek(date, weekStartsOn) {
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    var dates = [];
    var day = getStartOfWeek(date, weekStartsOn);
    var end = getEndOfWeek(date, weekStartsOn);
    while (exports.isOnOrBeforeDate(day, end)) {
        dates.push(day);
        day = addDays(day, 1);
    }
    return dates;
}
exports.getDatesInWeek = getDatesInWeek;
function addMonths(date, months) {
    var clone = new Date(date.getTime());
    var newMonth = clone.getMonth() + months;
    var dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(clone.getFullYear(), newMonth, 1);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
    clone.setMonth(newMonth, Math.min(daysInMonth, clone.getDate()));
    return clone;
}
exports.addMonths = addMonths;
