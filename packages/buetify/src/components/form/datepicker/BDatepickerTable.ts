import './datepicker.sass';
import { DateEvent, DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES, MonthNumber } from './shared';
import {
  addDays,
  getDatesInWeek,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  isDate,
  isOnOrAfterDate,
  isOnOrBeforeDate,
  isWithinWeek,
  WeekdayNumber
} from './utils';
import { constEmptyArray } from '../../../utils/helpers';
import { isEmpty, rotate } from 'fp-ts/lib/Array';
import { constant, FunctionN } from 'fp-ts/lib/function';
import { fromNullable, isNone, none, Option } from 'fp-ts/lib/Option';
import { defineComponent, PropType, VNode, ExtractPropTypes, h, computed, Ref } from 'vue';
import BDatepickerTableRow from './BDatepickerTableRow';

export const BDatepickerTablePropsDefinition = {
  modelValue: {
    type: [Array, Date] as PropType<Date | Date[]>
  },
  'onUpdate:modelValue': {
    type: Function as PropType<FunctionN<[Date | Date[]], void>>,
    required: true as const
  },
  focusedDate: {
    type: Object as PropType<Option<Date>>,
    required: true as const
  },
  'onUpdate:focusedDate': {
    type: Function as PropType<FunctionN<[Option<Date>], any>>,
    required: true as const
  },
  month: {
    type: Number as PropType<MonthNumber>,
    required: true as const
  },
  year: {
    type: Number,
    required: true as const
  },
  dayNames: {
    type: Array as PropType<string[]>,
    default: constant(DEFAULT_DAY_NAMES)
  },
  monthNames: {
    type: Array as PropType<string[]>,
    default: constant(DEFAULT_MONTH_NAMES)
  },
  firstDayOfWeek: {
    type: Number as PropType<WeekdayNumber>,
    default: 0 as const
  },
  events: {
    type: Array as PropType<DateEvent[]>,
    default: constEmptyArray
  },
  indicators: {
    type: String as PropType<'dots' | 'bars'>,
    required: true as const
  },
  minDate: {
    type: Date as PropType<Date>,
    required: false
  },
  maxDate: {
    type: Date as PropType<Date>,
    required: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  unselectableDates: {
    type: Array as PropType<Date[]>,
    default: constEmptyArray
  },
  unselectableDaysOfWeek: {
    type: Array as PropType<number[]>,
    default: constEmptyArray
  },
  selectableDates: {
    type: Object as PropType<Date[]>
  },
  showWeekNumber: {
    type: Boolean as PropType<boolean>,
    default: false as const
  }
};

export type BDatepickerTableProps = ExtractPropTypes<typeof BDatepickerTablePropsDefinition>;

interface WeekData {
  week: Date[];
  weekNumber: number;
  events: DateEvent[];
}

function getWeeksWithinMonth(props: BDatepickerTableProps) {
  const startOfMonth = getStartOfMonth(new Date(props.year, props.month + 1, 0));
  const endOfCalendar = getEndOfWeek(getEndOfMonth(startOfMonth), props.firstDayOfWeek);
  const weeks: Date[][] = [];
  let date = getStartOfWeek(startOfMonth, props.firstDayOfWeek);

  while (isOnOrBeforeDate(date, endOfCalendar)) {
    weeks.push(getDatesInWeek(date, props.firstDayOfWeek));
    date = addDays(date, 7);
  }
  return weeks;
}

function getEventsWithinWeek(props: BDatepickerTableProps, week: Date[]) {
  return props.events.filter(event => {
    const eventDate = isDate(event) ? event : event.date;
    return isWithinWeek(week[0], eventDate, props.firstDayOfWeek);
  });
}

function getWeeks(props: BDatepickerTableProps) {
  return getWeeksWithinMonth(props).map((week, weekNumber) => ({
    week,
    weekNumber,
    events: getEventsWithinWeek(props, week)
  }));
}

function generateTableHeader(dayNames: string[]) {
  return h('thead', { class: 'datepicker-header' }, [
    h(
      'tr',
      dayNames.map(day => h('th', { key: day, class: 'datepicker-cell' }, day))
    )
  ]);
}

function getGenerateTableRow(props: BDatepickerTableProps, focusedDate: Ref<Option<Date>>) {
  return function generateTableRow(weekData: WeekData): VNode {
    return h(BDatepickerTableRow, {
      key: weekData.weekNumber,
      modelValue: props.modelValue,
      'onUpdate:modelValue': props['onUpdate:modelValue'],
      focusedDate: focusedDate.value,
      'onUpdate:focusedDate': (val: Option<Date>) => {
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

function generateTableBody(props: BDatepickerTableProps, focusedDate: Ref<Option<Date>>): VNode {
  return h(
    'tbody',
    {
      class: ['datepicker-body', { 'has-events': !isEmpty(props.events) }]
    },
    getWeeks(props).map(getGenerateTableRow(props, focusedDate))
  );
}

export default defineComponent({
  name: 'b-datepicker-table',
  props: BDatepickerTablePropsDefinition,
  setup(props) {
    const focusedDate = computed({
      get() {
        return props.focusedDate;
      },
      set(date: Option<Date>) {
        if (isNone(date)) {
          props['onUpdate:focusedDate'](date);
        } else if (props.minDate && props.maxDate) {
          props['onUpdate:focusedDate'](
            isOnOrAfterDate(date.value, props.minDate) && isOnOrBeforeDate(date.value, props.maxDate) ? date : none
          );
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
      return h('table', { class: 'datepicker-table' }, [
        generateTableHeader(rotate(-props.firstDayOfWeek)(props.dayNames)),
        generateTableBody(props, focusedDate)
      ]);
    };
  }
});
