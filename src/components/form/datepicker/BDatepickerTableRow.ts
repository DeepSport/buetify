import './datepicker.sass';
import { IO } from 'fp-ts/lib/IO';
import BDatepickerTableCell from './BDatepickerTableCell';
import { DateCell, DateEvent, DetailedDateEvent } from './shared';
import { elemSerialDate, isDate, isOnOrAfterDate, isOnOrBeforeDate, isSameDay } from './utils';
import { alwaysEmptyArray, alwaysNone } from '../../../utils/helpers';
import { isNonEmpty } from 'fp-ts/lib/Array';
import { constant, constTrue, FunctionN, identity } from 'fp-ts/lib/function';
import { fold, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, PropType, VNode, computed, Ref, ExtractPropTypes, h } from 'vue';

export const BDatepickerTableRowPropsDefinition = {
  selectedDates: {
    type: Array as PropType<Date[]>,
    required: true as const
  },
  focusedDate: {
    type: Object as PropType<Option<Date>>,
    required: true as const
  },
  showWeekNumber: {
    type: Boolean as PropType<boolean>,
    default: false as const
  },
  weekNumber: {
    type: Number as PropType<number>,
    required: true as const
  },
  week: {
    type: Array as PropType<Date[]>,
    required: true as const
  },
  month: {
    type: Number as PropType<number>,
    required: true as const
  },
  minDate: {
    type: Object as PropType<Option<Date>>,
    required: true as const
  },
  maxDate: {
    type: Object as PropType<Option<Date>>,
    required: true as const
  },
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false as const
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
    type: Object as PropType<Option<Date[]>>,
    default: alwaysNone
  },
  events: {
    type: Array as PropType<DateEvent[]>,
    default: alwaysEmptyArray
  },
  indicators: {
    type: String as PropType<'dots' | 'bars'>,
    required: true as const
  },
  onSelect: {
    type: Function as PropType<FunctionN<[Date], void>>,
    required: true as const
  },
  onFocus: {
    type: Function as PropType<FunctionN<[Option<Date>], void>>,
    required: true as const
  },
  dateCreator: {
    type: Function as PropType<IO<Date>>,
    default: constant(() => {
      return new Date();
    })
  }
};

export type BDatePickerTableRowProps = ExtractPropTypes<typeof BDatepickerTableRowPropsDefinition>;

function getIsAfterMinDate(props: BDatePickerTableRowProps) {
  return function isAfterMinDate(date: Date): boolean {
    return pipe(
      props.minDate,
      fold(constTrue, d => isOnOrAfterDate(date, d))
    );
  };
}

function getIsBeforeMaxDate(props: BDatePickerTableRowProps) {
  return function isBeforeMaxDate(date: Date): boolean {
    return pipe(
      props.maxDate,
      fold(constTrue, d => isOnOrBeforeDate(date, d))
    );
  };
}

function getIsWithinMonth(props: BDatePickerTableRowProps) {
  return function isWithinMonth(date: Date): boolean {
    return date.getMonth() === props.month;
  };
}

function getIsEnabled(props: BDatePickerTableRowProps) {
  return function isEnabled(date: Date): boolean {
    return (
      !elemSerialDate(date, props.unselectableDates) &&
      pipe(
        props.selectableDates,
        fold(constTrue, dates => elemSerialDate(date, dates))
      )
    );
  };
}

function getIsOnSelectableDayOfWeek(props: BDatePickerTableRowProps) {
  return function isOnSelectableDayOfWeek(date: Date): boolean {
    return !props.unselectableDaysOfWeek.includes(date.getDay());
  };
}

function getDatePredicates(props: BDatePickerTableRowProps) {
  const isAfterMinDate = getIsAfterMinDate(props);
  const isBeforeMaxDate = getIsBeforeMaxDate(props);
  const isWithinMonth = getIsWithinMonth(props);
  const isEnabled = getIsEnabled(props);
  const isOnSelectableDayOfWeek = getIsOnSelectableDayOfWeek(props);
  function isSelectedDate(date: Date): boolean {
    return props.selectedDates.some(d => isSameDay(d, date));
  }
  function isSelectableDate(date: Date): boolean {
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

type DatePredicates = ReturnType<typeof getDatePredicates>;

function getDateClassesGenerator(props: BDatePickerTableRowProps, predicates: DatePredicates) {
  return function getDateClasses(date: Date | undefined | null, hasEvents: boolean = false) {
    if (isDate(date)) {
      const isSelectable = predicates.isSelectableDate(date);
      return {
        'is-selected': predicates.isSelectedDate(date),
        'is-today': isSameDay(date, (props.dateCreator as IO<Date>)()),
        'is-selectable': isSelectable && !props.isDisabled,
        'is-unselectable': !isSelectable || props.isDisabled,
        'has-event': hasEvents
      };
    } else {
      return {};
    }
  };
}

function generateWeekNumber(weekNumber: number): VNode {
  return h('td', [`${weekNumber}`]);
}

function getGenerateCell(props: BDatePickerTableRowProps) {
  return function generateCell(cell: DateCell): VNode {
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
    const formattedEvents: Ref<DetailedDateEvent[]> = computed(() =>
      props.events.map(event => (isDate(event) ? { date: event, variant: 'is-primary' } : event))
    );
    const predicates = getDatePredicates(props);
    const getDateClasses = getDateClassesGenerator(props, predicates);
    const cells = computed(() =>
      props.week.map(date => {
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
      })
    );
    const generateCell = getGenerateCell(props);
    return () => {
      return h(
        'tr',
        { class: 'datepicker-row' },
        props.showWeekNumber
          ? [generateWeekNumber(props.weekNumber), ...cells.value.map(generateCell)]
          : cells.value.map(generateCell)
      );
    };
  }
});
