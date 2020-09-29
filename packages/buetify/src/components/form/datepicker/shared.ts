import { ColorVariant } from '../../../types/ColorVariants';

export type DateEvent = Date | DetailedDateEvent;

export interface DetailedDateEvent {
  date: Date;
  variant: ColorVariant;
}

export type EventIndicator = 'dots' | 'bars';

export const DEFAULT_DAY_NAMES = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'];

export const DEFAULT_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface DateCell {
  date: Date;
  number: number;
  ariaLabel: string;
  isDisabled: boolean;
  isSelected: boolean;
  events: DetailedDateEvent[];
  hasEvents: boolean;
  classes: object;
}
