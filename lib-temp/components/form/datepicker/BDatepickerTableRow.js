import './datepicker.sass';
import BDatepickerTableCell from './BDatepickerTableCell';
import { elemSerialDate, isDate, isOnOrAfterDate, isOnOrBeforeDate, isSameDay } from './utils';
import { alwaysEmptyArray, alwaysNone } from '../../../utils/helpers';
import { isNonEmpty } from 'fp-ts/lib/Array';
import { constant, constTrue, identity } from 'fp-ts/lib/function';
import { fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, computed, h } from 'vue';
export const BDatepickerTableRowPropsDefinition = {
    selectedDates: {
        type: Array,
        required: true
    },
    focusedDate: {
        type: Object,
        required: true
    },
    showWeekNumber: {
        type: Boolean,
        default: false
    },
    weekNumber: {
        type: Number,
        required: true
    },
    week: {
        type: Array,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    minDate: {
        type: Object,
        required: true
    },
    maxDate: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        default: false
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
        type: Object,
        default: alwaysNone
    },
    events: {
        type: Array,
        default: alwaysEmptyArray
    },
    indicators: {
        type: String,
        required: true
    },
    onSelect: {
        type: Function,
        required: true
    },
    onFocus: {
        type: Function,
        required: true
    },
    dateCreator: {
        type: Function,
        default: constant(() => {
            return new Date();
        })
    }
};
function getIsAfterMinDate(props) {
    return function isAfterMinDate(date) {
        return pipe(props.minDate, fold(constTrue, d => isOnOrAfterDate(date, d)));
    };
}
function getIsBeforeMaxDate(props) {
    return function isBeforeMaxDate(date) {
        return pipe(props.maxDate, fold(constTrue, d => isOnOrBeforeDate(date, d)));
    };
}
function getIsWithinMonth(props) {
    return function isWithinMonth(date) {
        return date.getMonth() === props.month;
    };
}
function getIsEnabled(props) {
    return function isEnabled(date) {
        return (!elemSerialDate(date, props.unselectableDates) &&
            pipe(props.selectableDates, fold(constTrue, dates => elemSerialDate(date, dates))));
    };
}
function getIsOnSelectableDayOfWeek(props) {
    return function isOnSelectableDayOfWeek(date) {
        return !props.unselectableDaysOfWeek.includes(date.getDay());
    };
}
function getDatePredicates(props) {
    const isAfterMinDate = getIsAfterMinDate(props);
    const isBeforeMaxDate = getIsBeforeMaxDate(props);
    const isWithinMonth = getIsWithinMonth(props);
    const isEnabled = getIsEnabled(props);
    const isOnSelectableDayOfWeek = getIsOnSelectableDayOfWeek(props);
    function isSelectedDate(date) {
        return props.selectedDates.some(d => isSameDay(d, date));
    }
    function isSelectableDate(date) {
        return [
            isAfterMinDate(date),
            isBeforeMaxDate(date),
            isWithinMonth(date),
            isEnabled(date),
            isOnSelectableDayOfWeek(date)
        ].every(identity);
    }
    return {
        isAfterMinDate,
        isBeforeMaxDate,
        isWithinMonth,
        isEnabled,
        isOnSelectableDayOfWeek,
        isSelectableDate,
        isSelectedDate
    };
}
function getDateClassesGenerator(props, predicates) {
    return function getDateClasses(date, hasEvents = false) {
        if (isDate(date)) {
            const isSelectable = predicates.isSelectableDate(date);
            return {
                'is-selected': predicates.isSelectedDate(date),
                'is-today': isSameDay(date, props.dateCreator()),
                'is-selectable': isSelectable && !props.isDisabled,
                'is-unselectable': !isSelectable || props.isDisabled,
                'has-event': hasEvents
            };
        }
        else {
            return {};
        }
    };
}
function generateWeekNumber(weekNumber) {
    return h('td', [`${weekNumber}`]);
}
function getGenerateCell(props) {
    return function generateCell(cell) {
        return h(BDatepickerTableCell, {
            key: cell.date.toLocaleDateString(),
            cell,
            selectedDates: props.selectedDates,
            focusedDate: props.focusedDate,
            indicators: props.indicators,
            onFocus: props.onFocus,
            onSelect: props.onSelect
        });
    };
}
export default defineComponent({
    name: 'b-datepicker-table-row',
    props: BDatepickerTableRowPropsDefinition,
    setup(props) {
        const formattedEvents = computed(() => props.events.map(event => (isDate(event) ? { date: event, variant: 'is-primary' } : event)));
        const predicates = getDatePredicates(props);
        const getDateClasses = getDateClassesGenerator(props, predicates);
        const cells = computed(() => props.week.map(date => {
            const events = formattedEvents.value.filter(event => isSameDay(date, event.date));
            const hasEvents = isNonEmpty(events);
            return {
                date,
                events,
                hasEvents,
                isSelected: predicates.isSelectedDate(date),
                isDisabled: props.isDisabled || !predicates.isSelectableDate(date),
                number: date.getDate(),
                ariaLabel: date.toLocaleDateString(),
                classes: getDateClasses(date, hasEvents)
            };
        }));
        const generateCell = getGenerateCell(props);
        return () => {
            return h('tr', { class: 'datepicker-row' }, props.showWeekNumber
                ? [generateWeekNumber(props.weekNumber), ...cells.value.map(generateCell)]
                : cells.value.map(generateCell));
        };
    }
});
//# sourceMappingURL=BDatepickerTableRow.js.map