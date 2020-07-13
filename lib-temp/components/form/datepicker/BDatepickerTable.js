import './datepicker.sass';
import { DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import { addDays, getDatesInWeek, getEndOfMonth, getStartOfMonth, isDate, isOnOrAfterDate, isOnOrBeforeDate, isWithinWeek } from './utils';
import { alwaysEmptyArray } from '../../../utils/helpers';
import { isEmpty, rotate } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { fromNullable, isNone, none } from 'fp-ts/lib/Option';
import { defineComponent, h } from 'vue';
import BDatepickerTableRow from './BDatepickerTableRow';
export const BDatepickerTablePropsDefinition = {
    value: {
        type: [Date, Array],
        required: false
    },
    dayNames: {
        type: Array,
        default: constant(DEFAULT_DAY_NAMES)
    },
    monthNames: {
        type: Array,
        default: constant(DEFAULT_MONTH_NAMES)
    },
    firstDayOfWeek: {
        type: Number,
        default: 0
    },
    events: {
        type: Array,
        default: alwaysEmptyArray
    },
    indicators: {
        type: String,
        required: true
    },
    minDate: {
        type: Date,
        required: false
    },
    maxDate: {
        type: Date,
        required: false
    },
    dateSelectionData: {
        type: Object,
        default: () => {
            const date = new Date();
            return {
                month: date.getMonth(),
                year: date.getFullYear()
            };
        }
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    dateCreator: {
        type: Function,
        default: constant(() => {
            return new Date();
        })
    },
    unselectableDates: {
        type: Array,
        default: alwaysEmptyArray
    },
    unselectableDaysOfWeek: {
        type: Array,
        default: alwaysEmptyArray
    },
    selectableDates: {
        type: Object
    },
    focusedDate: {
        type: Object,
        required: true
    },
    onInput: {
        type: Function,
        required: true
    },
    onFocus: {
        type: Function,
        required: true
    },
    showWeekNumber: {
        type: Boolean,
        default: false
    }
};
function getOnFocus(props) {
    return function onFocus(date) {
        if (isNone(date)) {
            props.onFocus(date);
        }
        else if (props.minDate && props.maxDate) {
            props.onFocus(isOnOrAfterDate(date.value, props.minDate) && isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
        }
        else if (props.minDate) {
            props.onFocus(isOnOrAfterDate(date.value, props.minDate) ? date : none);
        }
        else if (props.maxDate) {
            props.onFocus(isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
        }
        else {
            props.onFocus(none);
        }
    };
}
function getWeeksWithinMonth(props) {
    const startOfMonth = getStartOfMonth(new Date(props.dateSelectionData.year, props.dateSelectionData.month + 1, 0));
    const endOfMonth = getEndOfMonth(startOfMonth);
    const weeks = [];
    let date = startOfMonth;
    while (isOnOrBeforeDate(date, endOfMonth)) {
        weeks.push(getDatesInWeek(date, props.firstDayOfWeek));
        date = addDays(date, 7);
    }
    return weeks;
}
function getEventsWithinWeek(props, week) {
    return props.events.filter(event => {
        const eventDate = isDate(event) ? event : event.date;
        return isWithinWeek(week[0], eventDate, props.firstDayOfWeek);
    });
}
function getWeeks(props) {
    return getWeeksWithinMonth(props).map((week, weekNumber) => ({
        week,
        weekNumber,
        events: getEventsWithinWeek(props, week)
    }));
}
function generateTableHeader(dayNames) {
    return h('thead', { class: 'datepicker-header' }, [
        h('tr', dayNames.map(day => h('th', { key: day, class: 'datepicker-cell' }, day)))
    ]);
}
function getGenerateTableRow(props, onFocus) {
    return function generateTableRow(weekData) {
        return h(BDatepickerTableRow, {
            key: weekData.weekNumber,
            selectedDates: props.value === undefined ? [] : Array.isArray(props.value) ? props.value : [props.value],
            week: weekData.week,
            weekNumber: weekData.weekNumber,
            month: props.dateSelectionData.month,
            minDate: fromNullable(props.minDate),
            maxDate: fromNullable(props.maxDate),
            unselectableDates: props.unselectableDates,
            unselectableDaysOfWeek: props.unselectableDaysOfWeek,
            selectableDates: fromNullable(props.selectableDates),
            events: weekData.events,
            indicators: props.indicators,
            dateCreator: props.dateCreator,
            focusedDate: props.focusedDate,
            onFocus,
            onSelect: props.onInput
        });
    };
}
function generateTableBody(props, onFocus) {
    return h('tbody', {
        class: ['datepicker-body', { 'has-events': !isEmpty(props.events) }]
    }, getWeeks(props).map(getGenerateTableRow(props, onFocus)));
}
export default defineComponent({
    name: 'b-datepicker-table',
    props: BDatepickerTablePropsDefinition,
    setup(props) {
        const onFocus = getOnFocus(props);
        return () => {
            return h('table', { class: 'datepicker-table' }, [
                generateTableHeader(rotate(-props.firstDayOfWeek)(props.dayNames)),
                generateTableBody(props, onFocus)
            ]);
        };
    }
});
//# sourceMappingURL=BDatepickerTable.js.map