import './datepicker.sass';
import { IO } from 'fp-ts/lib/IO';
import { DateEvent, DateSelectionData, DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import {
  addDays,
  getDatesInWeek,
  getEndOfMonth,
  getStartOfMonth,
  isDate,
  isOnOrAfterDate,
  isOnOrBeforeDate,
  isWithinWeek,
  WeekdayNumber
} from './utils';
import { alwaysEmptyArray } from '../../../utils/helpers';
import { isEmpty, rotate } from 'fp-ts/lib/Array';
import { constant, FunctionN } from 'fp-ts/lib/function';
import { fromNullable, isNone, none, Option } from 'fp-ts/lib/Option';
import { defineComponent, PropType, VNode, ExtractPropTypes, h } from 'vue';
import BDatepickerTableRow from './BDatepickerTableRow';

export const BDatepickerTablePropsDefinition = {
  value: {
    type: [Date, Array] as PropType<Date | Date[]>,
    required: false
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
    default: alwaysEmptyArray
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
  dateSelectionData: {
    type: Object as PropType<DateSelectionData>,
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
    type: Function as PropType<IO<Date>>,
    default: constant(() => {
      return new Date();
    })
  },
  unselectableDates: {
    type: Array as PropType<Date[]>,
    default: alwaysEmptyArray
  },
  unselectableDaysOfWeek: {
    type: Array as PropType<number[]>,
    default: alwaysEmptyArray
  },
  selectableDates: {
    type: Object as PropType<Date[]>
  },
  focusedDate: {
    type: Object as PropType<Option<Date>>,
    required: true as const
  },
  onInput: {
    type: Function as PropType<FunctionN<[Date], void>>,
    required: true as const
  },
  onFocus: {
    type: Function as PropType<FunctionN<[Option<Date>], void>>,
    required: true as const
  }
};

export type BDatepickerTableProps = ExtractPropTypes<typeof BDatepickerTablePropsDefinition>;

interface WeekData {
  week: Date[];
  weekNumber: number;
  events: DateEvent[];
}

function getOnFocus(props: BDatepickerTableProps) {
  return function onFocus(date: Option<Date>) {
    if (isNone(date)) {
      props.onFocus(date);
    } else if (props.minDate && props.maxDate) {
      props.onFocus(
        isOnOrAfterDate(date.value, props.minDate) && isOnOrBeforeDate(date.value, props.maxDate) ? date : none
      );
    } else if (props.minDate) {
      props.onFocus(isOnOrAfterDate(date.value, props.minDate) ? date : none);
    } else if (props.maxDate) {
      props.onFocus(isOnOrBeforeDate(date.value, props.maxDate) ? date : none);
    } else {
      props.onFocus(none);
    }
  };
}

function getWeeksWithinMonth(props: BDatepickerTableProps) {
  const startOfMonth = getStartOfMonth(new Date(props.dateSelectionData.year, props.dateSelectionData.month + 1, 0));
  const endOfMonth = getEndOfMonth(startOfMonth);
  const weeks: Date[][] = [];
  let date = startOfMonth;
  while (isOnOrBeforeDate(date, endOfMonth)) {
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

function getGenerateTableRow(props: BDatepickerTableProps, onFocus: FunctionN<[Option<Date>], void>) {
  return function generateTableRow(weekData: WeekData): VNode {
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

function generateTableBody(props: BDatepickerTableProps, onFocus: FunctionN<[Option<Date>], void>): VNode {
  return h(
    'tbody',
    {
      class: ['datepicker-body', { 'has-events': !isEmpty(props.events) }],
    },
    getWeeks(props).map(getGenerateTableRow(props, onFocus))
  );
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
