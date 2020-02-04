import './datepicker.sass';
import { DateEvent, DateSelectionData, DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import {
  addDays,
  getDatesInWeek,
  getEndOfMonth,
  getStartOfMonth,
  isDate,
  isOnOrBeforeDate,
  isWithinWeek,
  WeekdayNumber
} from './utils';
import { alwaysEmptyArray, alwaysNone } from '../../../utils/helpers';
import { isNonEmpty, rotate } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { fromNullable, Option } from 'fp-ts/lib/Option';
import Vue, { PropType, VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import BDatepickerTableRow from './BDatepickerTableRow';

interface WeekData {
  week: Date[];
  weekNumber: number;
  events: DateEvent[];
}

export default Vue.extend({
  name: 'BDatepickerTable',
  props: {
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
      type: Number,
      default: 0
    } as PropValidator<WeekdayNumber>,
    events: {
      type: Array as PropType<DateEvent[]>,
      default: alwaysEmptyArray
    },
    indicators: {
      type: String as PropType<'dots' | 'bars'>,
      required: true
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
      required: false,
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
      default: () => {
        return new Date();
      }
    } as PropValidator<() => Date>,
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
      required: true
    }
  },
  computed: {
    selectedDates(): Date[] {
      if (this.value === undefined) {
        return [];
      } else if (Array.isArray(this.value)) {
        return this.value;
      } else {
        return [this.value];
      }
    },
    newMinDate(): Option<Date> {
      return fromNullable(this.minDate);
    },
    newMaxDate(): Option<Date> {
      return fromNullable(this.maxDate);
    },
    newSelectableDates(): Option<Date[]> {
      return fromNullable(this.selectableDates);
    },
    visibleDayNames(): string[] {
      return rotate(-this.firstDayOfWeek)(this.dayNames);
    },
    hasEvents(): boolean {
      return isNonEmpty(this.events);
    },
    eventsInThisMonth(): DateEvent[] {
      return this.events.filter(event => {
        const date = isDate(event) ? event : event.date;
        return date.getFullYear() === this.dateSelectionData.year && date.getMonth() === this.dateSelectionData.month;
      });
    },
    weeksData(): WeekData[] {
      return this.weeksInThisMonth.map((week, weekNumber) => ({
        week,
        weekNumber,
        events: this.getEventsWithinWeek(week)
      }));
    },
    weeksInThisMonth(): Date[][] {
      const startOfMonth = getStartOfMonth(new Date(this.dateSelectionData.year, this.dateSelectionData.month + 1, 0));
      const endOfMonth = getEndOfMonth(startOfMonth);
      const weeks: Date[][] = [];
      let date = startOfMonth;
      while (isOnOrBeforeDate(date, endOfMonth)) {
        weeks.push(getDatesInWeek(date, this.firstDayOfWeek));
        date = addDays(date, 7);
      }
      return weeks;
    }
  },
  methods: {
    updateFocusedDate(date: Option<Date>) {
      this.$emit('new-focus-date', date);
    },
    updateSelectedDate(date: Date) {
      this.$emit('input', date);
    },
    getEventsWithinWeek(dates: Date[]): DateEvent[] {
      return this.eventsInThisMonth.filter(event => {
        const eventDate = isDate(event) ? event : event.date;
        return isWithinWeek(dates[0], eventDate, this.firstDayOfWeek);
      });
    },
    generateTableHeader(): VNode {
      return this.$createElement('thead', { staticClass: 'datepicker-header' }, [
        this.$createElement(
          'tr',
          this.visibleDayNames.map(day => this.$createElement('th', { key: day, staticClass: 'datepicker-cell' }, day))
        )
      ]);
    },
    generateTableBody(): VNode {
      return this.$createElement(
        'tbody',
        {
          staticClass: 'datepicker-body',
          class: { 'has-events': this.hasEvents }
        },
        this.weeksData.map(this.generateTableRow)
      );
    },
    generateTableRow(weekData: WeekData): VNode {
      return this.$createElement(BDatepickerTableRow, {
        key: weekData.weekNumber,
        props: {
          selectedDates: this.selectedDates,
          week: weekData.week,
          weekNumber: weekData.weekNumber,
          month: this.dateSelectionData.month,
          minDate: this.newMinDate,
          maxDate: this.newMaxDate,
          unselectableDates: this.unselectableDates,
          unselectableDaysOfWeek: this.unselectableDaysOfWeek,
          selectableDates: this.newSelectableDates,
          events: weekData.events,
          indicators: this.indicators,
          dateCreator: this.dateCreator,
          focusedDate: this.focusedDate
        },
        on: {
          select: this.updateSelectedDate,
          'new-focus-date': this.updateFocusedDate
        }
      });
    }
  },
  render(): VNode {
    return this.$createElement('table', { staticClass: 'datepicker-table' }, [
      this.generateTableHeader(),
      this.generateTableBody()
    ]);
  }
});
