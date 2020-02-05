import './datepicker.sass';
import { DateCell, DateEvent, DetailedDateEvent } from './shared';
import { Option } from 'fp-ts/lib/Option';
import Vue, { PropType, VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
interface options extends Vue {
    $refs: {
        date: HTMLButtonElement;
    };
}
declare const _default: import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    isSelectableDate(date: Date): boolean;
    isAfterMinDate(date: Date): boolean;
    isBeforeMaxDate(date: Date): boolean;
    onNewFocusDate(date: Option<Date>): void;
    isWithinMonth(date: Date): boolean;
    isEnabled(date: Date): boolean;
    isSelectedDate(date: Date): boolean;
    isOnSelectableDayOfWeek(date: Date): boolean;
    onSelect(date: Date): void;
    getDateEvents(date: Date): DetailedDateEvent[];
    getDateClasses(date: Date | null | undefined, hasEvents?: boolean): object;
    generateCell(cell: DateCell): VNode;
    generateEvents(events: DetailedDateEvent[]): VNode;
    generateWeekNumber(): VNode;
}, {
    formattedEvents: DetailedDateEvent[];
    cells: readonly DateCell[];
    listeners: {
        [key: string]: Function | Function[];
    };
}, {
    selectedDates: Date[];
    focusedDate: Option<Date>;
    showWeekNumber: boolean;
    weekNumber: number;
    week: Date[];
    month: number;
    minDate: Option<Date>;
    maxDate: Option<Date>;
    isDisabled: boolean;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Option<Date[]>;
    events: DateEvent[];
    indicators: import("./shared").EventIndicator;
    dateCreator: () => Date;
}, {
    name: string;
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
            type: BooleanConstructor;
            default: boolean;
        };
        weekNumber: {
            type: NumberConstructor;
            required: true;
        };
        week: {
            type: PropType<Date[]>;
            required: true;
        };
        month: {
            type: NumberConstructor;
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
        dateCreator: PropValidator<() => Date>;
    };
    computed: {
        formattedEvents(): DetailedDateEvent[];
        cells(): readonly DateCell[];
        listeners(): {
            [key: string]: Function | Function[];
        };
    };
    methods: {
        isSelectableDate(date: Date): boolean;
        isAfterMinDate(date: Date): boolean;
        isBeforeMaxDate(date: Date): boolean;
        onNewFocusDate(date: Option<Date>): void;
        isWithinMonth(date: Date): boolean;
        isEnabled(date: Date): boolean;
        isSelectedDate(date: Date): boolean;
        isOnSelectableDayOfWeek(date: Date): boolean;
        onSelect(date: Date): void;
        getDateEvents(date: Date): DetailedDateEvent[];
        getDateClasses(date: Date | null | undefined, hasEvents?: boolean): object;
        generateCell(cell: DateCell): VNode;
        generateEvents(events: DetailedDateEvent[]): VNode;
        generateWeekNumber(): VNode;
    };
    render(): VNode;
}>;
export default _default;
