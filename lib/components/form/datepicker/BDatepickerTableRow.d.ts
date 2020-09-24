import './datepicker.sass';
import { IO } from 'fp-ts/lib/IO';
import { DateEvent } from './shared';
import { FunctionN } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode, ExtractPropTypes } from 'vue';
export declare const BDatepickerTableRowPropsDefinition: {
    selectedDates: {
        type: PropType<Date[]>;
        required: true;
    };
    focusedDate: {
        type: PropType<Option<Date>>;
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
    onSelect: {
        type: PropType<FunctionN<[Date], void>>;
        required: true;
    };
    onFocus: {
        type: PropType<FunctionN<[Option<Date>], void>>;
        required: true;
    };
    dateCreator: {
        type: PropType<IO<Date>>;
        default: import("fp-ts/lib/function").Lazy<() => Date>;
    };
};
export declare type BDatePickerTableRowProps = ExtractPropTypes<typeof BDatepickerTableRowPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{
    month: number;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onSelect: FunctionN<[Date], void>;
    weekNumber: number;
    week: Date[];
    minDate: Option<Date>;
    maxDate: Option<Date>;
} & {
    isDisabled?: boolean | undefined;
    events?: DateEvent[] | undefined;
    showWeekNumber?: boolean | undefined;
    unselectableDates?: Date[] | undefined;
    unselectableDaysOfWeek?: number[] | undefined;
    selectableDates?: import("fp-ts/lib/Option").None | import("fp-ts/lib/Option").Some<Date[]> | undefined;
    dateCreator?: IO<Date> | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    month: number;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onSelect: FunctionN<[Date], void>;
    weekNumber: number;
    week: Date[];
    minDate: Option<Date>;
    maxDate: Option<Date>;
} & {
    isDisabled?: boolean | undefined;
    events?: DateEvent[] | undefined;
    showWeekNumber?: boolean | undefined;
    unselectableDates?: Date[] | undefined;
    unselectableDaysOfWeek?: number[] | undefined;
    selectableDates?: import("fp-ts/lib/Option").None | import("fp-ts/lib/Option").Some<Date[]> | undefined;
    dateCreator?: IO<Date> | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    month: number;
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onSelect: FunctionN<[Date], void>;
    showWeekNumber: boolean;
    weekNumber: number;
    week: Date[];
    minDate: Option<Date>;
    maxDate: Option<Date>;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
    dateCreator: IO<Date>;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        selectedDates: {
            type: PropType<Date[]>;
            required: true;
        };
        focusedDate: {
            type: PropType<Option<Date>>;
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
        onSelect: {
            type: PropType<FunctionN<[Date], void>>;
            required: true;
        };
        onFocus: {
            type: PropType<FunctionN<[Option<Date>], void>>;
            required: true;
        };
        dateCreator: {
            type: PropType<IO<Date>>;
            default: import("fp-ts/lib/function").Lazy<() => Date>;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    month: number;
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onSelect: FunctionN<[Date], void>;
    showWeekNumber: boolean;
    weekNumber: number;
    week: Date[];
    minDate: Option<Date>;
    maxDate: Option<Date>;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
    dateCreator: IO<Date>;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    month: number;
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onSelect: FunctionN<[Date], void>;
    showWeekNumber: boolean;
    weekNumber: number;
    week: Date[];
    minDate: Option<Date>;
    maxDate: Option<Date>;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
    dateCreator: IO<Date>;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    month: number;
    isDisabled: boolean;
    onFocus: FunctionN<[Option<Date>], void>;
    events: DateEvent[];
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: import("./shared").EventIndicator;
    onSelect: FunctionN<[Date], void>;
    showWeekNumber: boolean;
    weekNumber: number;
    week: Date[];
    minDate: Option<Date>;
    maxDate: Option<Date>;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
    dateCreator: IO<Date>;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
