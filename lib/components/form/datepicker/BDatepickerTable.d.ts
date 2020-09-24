import './datepicker.sass';
import { IO } from 'fp-ts/lib/IO';
import { DateEvent, DateSelectionData } from './shared';
import { WeekdayNumber } from './utils';
import { FunctionN } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode, ExtractPropTypes } from 'vue';
export declare const BDatepickerTablePropsDefinition: {
    value: {
        type: PropType<Date | Date[]>;
        required: boolean;
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
    dateSelectionData: {
        type: PropType<DateSelectionData>;
        default: () => {
            month: number;
            year: number;
        };
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    dateCreator: {
        type: PropType<IO<Date>>;
        default: import("fp-ts/lib/function").Lazy<() => Date>;
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
    focusedDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    onInput: {
        type: PropType<FunctionN<[Date], void>>;
        required: true;
    };
    onFocus: {
        type: PropType<FunctionN<[Option<Date>], void>>;
        required: true;
    };
    showWeekNumber: {
        type: PropType<boolean>;
        default: false;
    };
};
export declare type BDatepickerTableProps = ExtractPropTypes<typeof BDatepickerTablePropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{
    onFocus: FunctionN<[Option<Date>], void>;
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onInput: FunctionN<[Date], void>;
} & {
    value?: Date | Date[] | undefined;
    isDisabled?: boolean | undefined;
    events?: DateEvent[] | undefined;
    showWeekNumber?: boolean | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    unselectableDates?: Date[] | undefined;
    unselectableDaysOfWeek?: number[] | undefined;
    selectableDates?: Date[] | undefined;
    dateCreator?: IO<Date> | undefined;
    dayNames?: string[] | undefined;
    monthNames?: string[] | undefined;
    firstDayOfWeek?: 0 | 2 | 1 | 6 | 5 | 4 | 3 | undefined;
    dateSelectionData?: {
        month: number;
        year: number;
    } | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    onFocus: FunctionN<[Option<Date>], void>;
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onInput: FunctionN<[Date], void>;
} & {
    value?: Date | Date[] | undefined;
    isDisabled?: boolean | undefined;
    events?: DateEvent[] | undefined;
    showWeekNumber?: boolean | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    unselectableDates?: Date[] | undefined;
    unselectableDaysOfWeek?: number[] | undefined;
    selectableDates?: Date[] | undefined;
    dateCreator?: IO<Date> | undefined;
    dayNames?: string[] | undefined;
    monthNames?: string[] | undefined;
    firstDayOfWeek?: 0 | 2 | 1 | 6 | 5 | 4 | 3 | undefined;
    dateSelectionData?: {
        month: number;
        year: number;
    } | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
} & {
    value?: Date | Date[] | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        value: {
            type: PropType<Date | Date[]>;
            required: boolean;
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
        dateSelectionData: {
            type: PropType<DateSelectionData>;
            default: () => {
                month: number;
                year: number;
            };
        };
        isDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        dateCreator: {
            type: PropType<IO<Date>>;
            default: import("fp-ts/lib/function").Lazy<() => Date>;
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
        focusedDate: {
            type: PropType<Option<Date>>;
            required: true;
        };
        onInput: {
            type: PropType<FunctionN<[Date], void>>;
            required: true;
        };
        onFocus: {
            type: PropType<FunctionN<[Option<Date>], void>>;
            required: true;
        };
        showWeekNumber: {
            type: PropType<boolean>;
            default: false;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
} & {
    value?: Date | Date[] | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
} & {
    value?: Date | Date[] | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
} & {
    value?: Date | Date[] | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
