import { elem } from "fp-ts/lib/Array";
import { fromCompare, geq, leq, Ord } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";

export function isDate(value: any): value is Date {
  // from date-fns
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

export function getStartOfDay(date: Date): Date {
  const clone = new Date(date.getTime());
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export function getEndOfDay(date: Date): Date {
  const clone = new Date(date.getTime());
  clone.setHours(23, 59, 59, 999);
  return clone;
}

export function isSameDay(x: Date, y: Date): boolean {
  return getStartOfDay(x).getTime() === getStartOfDay(y).getTime();
}

export function isBeforeDay(date: Date, isBefore: Date): boolean {
  return date.getTime() < getStartOfDay(isBefore).getTime();
}

export function isAfterDay(date: Date, isAfter: Date): Boolean {
  return date.getTime() > getEndOfDay(isAfter).getTime();
}

function compareSerialDate(x: Date, y: Date): Ordering {
  return isBeforeDay(x, y) ? -1 : isAfterDay(x, y) ? 1 : 0;
}

export function isSameMonth(x: Date, y: Date): boolean {
  return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth();
}

export const SerialDateOrd: Ord<Date> = fromCompare(compareSerialDate);

export const isOnOrAfterDate = geq(SerialDateOrd);

export const isOnOrBeforeDate = leq(SerialDateOrd);

export const elemSerialDate = elem(SerialDateOrd);

export type WeekdayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function getStartOfMonth(date: Date): Date {
  const clone = new Date(date.getTime());
  clone.setDate(1);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export function getEndOfMonth(date: Date): Date {
  const clone = new Date(date.getTime());
  const month = clone.getMonth();
  clone.setFullYear(clone.getFullYear(), month + 1, 0);
  clone.setHours(23, 59, 59, 999);
  return clone;
}

export function isWithinWeek(
  date: Date,
  secondDate: Date,
  weekStartsOn: WeekdayNumber = 0
): boolean {
  return (
    isOnOrAfterDate(date, getStartOfWeek(secondDate, weekStartsOn)) &&
    isOnOrBeforeDate(date, getEndOfWeek(secondDate, weekStartsOn))
  );
}

export function getStartOfWeek(
  date: Date,
  weekStartsOn: WeekdayNumber = 0
): Date {
  const clone = new Date(date.getTime());
  const day = clone.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  clone.setDate(clone.getDate() - diff);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export function getEndOfWeek(
  date: Date,
  weekStartsOn: WeekdayNumber = 0
): Date {
  const clone = new Date(date.getTime());
  const day = clone.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  clone.setDate(clone.getDate() + diff);
  clone.setHours(23, 59, 59, 999);
  return clone;
}

export function getDaysInMonth(date: Date): number {
  const clone = new Date(date.getTime());
  const year = clone.getFullYear();
  const monthIndex = clone.getMonth();
  const lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

export function addDays(date: Date, days: number): Date {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + days);
  return clone;
}

export function getDatesInWeek(
  date: Date,
  weekStartsOn: WeekdayNumber = 0
): Date[] {
  const dates = [];
  let day = getStartOfWeek(date, weekStartsOn);
  const end = getEndOfWeek(date, weekStartsOn);
  while (isOnOrBeforeDate(day, end)) {
    dates.push(day);
    day = addDays(day, 1);
  }
  return dates;
}

export function addMonths(date: Date, months: number): Date {
  const clone = new Date(date.getTime());
  const newMonth = clone.getMonth() + months;
  const dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(clone.getFullYear(), newMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  clone.setMonth(newMonth, Math.min(daysInMonth, clone.getDate()));
  return clone;
}
