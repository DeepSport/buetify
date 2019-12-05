import "../../../../src/components/form/datepicker/datepicker.sass";
import { DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import { addDays, getDatesInWeek, getEndOfMonth, getEndOfWeek, getStartOfMonth, getStartOfWeek, isDate, isOnOrAfterDate, isOnOrBeforeDate, isWithinWeek } from './utils';
import { constEmptyArray } from '../../../utils/helpers';
import { isEmpty, rotate } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { fromNullable, isNone, none } from 'fp-ts/lib/Option';
import { defineComponent, h, computed } from 'vue';
import BDatepickerTableRow from './BDatepickerTableRow';
export const BDatepickerTablePropsDefinition = {
  modelValue: {
    type: [Array, Date]
  },
  'onUpdate:modelValue': {
    type: Function,
    required: true
  },
  focusedDate: {
    type: Object,
    required: true
  },
  'onUpdate:focusedDate': {
    type: Function,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
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
    default: constEmptyArray
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
  isDisabled: {
    type: Boolean,
    default: false
  },
  unselectableDates: {
    type: Array,
    default: constEmptyArray
  },
  unselectableDaysOfWeek: {
    type: Array,
    default: constEmptyArray
  },
  selectableDates: {
    type: Object
  },
  showWeekNumber: {
    type: Boolean,
    default: false
  }
};

function getWeeksWithinMonth(props) {
  const startOfMonth = getStartOfMonth(new Date(props.year, props.month + 1, 0));
  const endOfCalendar = getEndOfWeek(getEndOfMonth(startOfMonth), props.firstDayOfWeek);
  const weeks = [];
  let date = getStartOfWeek(startOfMonth, props.firstDayOfWeek);

  while (isOnOrBeforeDate(date, endOfCalendar)) {
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
  return h('thead', {
    class: 'datepicker-header'
  }, [h('tr', dayNames.map(day => h('th', {
    key: day,
    class: 'datepicker-cell'
  }, day)))]);
}

function getGenerateTableRow(props, focusedDate) {
  return function generateTableRow(weekData) {
    return h(BDatepickerTableRow, {
      key: weekData.weekNumber,
      modelValue: props.modelValue,
      'onUpdate:modelValue': props['onUpdate:modelValue'],
      focusedDate: focusedDate.value,
      'onUpdate:focusedDate': val => {
        focusedDate.value = val;
      },
      week: weekData.week,
      weekNumber: weekData.weekNumber,
      month: props.month,
      minDate: fromNullable(props.minDate),
      maxDate: fromNullable(props.maxDate),
      unselectableDates: props.unselectableDates,
      unselectableDaysOfWeek: props.unselectableDaysOfWeek,
      selectableDates: fromNullable(props.selectableDates),
      events: weekData.events,
      indicators: props.indicators
    });
  };
}

function generateTableBody(props, focusedDate) {
  return h('tbody', {
    class: ['datepicker-body', {
      'has-events': !isEmpty(props.events)
    }]
  }, getWeeks(props).map(getGenerateTableRow(props, focusedDate)));
}

export default defineComponent({
  name: 'b-datepicker-table',
  props: BDatepickerTablePropsDefinition,

  setup(props) {
    const focusedDate = computed({
      get() {
        return props.focusedDate;
      },

      set(date) {
        if (isNone(date)) {
          props['onUpdate:focusedDate'](date);
        } else if (props.minDate && props.maxDate) {
          props['onUpdate:focusedDate'](isOnOrAfterDate(date.value, props.minDate) && isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
        } else if (props.minDate) {
          props['onUpdate:focusedDate'](isOnOrAfterDate(date.value, props.minDate) ? date : none);
        } else if (props.maxDate) {
          props['onUpdate:focusedDate'](isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
        } else {
          props['onUpdate:focusedDate'](date);
        }
      }

    });
    return () => {
      return h('table', {
        class: 'datepicker-table'
      }, [generateTableHeader(rotate(-props.firstDayOfWeek)(props.dayNames)), generateTableBody(props, focusedDate)]);
    };
  }

});
//# sourceMappingURL=BDatepickerTable.js.map