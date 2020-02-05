import './datepicker.sass';
import { DateEvent, DateSelectionData } from './shared';
import { WeekdayNumber } from './utils';
import { Option } from 'fp-ts/lib/Option';
import Vue, { PropType, VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
interface WeekData {
    week: Date[];
    weekNumber: number;
    events: DateEvent[];
}
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, {
    updateFocusedDate(date: Option<Date>): void;
    updateSelectedDate(date: Date): void;
    getEventsWithinWeek(dates: Date[]): DateEvent[];
    generateTableHeader(): VNode;
    generateTableBody(): VNode;
    generateTableRow(weekData: WeekData): VNode;
}, {
    selectedDates: Date[];
    newMinDate: Option<Date>;
    newMaxDate: Option<Date>;
    newSelectableDates: Option<Date[]>;
    visibleDayNames: string[];
    hasEvents: boolean;
    eventsInThisMonth: DateEvent[];
    weeksData: WeekData[];
    weeksInThisMonth: Date[][];
}, {
    value: Date | Date[];
    dayNames: string[];
    monthNames: string[];
    firstDayOfWeek: WeekdayNumber;
    events: DateEvent[];
    indicators: import("./shared").EventIndicator;
    minDate: Date;
    maxDate: Date;
    dateSelectionData: {
        month: number;
        year: number;
    };
    isDisabled: boolean;
    dateCreator: () => Date;
    unselectableDates: Date[];
    unselectableDaysOfWeek: number[];
    selectableDates: Date[];
    focusedDate: Option<Date>;
}, {
    name: string;
    props: {
        value: {
            type: PropType<Date | Date[]>;
            required: false;
        };
        dayNames: {
            type: PropType<string[]>;
            default: import("fp-ts/lib/function").Lazy<string[]>;
        };
        monthNames: {
            type: PropType<string[]>;
            default: import("fp-ts/lib/function").Lazy<string[]>;
        };
        firstDayOfWeek: PropValidator<WeekdayNumber>;
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
            required: false;
        };
        maxDate: {
            type: PropType<Date>;
            required: false;
        };
        dateSelectionData: {
            type: PropType<DateSelectionData>;
            required: false;
            default: () => {
                month: number;
                year: number;
            };
        };
        isDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        dateCreator: PropValidator<() => Date>;
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
    };
    computed: {
        selectedDates(): Date[];
        newMinDate(): Option<Date>;
        newMaxDate(): Option<Date>;
        newSelectableDates(): Option<Date[]>;
        visibleDayNames(): string[];
        hasEvents(): boolean;
        eventsInThisMonth(): DateEvent[];
        weeksData(): WeekData[];
        weeksInThisMonth(): Date[][];
    };
    methods: {
        updateFocusedDate(date: Option<Date>): void;
        updateSelectedDate(date: Date): void;
        getEventsWithinWeek(dates: Date[]): DateEvent[];
        generateTableHeader(): VNode;
        generateTableBody(): VNode;
        generateTableRow(weekData: WeekData): VNode;
    };
    render(): VNode;
}>;
export default _default;
