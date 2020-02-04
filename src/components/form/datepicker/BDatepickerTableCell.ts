import "./datepicker.sass";
import { DateCell, DetailedDateEvent, EventIndicator } from "./shared";
import { addDays, isSameDay } from "./utils";
import {
  isArrowDownEvent,
  isArrowLeftEvent,
  isArrowRightEvent,
  isArrowUpEvent,
  isEnterEvent,
  isSpaceEvent
} from "../../../utils/eventHelpers";
import { exists, none, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import Vue, { PropType, VNode } from "vue";

interface options extends Vue {
  $refs: {
    button: HTMLButtonElement;
  };
}

export default Vue.extend<options>().extend({
  name: "BDatepickerTableCell",
  props: {
    selectedDates: {
      type: Array as PropType<Date[]>,
      required: true
    },
    focusedDate: {
      type: Object as PropType<Option<Date>>,
      required: true
    },
    indicators: {
      type: String as PropType<EventIndicator>,
      required: true
    },
    cell: {
      type: Object as PropType<DateCell>,
      required: true
    }
  },
  computed: {
    isFocused(): boolean {
      return pipe(
        this.focusedDate,
        exists(date => isSameDay(date, this.cell.date))
      );
    }
  },
  watch: {
    isFocused: {
      handler(val: boolean, oldVal: boolean) {
        if (val && !oldVal) {
          this.$nextTick(() => {
            this.$refs.button.focus();
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    onBlur() {
      this.$nextTick(() => {
        if (this.isFocused) {
          this.$emit("new-focus-date", none);
        }
      });
    },
    onFocus() {
      this.$emit("new-focus-date", some(this.cell.date));
    },
    onClick(e: MouseEvent) {
      e.preventDefault();
      this.$emit("select", this.cell.date);
    },
    onKeydown(e: KeyboardEvent) {
      if (isEnterEvent(e) || isSpaceEvent(e)) {
        e.preventDefault();
        this.$emit("select", this.cell.date);
      } else if (isArrowUpEvent(e)) {
        e.preventDefault();
        this.$emit("new-focus-date", some(addDays(this.cell.date, -7)));
      } else if (isArrowRightEvent(e)) {
        e.preventDefault();
        this.$emit("new-focus-date", some(addDays(this.cell.date, 1)));
      } else if (isArrowDownEvent(e)) {
        e.preventDefault();
        this.$emit("new-focus-date", some(addDays(this.cell.date, 7)));
      } else if (isArrowLeftEvent(e)) {
        e.preventDefault();
        this.$emit("new-focus-date", some(addDays(this.cell.date, -1)));
      }
    },
    generateCell(): VNode {
      return this.$createElement("td", [this.generateButton()]);
    },
    generateButton(): VNode {
      return this.$createElement(
        "button",
        {
          ref: "button",
          staticClass: "datepicker-cell width-100-percent",
          class: [this.cell.classes, this.indicators],
          attrs: {
            disabled: this.cell.isDisabled,
            tabindex: this.cell.isDisabled || this.cell.isSelected ? -1 : 0,
            "aria-label": this.cell.ariaLabel
          },
          on: {
            click: this.onClick,
            keydown: this.onKeydown,
            focus: this.onFocus,
            blur: this.onBlur
          }
        },
        this.cell.hasEvents
          ? [`${this.cell.number}`, this.generateEvents(this.cell.events)]
          : [`${this.cell.number}`]
      );
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
    }
  },
  render(): VNode {
    return this.$createElement("td", [this.generateButton()]);
  }
});
