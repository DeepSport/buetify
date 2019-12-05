import './datepicker.sass';
import { DateEvent } from './shared';
import { FunctionN } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode, ExtractPropTypes } from 'vue';
export declare const BDatepickerTableRowPropsDefinition: {
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
    showWeekNumber: {
        type: PropType<boolean>;
        default: false;
    };
    weekNumber: {
        type: PropType<number>;
        required: true;
    };
    week: {
        type: PropType<Date[]>;
        required: true;
    };
    month: {
        type: PropType<number>;
        required: true;
    };
    minDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    maxDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    isDisabled: {
        type: PropType<boolean>;
        default: false;
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
        type: PropType<Option<Date[]>>;
        default: import("fp-ts/lib/function").Lazy<Option<never>>;
    };
    events: {
        type: PropType<DateEvent[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    indicators: {
        type: PropType<import("./shared").EventIndicator>;
        required: true;
    };
};
export declare type BDatePickerTableRowProps = ExtractPropTypes<typeof BDatepickerTableRowPropsDefinition>;
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
    showWeekNumber: {
        type: PropType<boolean>;
        default: false;
    };
    weekNumber: {
        type: PropType<number>;
        required: true;
    };
    week: {
        type: PropType<Date[]>;
        required: true;
    };
    month: {
        type: PropType<number>;
        required: true;
    };
    minDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    maxDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    isDisabled: {
        type: PropType<boolean>;
        default: false;
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
        type: PropType<Option<Date[]>>;
        default: import("fp-ts/lib/function").Lazy<Option<never>>;
    };
    events: {
        type: PropType<DateEvent[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    indicators: {
        type: PropType<import("./shared").EventIndicator>;
        required: true;
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
    weekNumber: number;
    week: Date[];
    month: number;
    minDate: Option<Date>;
    maxDate: Option<Date>;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
} & {
    modelValue?: Date | Date[] | undefined;
}>, {
    isDisabled: boolean;
    events: DateEvent[];
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
}>;
export default _default;
