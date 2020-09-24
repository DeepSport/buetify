import './datepicker.sass';
import { DateSelectionData, EventIndicator } from './shared';
import { FunctionN } from 'fp-ts/lib/function';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode, Component, ExtractPropTypes } from 'vue';
declare function defaultDateFormatter(date: Date | Date[], isMultiple: boolean): string;
declare function defaultDateParser(date: string): Date | null;
export declare type DatepickerPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';
export interface DatepickerIcons {
    next: Component;
    previous: Component;
    calendar: Component;
}
export declare function getDatepickerIcons(icons: Partial<DatepickerIcons>): DatepickerIcons;
declare const BDatepickerPropsDefinition: {
    placeholder: {
        type: PropType<string>;
    };
    initiallyFocusedDate: {
        type: PropType<Date>;
        default: () => Date;
    };
    dateFormatter: {
        type: PropType<FunctionN<[Date | Date[], boolean], string>>;
        default: import("fp-ts/lib/function").Lazy<typeof defaultDateFormatter>;
    };
    dateParser: {
        type: PropType<FunctionN<[string], Date | null>>;
        default: import("fp-ts/lib/function").Lazy<typeof defaultDateParser>;
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
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    openOnFocus: {
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
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onBlur: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
    isDisabled: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    isReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    disableIfReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    useNativeValidation: {
        type: PropType<boolean>;
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
        type: PropType<import("../../../types/ColorVariants").ColorVariant>;
        default: "is-primary";
    };
    type: {
        type: PropType<string>;
    };
    autocomplete: {
        type: PropType<string>;
    };
    size: {
        type: PropType<import("../../../types/SizeVariants").SizeVariant>;
        default: import("../../../types/SizeVariants").SizeVariant;
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
    icon: {
        type: PropType<any>;
    };
    usePasswordReveal: {
        type: PropType<boolean>;
        default: boolean;
    };
    modelValue: {
        type: PropType<Date | Date[]>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[Date | Date[]], void>>;
        default: import("fp-ts/lib/function").Lazy<FunctionN<[Date | Date[]], void>>;
    };
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
        type: PropType<import("./utils").WeekdayNumber>;
        default: 0;
    };
    events: {
        type: PropType<import("./shared").DateEvent[]>;
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
    dateSelectionData: {
        type: PropType<DateSelectionData>;
        default: () => {
            month: number;
            year: number;
        };
    };
    dateCreator: {
        type: PropType<import("fp-ts/lib/IO").IO<Date>>;
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
    showWeekNumber: {
        type: PropType<boolean>;
        default: false;
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
        type: PropType<import("../../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../../types/Transition").Transition>;
        required: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type BDatepickerProps = ExtractPropTypes<typeof BDatepickerPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{
    focusedDate: Option<Date>;
    onInput: FunctionN<[Date], void>;
} & {
    type?: string | undefined;
    value?: Date | Date[] | undefined;
    id?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isHoverable?: boolean | undefined;
    isInline?: boolean | undefined;
    isMobileModal?: boolean | undefined;
    menuTag?: string | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: Date | Date[] | undefined;
    "onUpdate:modelValue"?: FunctionN<[Date | Date[]], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    icons?: DatepickerIcons | undefined;
    closeOnSelect?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    isMultiple?: boolean | undefined;
    events?: import("./shared").DateEvent[] | undefined;
    indicators?: "bars" | "dots" | undefined;
    showWeekNumber?: boolean | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    unselectableDates?: Date[] | undefined;
    unselectableDaysOfWeek?: number[] | undefined;
    selectableDates?: Date[] | undefined;
    dateCreator?: import("fp-ts/lib/IO").IO<Date> | undefined;
    dayNames?: string[] | undefined;
    monthNames?: string[] | undefined;
    firstDayOfWeek?: 0 | 2 | 1 | 6 | 5 | 4 | 3 | undefined;
    dateSelectionData?: {
        month: number;
        year: number;
    } | undefined;
    initiallyFocusedDate?: Date | undefined;
    dateFormatter?: FunctionN<[Date | Date[], boolean], string> | undefined;
    dateParser?: FunctionN<[string], Date | null> | undefined;
    useMobileNative?: boolean | undefined;
    yearsRange?: [number, number] | readonly [-5, 3] | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    focusedDate: Option<Date>;
    onInput: FunctionN<[Date], void>;
} & {
    type?: string | undefined;
    value?: Date | Date[] | undefined;
    id?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isHoverable?: boolean | undefined;
    isInline?: boolean | undefined;
    isMobileModal?: boolean | undefined;
    menuTag?: string | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: Date | Date[] | undefined;
    "onUpdate:modelValue"?: FunctionN<[Date | Date[]], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    icons?: DatepickerIcons | undefined;
    closeOnSelect?: boolean | undefined;
    openOnFocus?: boolean | undefined;
    isMultiple?: boolean | undefined;
    events?: import("./shared").DateEvent[] | undefined;
    indicators?: "bars" | "dots" | undefined;
    showWeekNumber?: boolean | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    unselectableDates?: Date[] | undefined;
    unselectableDaysOfWeek?: number[] | undefined;
    selectableDates?: Date[] | undefined;
    dateCreator?: import("fp-ts/lib/IO").IO<Date> | undefined;
    dayNames?: string[] | undefined;
    monthNames?: string[] | undefined;
    firstDayOfWeek?: 0 | 2 | 1 | 6 | 5 | 4 | 3 | undefined;
    dateSelectionData?: {
        month: number;
        year: number;
    } | undefined;
    initiallyFocusedDate?: Date | undefined;
    dateFormatter?: FunctionN<[Date | Date[], boolean], string> | undefined;
    dateParser?: FunctionN<[string], Date | null> | undefined;
    useMobileNative?: boolean | undefined;
    yearsRange?: [number, number] | readonly [-5, 3] | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    transition: import("../../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    icons: DatepickerIcons;
    closeOnSelect: boolean;
    openOnFocus: boolean;
    isMultiple: boolean;
    events: import("./shared").DateEvent[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: import("fp-ts/lib/IO").IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: import("./utils").WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
    initiallyFocusedDate: Date;
    dateFormatter: FunctionN<[Date | Date[], boolean], string>;
    dateParser: FunctionN<[string], Date | null>;
    useMobileNative: boolean;
    yearsRange: [number, number] | readonly [-5, 3];
} & {
    type?: string | undefined;
    value?: Date | Date[] | undefined;
    id?: string | undefined;
    icon?: any;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: Date | Date[] | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        placeholder: {
            type: PropType<string>;
        };
        initiallyFocusedDate: {
            type: PropType<Date>;
            default: () => Date;
        };
        dateFormatter: {
            type: PropType<FunctionN<[Date | Date[], boolean], string>>;
            default: import("fp-ts/lib/function").Lazy<typeof defaultDateFormatter>;
        };
        dateParser: {
            type: PropType<FunctionN<[string], Date | null>>;
            default: import("fp-ts/lib/function").Lazy<typeof defaultDateParser>;
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
        isMultiple: {
            type: PropType<boolean>;
            default: boolean;
        };
        openOnFocus: {
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
            type: PropType<import("fp-ts/lib/IO").IO<void>>;
            required: false;
        };
        onBlur: {
            type: PropType<import("fp-ts/lib/IO").IO<void>>;
            required: false;
        };
        focusOnMount: {
            type: PropType<boolean>;
            default: boolean;
        };
        isDisabled: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        isReadonly: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        disableIfReadonly: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        useNativeValidation: {
            type: PropType<boolean>;
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
            type: PropType<import("../../../types/ColorVariants").ColorVariant>;
            default: "is-primary";
        };
        type: {
            type: PropType<string>;
        };
        autocomplete: {
            type: PropType<string>;
        };
        size: {
            type: PropType<import("../../../types/SizeVariants").SizeVariant>;
            default: import("../../../types/SizeVariants").SizeVariant;
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
        icon: {
            type: PropType<any>;
        };
        usePasswordReveal: {
            type: PropType<boolean>;
            default: boolean;
        };
        modelValue: {
            type: PropType<Date | Date[]>;
            required: false;
        };
        'onUpdate:modelValue': {
            type: PropType<FunctionN<[Date | Date[]], void>>;
            default: import("fp-ts/lib/function").Lazy<FunctionN<[Date | Date[]], void>>;
        };
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
            type: PropType<import("./utils").WeekdayNumber>;
            default: 0;
        };
        events: {
            type: PropType<import("./shared").DateEvent[]>;
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
        dateSelectionData: {
            type: PropType<DateSelectionData>;
            default: () => {
                month: number;
                year: number;
            };
        };
        dateCreator: {
            type: PropType<import("fp-ts/lib/IO").IO<Date>>;
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
        showWeekNumber: {
            type: PropType<boolean>;
            default: false;
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
            type: PropType<import("../../../types/Transition").Transition>;
            default: import("fp-ts/lib/function").Lazy<import("../../../types/Transition").Transition>;
            required: boolean;
        };
        hasPopup: {
            type: PropType<boolean>;
            default: boolean;
        };
        themeMap: {
            type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
        };
        isThemeable: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    transition: import("../../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    icons: DatepickerIcons;
    closeOnSelect: boolean;
    openOnFocus: boolean;
    isMultiple: boolean;
    events: import("./shared").DateEvent[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: import("fp-ts/lib/IO").IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: import("./utils").WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
    initiallyFocusedDate: Date;
    dateFormatter: FunctionN<[Date | Date[], boolean], string>;
    dateParser: FunctionN<[string], Date | null>;
    useMobileNative: boolean;
    yearsRange: [number, number] | readonly [-5, 3];
} & {
    type?: string | undefined;
    value?: Date | Date[] | undefined;
    id?: string | undefined;
    icon?: any;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: Date | Date[] | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    transition: import("../../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    icons: DatepickerIcons;
    closeOnSelect: boolean;
    openOnFocus: boolean;
    isMultiple: boolean;
    events: import("./shared").DateEvent[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: import("fp-ts/lib/IO").IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: import("./utils").WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
    initiallyFocusedDate: Date;
    dateFormatter: FunctionN<[Date | Date[], boolean], string>;
    dateParser: FunctionN<[string], Date | null>;
    useMobileNative: boolean;
    yearsRange: [number, number] | readonly [-5, 3];
} & {
    type?: string | undefined;
    value?: Date | Date[] | undefined;
    id?: string | undefined;
    icon?: any;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: Date | Date[] | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    transition: import("../../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    icons: DatepickerIcons;
    closeOnSelect: boolean;
    openOnFocus: boolean;
    isMultiple: boolean;
    events: import("./shared").DateEvent[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    showWeekNumber: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    dateCreator: import("fp-ts/lib/IO").IO<Date>;
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: import("./utils").WeekdayNumber;
    dateSelectionData: {
        month: number;
        year: number;
    };
    onInput: FunctionN<[Date], void>;
    initiallyFocusedDate: Date;
    dateFormatter: FunctionN<[Date | Date[], boolean], string>;
    dateParser: FunctionN<[string], Date | null>;
    useMobileNative: boolean;
    yearsRange: [number, number] | readonly [-5, 3];
} & {
    type?: string | undefined;
    value?: Date | Date[] | undefined;
    id?: string | undefined;
    icon?: any;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: Date | Date[] | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    minDate?: Date | undefined;
    maxDate?: Date | undefined;
    selectableDates?: Date[] | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
