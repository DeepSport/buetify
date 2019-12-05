import '../../pagination/pagination.sass';
import '../../dropdown/dropdown.sass';
import './datepicker.sass';
import { DateEvent, EventIndicator, MonthNumber } from './shared';
import { WeekdayNumber } from './utils';
import { FunctionN } from 'fp-ts/lib/function';
import { PropType, VNode, Component, ExtractPropTypes } from 'vue';
export declare type DatepickerPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';
export interface DatepickerIcons {
    next: Component;
    previous: Component;
    calendar: Component;
}
export declare function getDatepickerIcons(icons: Partial<DatepickerIcons>): DatepickerIcons;
declare const BDatepickerPropsDefinition: {
    modelValue: {
        type: PropType<Date | Date[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[Date | Date[]], void>>;
        required: true;
    };
    year: {
        type: NumberConstructor;
        default: number;
    };
    'onUpdate:year': {
        type: PropType<FunctionN<[number], void>>;
        required: boolean;
    };
    month: {
        type: PropType<MonthNumber>;
        default: MonthNumber;
    };
    'onUpdate:month': {
        type: PropType<FunctionN<[MonthNumber], void>>;
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
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: PropType<string>;
    };
    useMobileNative: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<import("../../dropdown/BDropdown").DropdownPosition>;
    };
    indicators: {
        type: PropType<EventIndicator>;
        default: "bars";
    };
    yearsRange: {
        type: PropType<[number, number]>;
        default: import("fp-ts/lib/function").Lazy<readonly [-5, 3]>;
    };
    closeOnSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    isReadonly: {
        type: PropType<boolean>;
        default: boolean;
    };
    useNativeValidation: {
        type: PropType<boolean>;
        default: boolean;
    };
    icons: {
        type: PropType<DatepickerIcons>;
        default: import("fp-ts/lib/function").Lazy<DatepickerIcons>;
    };
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
    disableIfReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    isValid: {
        type: PropType<boolean>;
        default: boolean;
    };
    'onUpdate:isValid': {
        type: PropType<FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<import("../../..").ColorVariant>;
        default: "";
    };
    type: {
        type: PropType<string>;
    };
    autocomplete: {
        type: PropType<string>;
    };
    size: {
        type: PropType<import("../../..").SizeVariant>;
        default: import("../../..").SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    maxlength: {
        type: PropType<string | number>;
    };
    icon: null;
    usePasswordReveal: {
        type: PropType<boolean>;
        default: undefined;
    };
    id: PropType<string>;
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isInline: {
        type: PropType<boolean>;
        default: boolean;
    };
    isMobileModal: {
        type: PropType<boolean>;
        default: boolean;
    };
    menuTag: {
        type: PropType<string>;
        default: string;
    };
    transition: {
        type: PropType<import("../../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../..").Transition>;
    };
    onToggle: {
        type: PropType<FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type BDatepickerProps = ExtractPropTypes<typeof BDatepickerPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<Date | Date[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[Date | Date[]], void>>;
        required: true;
    };
    year: {
        type: NumberConstructor;
        default: number;
    };
    'onUpdate:year': {
        type: PropType<FunctionN<[number], void>>;
        required: boolean;
    };
    month: {
        type: PropType<MonthNumber>;
        default: MonthNumber;
    };
    'onUpdate:month': {
        type: PropType<FunctionN<[MonthNumber], void>>;
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
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: PropType<string>;
    };
    useMobileNative: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<import("../../dropdown/BDropdown").DropdownPosition>;
    };
    indicators: {
        type: PropType<EventIndicator>;
        default: "bars";
    };
    yearsRange: {
        type: PropType<[number, number]>;
        default: import("fp-ts/lib/function").Lazy<readonly [-5, 3]>;
    };
    closeOnSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    isReadonly: {
        type: PropType<boolean>;
        default: boolean;
    };
    useNativeValidation: {
        type: PropType<boolean>;
        default: boolean;
    };
    icons: {
        type: PropType<DatepickerIcons>;
        default: import("fp-ts/lib/function").Lazy<DatepickerIcons>;
    };
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
    disableIfReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    isValid: {
        type: PropType<boolean>;
        default: boolean;
    };
    'onUpdate:isValid': {
        type: PropType<FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<import("../../..").ColorVariant>;
        default: "";
    };
    type: {
        type: PropType<string>;
    };
    autocomplete: {
        type: PropType<string>;
    };
    size: {
        type: PropType<import("../../..").SizeVariant>;
        default: import("../../..").SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    maxlength: {
        type: PropType<string | number>;
    };
    icon: null;
    usePasswordReveal: {
        type: PropType<boolean>;
        default: undefined;
    };
    id: PropType<string>;
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isInline: {
        type: PropType<boolean>;
        default: boolean;
    };
    isMobileModal: {
        type: PropType<boolean>;
        default: boolean;
    };
    menuTag: {
        type: PropType<string>;
        default: string;
    };
    transition: {
        type: PropType<import("../../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../..").Transition>;
    };
    onToggle: {
        type: PropType<FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    hasPopup: boolean;
    transition: import("../../..").Transition;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    icons: DatepickerIcons;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    closeOnSelect: boolean;
    isMultiple: boolean;
    events: DateEvent[];
    indicators: EventIndicator;
    showWeekNumber: boolean;
    month: MonthNumber;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    year: number;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    useMobileNative: boolean;
    yearsRange: [number, number];
} & {
    onToggle?: FunctionN<[boolean], void> | undefined;
    onSetOn?: import("fp-ts/lib/IO").IO<void> | undefined;
    onSetOff?: import("fp-ts/lib/IO").IO<void> | undefined;
    icon?: any;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    id?: string | undefined;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: Date | Date[] | undefined;
    type?: string | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
    "onUpdate:year"?: FunctionN<[number], void> | undefined;
    "onUpdate:month"?: FunctionN<[MonthNumber], void> | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    hasPopup: boolean;
    transition: import("../../..").Transition;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    icons: DatepickerIcons;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
    focusOnMount: boolean;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    closeOnSelect: boolean;
    isMultiple: boolean;
    events: DateEvent[];
    indicators: EventIndicator;
    showWeekNumber: boolean;
    month: MonthNumber;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    year: number;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    useMobileNative: boolean;
    yearsRange: [number, number];
}>;
export default _default;
