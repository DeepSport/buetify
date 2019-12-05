import './datepicker.sass';
import { DateEvent, MonthNumber } from './shared';
import { WeekdayNumber } from './utils';
import { FunctionN } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode, ExtractPropTypes } from 'vue';
export declare const BDatepickerTablePropsDefinition: {
    modelValue: {
        type: PropType<Date | Date[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[Date | Date[]], void>>;
        required: true;
    };
    focusedDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    'onUpdate:focusedDate': {
        type: PropType<FunctionN<[Option<Date>], any>>;
        required: true;
    };
    month: {
        type: PropType<MonthNumber>;
        required: true;
    };
    year: {
        type: NumberConstructor;
        required: true;
    };
    dayNames: {
        type: PropType<string[]>;
        default: import("fp-ts/lib/function").Lazy<string[]>;
    };
    monthNames: {
        type: PropType<string[]>;
        default: import("fp-ts/lib/function").Lazy<string[]>;
    };
    firstDayOfWeek: {
        type: PropType<WeekdayNumber>;
        default: 0;
    };
    events: {
        type: PropType<DateEvent[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    indicators: {
        type: PropType<import("./shared").EventIndicator>;
        required: true;
    };
    minDate: {
        type: PropType<Date>;
        required: boolean;
    };
    maxDate: {
        type: PropType<Date>;
        required: boolean;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    unselectableDates: {
        type: PropType<Date[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    unselectableDaysOfWeek: {
        type: PropType<number[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    selectableDates: {
        type: PropType<Date[]>;
    };
    showWeekNumber: {
        type: PropType<boolean>;
        default: false;
    };
};
export declare type BDatepickerTableProps = ExtractPropTypes<typeof BDatepickerTablePropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<Date | Date[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[Date | Date[]], void>>;
        required: true;
    };
    focusedDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    'onUpdate:focusedDate': {
        type: PropType<FunctionN<[Option<Date>], any>>;
        required: true;
    };
    month: {
        type: PropType<MonthNumber>;
        required: true;
    };
    year: {
        type: NumberConstructor;
        required: true;
    };
    dayNames: {
        type: PropType<string[]>;
        default: import("fp-ts/lib/function").Lazy<string[]>;
    };
    monthNames: {
        type: PropType<string[]>;
        default: import("fp-ts/lib/function").Lazy<string[]>;
    };
    firstDayOfWeek: {
        type: PropType<WeekdayNumber>;
        default: 0;
    };
    events: {
        type: PropType<DateEvent[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    indicators: {
        type: PropType<import("./shared").EventIndicator>;
        required: true;
    };
    minDate: {
        type: PropType<Date>;
        required: boolean;
    };
    maxDate: {
        type: PropType<Date>;
        required: boolean;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    unselectableDates: {
        type: PropType<Date[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    unselectableDaysOfWeek: {
        type: PropType<number[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    selectableDates: {
        type: PropType<Date[]>;
    };
    showWeekNumber: {
        type: PropType<boolean>;
        default: false;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isDisabled: boolean;
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    events: DateEvent[];
    focusedDate: Option<Date>;
    "onUpdate:focusedDate": FunctionN<[Option<Date>], any>;
    indicators: import("./shared").EventIndicator;
    showWeekNumber: boolean;
    month: MonthNumber;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    year: number;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
} & {
    modelValue?: Date | Date[] | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, {
    isDisabled: boolean;
    events: DateEvent[];
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
}>;
export default _default;
