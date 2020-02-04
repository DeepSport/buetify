import "./datepicker.sass";
import BDatepickerTableCell from "./BDatepickerTableCell";
import { DateCell, DateEvent, DetailedDateEvent } from "./shared";
import {
  elemSerialDate,
  isAfterDay,
  isDate,
  isOnOrAfterDate,
  isOnOrBeforeDate,
  isSameDay
} from "./utils";
import { alwaysEmptyArray, alwaysNone } from "../../../utils/helpers";
import { isNonEmpty } from "fp-ts/lib/Array";
import { constFalse, constTrue, identity } from "fp-ts/lib/function";
import { fold, isSome, none, Option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import Vue, { PropType, VNode } from "vue";
import { PropValidator } from "vue/types/options";

interface options extends Vue {
  $refs: {
    date: HTMLButtonElement;
  };
}

export default Vue.extend<options>().extend({
  name: "BDatepickerTableRow",
  props: {
    selectedDates: {
      type: Array as PropType<Date[]>,
      required: true
    },
    focusedDate: {
      type: Object as PropType<Option<Date>>,
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
      type: Array as PropType<Date[]>,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    minDate: {
      type: Object as PropType<Option<Date>>,
      required: true
    },
    maxDate: {
      type: Object as PropType<Option<Date>>,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
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
      type: String as PropType<"dots" | "bars">,
      required: true
    },
    dateCreator: {
      type: Function,
      default: () => {
        return new Date();
      }
    } as PropValidator<() => Date>
  },
  computed: {
    formattedEvents(): DetailedDateEvent[] {
      return this.events.map(event =>
        isDate(event) ? { date: event, variant: "is-primary" } : event
      );
    },
    cells(): readonly DateCell[] {
      return Object.freeze(
        this.week.map(date => {
          const events = this.getDateEvents(date);
          const hasEvents = isNonEmpty(events);
          return {
            date,
            events,
            hasEvents,
            isSelected: this.isSelectedDate(date),
            isDisabled: this.isDisabled || !this.isSelectableDate(date),
            number: date.getDate(),
            ariaLabel: date.toLocaleDateString(),
            classes: this.getDateClasses(date, hasEvents)
          };
        })
      );
    },
    listeners(): { [key: string]: Function | Function[] } {
      return {
        ...this.$listeners,
        "new-focus-date": this.onNewFocusDate,
        select: this.onSelect
      };
    }
  },
  methods: {
    isSelectableDate(date: Date): boolean {
      return [
        this.isAfterMinDate(date),
        this.isBeforeMaxDate(date),
        this.isWithinMonth(date),
        this.isEnabled(date),
        this.isOnSelectableDayOfWeek(date)
      ].every(identity);
    },
    isAfterMinDate(date: Date): boolean {
      return pipe(
        this.minDate,
        fold(constTrue, d => isOnOrAfterDate(date, d))
      );
    },
    isBeforeMaxDate(date: Date): boolean {
      return pipe(
        this.minDate,
        fold(constTrue, d => isOnOrBeforeDate(date, d))
      );
    },
    onNewFocusDate(date: Option<Date>): void {
      if (
        isSome(date) &&
        this.isAfterMinDate(date.value) &&
        this.isBeforeMaxDate(date.value)
      ) {
        this.$emit("new-focus-date", date);
      } else {
        this.$emit("new-focus-date", none);
      }
    },
    isWithinMonth(date: Date): boolean {
      return date.getMonth() === this.month;
    },
    isEnabled(date: Date): boolean {
      return (
        !elemSerialDate(date, this.unselectableDates) &&
        pipe(
          this.selectableDates,
          fold(constTrue, dates => elemSerialDate(date, dates))
        )
      );
    },
    isSelectedDate(date: Date): boolean {
      return this.selectedDates.some(selectedDate =>
        isSameDay(date, selectedDate)
      );
    },
    isOnSelectableDayOfWeek(date: Date): boolean {
      return !this.unselectableDaysOfWeek.includes(date.getDay());
    },
    onSelect(date: Date): void {
      if (!this.isDisabled && this.isSelectableDate(date)) {
        this.$emit("select", date);
      }
    },
    getDateEvents(date: Date): DetailedDateEvent[] {
      return this.formattedEvents.filter(event => isSameDay(date, event.date));
    },
    getDateClasses(
      date: Date | undefined | null,
      hasEvents: boolean = false
    ): object {
      if (isDate(date)) {
        const isSelectable = this.isSelectableDate(date);
        return {
          "is-selected": this.isSelectedDate(date),
          "is-today": isSameDay(date, this.dateCreator()),
          "is-selectable": isSelectable && !this.isDisabled,
          "is-unselectable": !isSelectable || this.isDisabled,
          "has-event": hasEvents
        };
      } else {
        return {};
      }
    },
    generateCell(cell: DateCell): VNode {
      return this.$createElement(BDatepickerTableCell, {
        key: cell.date.toLocaleDateString(),
        props: {
          cell,
          selectedDates: this.selectedDates,
          focusedDate: this.focusedDate,
          indicators: this.indicators
        },
        on: this.listeners
      });
    },
    generateEvents(events: DetailedDateEvent[]): VNode {
      return this.$createElement(
        "div",
        { staticClass: "events" },
        events.map((event, index) =>
          this.$createElement("div", {
            key: index,
            staticClass: "event",
            class: event.variant
          })
        )
      );
    },
    generateWeekNumber(): VNode {
      return this.$createElement("td", [`${this.weekNumber}`]);
    }
  },
  render(): VNode {
    return this.$createElement(
      "tr",
      { staticClass: "datepicker-row" },
      this.showWeekNumber
        ? [this.generateWeekNumber(), ...this.cells.map(this.generateCell)]
        : this.cells.map(this.generateCell)
    );
  }
});
