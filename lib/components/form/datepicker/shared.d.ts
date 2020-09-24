import { ColorVariant } from '../../../types/ColorVariants';
export declare type DateEvent = Date | DetailedDateEvent;
export interface DetailedDateEvent {
    date: Date;
    variant: ColorVariant;
}
export declare type EventIndicator = 'dots' | 'bars';
export declare const DEFAULT_DAY_NAMES: string[];
export declare const DEFAULT_MONTH_NAMES: string[];
export declare type MonthNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export interface DateSelectionData {
    month: MonthNumber;
    year: number;
}
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
