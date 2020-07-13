import { elem } from 'fp-ts/lib/Array';
import { fromCompare, geq, leq } from 'fp-ts/lib/Ord';
export function isDate(value) {
    // from date-fns
    return (value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]'));
}
export function getStartOfDay(date) {
    const clone = new Date(date.getTime());
    clone.setHours(0, 0, 0, 0);
    return clone;
}
export function getEndOfDay(date) {
    const clone = new Date(date.getTime());
    clone.setHours(23, 59, 59, 999);
    return clone;
}
export function isSameDay(x, y) {
    return getStartOfDay(x).getTime() === getStartOfDay(y).getTime();
}
export function isBeforeDay(date, isBefore) {
    return date.getTime() < getStartOfDay(isBefore).getTime();
}
export function isAfterDay(date, isAfter) {
    return date.getTime() > getEndOfDay(isAfter).getTime();
}
function compareSerialDate(x, y) {
    return isBeforeDay(x, y) ? -1 : isAfterDay(x, y) ? 1 : 0;
}
export function isSameMonth(x, y) {
    return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth();
}
export const serialDateOrd = fromCompare(compareSerialDate);
export const isOnOrAfterDate = geq(serialDateOrd);
export const isOnOrBeforeDate = leq(serialDateOrd);
export const elemSerialDate = elem(serialDateOrd);
export function getStartOfMonth(date) {
    const clone = new Date(date.getTime());
    clone.setDate(1);
    clone.setHours(0, 0, 0, 0);
    return clone;
}
export function getEndOfMonth(date) {
    const clone = new Date(date.getTime());
    const month = clone.getMonth();
    clone.setFullYear(clone.getFullYear(), month + 1, 0);
    clone.setHours(23, 59, 59, 999);
    return clone;
}
export function isWithinWeek(date, secondDate, weekStartsOn = 0) {
    return (isOnOrAfterDate(date, getStartOfWeek(secondDate, weekStartsOn)) &&
        isOnOrBeforeDate(date, getEndOfWeek(secondDate, weekStartsOn)));
}
export function getStartOfWeek(date, weekStartsOn = 0) {
    const clone = new Date(date.getTime());
    const day = clone.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    clone.setDate(clone.getDate() - diff);
    clone.setHours(0, 0, 0, 0);
    return clone;
}
export function getEndOfWeek(date, weekStartsOn = 0) {
    const clone = new Date(date.getTime());
    const day = clone.getDay();
    const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
    clone.setDate(clone.getDate() + diff);
    clone.setHours(23, 59, 59, 999);
    return clone;
}
export function getDaysInMonth(date) {
    const clone = new Date(date.getTime());
    const year = clone.getFullYear();
    const monthIndex = clone.getMonth();
    const lastDayOfMonth = new Date(0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
}
export function addDays(date, days) {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + days);
    return clone;
}
export function getDatesInWeek(date, weekStartsOn = 0) {
    const dates = [];
    let day = getStartOfWeek(date, weekStartsOn);
    const end = getEndOfWeek(date, weekStartsOn);
    while (isOnOrBeforeDate(day, end)) {
        dates.push(day);
        day = addDays(day, 1);
    }
    return dates;
}
export function addMonths(date, months) {
    const clone = new Date(date.getTime());
    const newMonth = clone.getMonth() + months;
    const dateWithDesiredMonth = new Date(0);
    dateWithDesiredMonth.setFullYear(clone.getFullYear(), newMonth, 1);
    dateWithDesiredMonth.setHours(0, 0, 0, 0);
    const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
    clone.setMonth(newMonth, Math.min(daysInMonth, clone.getDate()));
    return clone;
}
//# sourceMappingURL=utils.js.map