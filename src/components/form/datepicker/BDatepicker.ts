import './datepicker.sass';
import { DateEvent, DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES, EventIndicator } from './shared';
import { addMonths, getEndOfMonth, isDate, isOnOrAfterDate, isOnOrBeforeDate, isSameDay, WeekdayNumber } from './utils';
import BInput from '../input/BInput';
import { isEnterEvent, isEscEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { head, range, snoc, unsafeDeleteAt } from 'fp-ts/lib/Array';
import { constant, constVoid } from 'fp-ts/lib/function';
import { alt, chain, fromNullable, getOrElse, isSome, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { applyMixins, ExtractVue } from '../../../utils/applyMixins';
import BDropdown from '../../dropdown/BDropdown';
import BDatepickerTable from './BDatepickerTable';
import BField from '../field/BField';
import BSelect, { SelectItem } from '../select/BSelect';
import { PropType, VNode } from 'vue';
import { AsyncComponent, Component, PropValidator } from 'vue/types/options';
import { InputMixin } from '../../../mixins/input/InputMixin';
import { alwaysEmptyArray, isMobile, isString } from '../../../utils/helpers';

const defaultDateFormatter = (date: Date | Date[], isMultiple: boolean): string => {
  const targetDates = Array.isArray(date) ? date : [date];
  const dates = targetDates.map(date => {
    const yyyyMMdd = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    const d = new Date(yyyyMMdd);
    return d.toLocaleDateString();
  });
  return !isMultiple ? dates.join(' - ') : dates.join(', ');
};
const defaultDateParser = (date: string) => {
  if (date) {
    const s = date.split('/');
    const year = s[0].length === 4 ? s[0] : s[1];
    const month = s[0].length === 2 ? s[0] : s[1];
    if (year && month) {
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }
  return null;
};

export type DatepickerPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';

export interface BDatepickerIcons {
  next?: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
  previous?: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
  calendar?: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
}

const DEFAULT_DATEPICKER_ICONS: BDatepickerIcons = {
  previous: () => import('../../icons/angleLeft'),
  next: () => import('../../icons/angleRight'),
  calendar: () => import('../../icons/calendar')
};

interface Data {
  selected: Date | Date[] | null;
  focusedDate: Option<Date>;
  dateSelectionData: {
    year: number;
    month: number;
  };
}

const base = applyMixins(InputMixin);

interface options extends ExtractVue<typeof base> {
  $refs: {
    dropdown: ExtractVue<typeof BDropdown>;
    input: ExtractVue<typeof BInput>;
  };
}
export default base.extend<options>().extend({
  name: 'BDatepicker',
  inheritAttrs: false,
  props: {
    value: {
      type: [Date, Array]
    } as PropValidator<Date | Date[]>,
    dayNames: {
      type: Array,
      default: constant(DEFAULT_DAY_NAMES)
    } as PropValidator<string[]>,
    monthNames: {
      type: Array,
      default: constant(DEFAULT_MONTH_NAMES)
    } as PropValidator<string[]>,
    firstDayOfWeek: {
      type: Number as PropType<WeekdayNumber>,
      default: 0
    },
    isInline: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: Date as PropType<Date>
    },
    maxDate: {
      type: Date as PropType<Date>
    },
    initiallyFocusedDate: {
      type: Date as PropType<Date>
    },
    placeholder: String,
    isReadonly: {
      type: Boolean,
      default: false
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
      type: Array as PropType<Date[]>,
      default: alwaysEmptyArray
    },
    selectableDates: {
      type: Array as PropType<Date[]>
    },
    dateFormatter: ({
      type: Function,
      default: defaultDateFormatter
    } as any) as PropValidator<(date: Date | Date[], isMultiple: boolean) => string>,
    dateParser: ({
      type: Function,
      default: defaultDateParser
    } as any) as PropValidator<(str: string) => Date | null>,
    dateCreator: {
      type: Function,
      default: () => {
        return new Date();
      }
    } as PropValidator<() => Date>,
    mobileNative: {
      type: Boolean,
      default: false
    },
    position: {
      type: String as PropType<DatepickerPosition>
    },
    events: {
      type: Array as PropType<DateEvent[]>,
      default: alwaysEmptyArray
    },
    indicators: {
      type: String as PropType<EventIndicator>,
      default: 'bars'
    },
    yearsRange: ({
      type: Array,
      default: () => [-5, 3]
    } as unknown) as PropValidator<[number, number]>,
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    rulesForFirstWeek: {
      type: Number,
      default: 4
    },
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    openOnFocus: {
      type: Boolean,
      default: true
    },
    icons: {
      type: Object as PropType<Partial<BDatepickerIcons>>,
      default: constant(DEFAULT_DATEPICKER_ICONS)
    }
  },
  data(): Data {
    const startDate: Date = pipe(
      fromNullable(this.value),
      chain(val => (Array.isArray(val) ? head(val) : some(val))),
      alt(constant(fromNullable(this.initiallyFocusedDate))),
      getOrElse(this.dateCreator)
    );
    return {
      selected: this.value,
      focusedDate: fromNullable(this.initiallyFocusedDate),
      dateSelectionData: {
        month: startDate.getMonth(),
        year: startDate.getFullYear()
      }
    };
  },
  computed: {
    newIcons(): BDatepickerIcons {
      return { ...DEFAULT_DATEPICKER_ICONS, ...this.icons };
    },
    formattedInternalValue(): string | null {
      return this.formatValue(this.internalValue);
    },
    internalValue: {
      get(): Date | Date[] | null {
        return this.selected;
      },
      set(value: Date | Date[] | null) {
        this.updateInternalState(value);
        if (!this.isMultiple || this.closeOnSelect) {
          this.closeDatepicker();
        }
        if (value) {
          this.$emit('input', this.selected);
        }
      }
    },
    monthItems(): SelectItem<number>[] {
      return this.monthNames.map((month: string, index: number) => ({
        value: index,
        text: month,
        isDisabled: false,
        isSelected: this.dateSelectionData.month === index
      }));
    },
    yearItems(): SelectItem<number>[] {
      return this.listOfYears.map(year => ({
        value: year,
        text: year.toString(),
        isDisabled: false,
        isSelected: this.dateSelectionData.year === year
      }));
    },
    listOfYears(): number[] {
      const currentYear = this.dateCreator().getFullYear();
      return range(this.yearsRange[0], this.yearsRange[1]).map(inc => currentYear + inc);
    },
    endOfPreviousMonth(): Date {
      return getEndOfMonth(addMonths(new Date(this.dateSelectionData.year, this.dateSelectionData.month, 0), -1));
    },
    showPrevious(): boolean {
      return isDate(this.minDate) ? isOnOrAfterDate(this.endOfPreviousMonth, this.minDate) : !this.isDisabled;
    },
    startOfNextMonth(): Date {
      return addMonths(new Date(this.dateSelectionData.year, this.dateSelectionData.month, 0), 1);
    },
    showNext(): boolean {
      return isDate(this.maxDate) ? isOnOrBeforeDate(this.startOfNextMonth, this.maxDate) : !this.isDisabled;
    },
    isMobile(): boolean {
      return this.mobileNative && !!isMobile.any();
    },
    input(): VNode {
      return this.generateInput(!this.isMobile);
    },
    displayNative(): boolean {
      return this.isMobile && !this.isInline;
    }
  },
  watch: {
    value(value) {
      this.updateInternalState(value);
      if (!this.isMultiple) this.closeDatepicker();
      !this.isValid && this.$refs.input.validate();
    },
    focusedDate(date: Option<Date>) {
      if (isSome(date)) {
        this.dateSelectionData = {
          month: date.value.getMonth(),
          year: date.value.getFullYear()
        };
      }
    },
    'dateSelectionData.month'(value) {
      this.$emit('change-month', value);
    },
    'dateSelectionData.year'(value) {
      this.$emit('change-year', value);
    }
  },
  methods: {
    onNewFocusDate(date: Option<Date>) {
      this.focusedDate = date;
      if (isSome(date)) {
        this.dateSelectionData = {
          month: date.value.getMonth(),
          year: date.value.getFullYear()
        };
      }
    },
    /*
     * Parse string into date
     */
    onChange(value: string) {
      const date = this.dateParser(value);
      if (isDate(date)) {
        this.internalValue = date;
      } else {
        this.internalValue = null;
        this.$refs.input.newValue = this.internalValue;
      }
    },
    /*
     * Format date into string
     */
    formatValue(value: Date | Date[] | null): string | null {
      if (Array.isArray(value)) {
        return value.every(isDate) ? this.dateFormatter(value, this.isMultiple) : null;
      } else {
        return isDate(value) ? this.dateFormatter(value, this.isMultiple) : null;
      }
    },
    previousMonth(e?: Event) {
      if (e) {
        e.preventDefault();
      }
      if (!this.isDisabled) {
        if (this.dateSelectionData.month > 0) {
          this.dateSelectionData.month -= 1;
        } else {
          this.dateSelectionData.month = 11;
          this.dateSelectionData.year -= 1;
        }
      }
    },
    nextMonth(e?: Event) {
      if (e) {
        e.preventDefault();
      }
      if (!this.isDisabled) {
        if (this.dateSelectionData.month < 11) {
          this.dateSelectionData.month += 1;
        } else {
          this.dateSelectionData.month = 0;
          this.dateSelectionData.year += 1;
        }
      }
    },
    formatNative(value: Date) {
      return this.formatYYYYMMDD(value);
    },
    /*
     * Format date into string 'YYYY-MM-DD'
     */
    formatYYYYMMDD(value: Date) {
      const date = new Date(value);
      if (value && isDate(date)) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
      }
      return '';
    },
    /*
     * Parse date from string
     */
    onChangeNativePicker(event: any) {
      const date = event.target.value;
      this.internalValue = date ? new Date(date + 'T00:00:00') : null;
    },
    updateInternalState(value: Date | Date[] | null) {
      if (value === null) {
        return;
      } else if (Array.isArray(value)) {
        this.selected = value;
        const currentDate = value.length ? value[0] : this.dateCreator();
        this.dateSelectionData = {
          month: currentDate.getMonth(),
          year: currentDate.getFullYear()
        };
      } else {
        if (this.isMultiple) {
          const existingDates = Array.isArray(this.selected) ? this.selected : [this.selected].filter(isDate);
          const newDates = toggleDate(value, existingDates);
          this.selected = newDates;
          const currentDate = newDates.length ? newDates[0] : this.dateCreator();
          this.dateSelectionData = {
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
          };
        } else {
          this.selected = value;
          this.dateSelectionData = {
            month: value.getMonth(),
            year: value.getFullYear()
          };
        }
      }
    },
    handleOnFocus(event: MouseEvent) {
      this.onFocus(event);
      if (this.openOnFocus && !this.$refs.dropdown.isActive) {
        this.$refs.dropdown.setOn();
      }
    },
    toggle() {
      if (this.mobileNative && this.isMobile) {
        const input = this.$refs.input.$refs.input;
        input.focus();
        input.click();
      } else {
        this.$refs.dropdown.toggle();
      }
    },
    closeDatepicker() {
      this.$refs.dropdown.setOff();
    },
    onInputClick(event: MouseEvent) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    },
    keyPress(event: KeyboardEvent) {
      if (isEscEvent(event)) {
        this.closeDatepicker();
      }
    },
    setYear(val: string | number): void {
      if (isString(val)) {
        const newVal = fromNullable(parseInt(val, 10));
        if (isSome(newVal)) {
          this.dateSelectionData.year = newVal.value;
        }
      } else {
        this.dateSelectionData.year = val;
      }
    },
    setMonth(val: string | number): void {
      if (isString(val)) {
        const newVal = fromNullable(parseInt(val, 10));
        if (isSome(newVal)) {
          this.dateSelectionData.month = newVal.value;
        }
      } else {
        this.dateSelectionData.month = val;
      }
    },
    generateDropdown(): VNode {
      return this.$createElement(
        BDropdown,
        {
          ref: 'dropdown',
          props: {
            position: this.position,
            isDisabled: this.isDisabled,
            isInline: this.isInline
          }
        },
        [this.input, this.generateDatepickerBody()]
      );
    },
    generateInput(isNonMobile: boolean): VNode {
      return this.$createElement(BInput, {
        ref: 'input',
        props: {
          autocomplete: 'off',
          type: isNonMobile ? 'text' : 'date',
          value: this.formattedInternalValue,
          placeholder: this.placeholder,
          size: this.size,
          icon: this.icons.calendar,
          isRounded: this.isRounded,
          isDisabled: this.isDisabled,
          isReadonly: this.isReadonly,
          isLoading: this.isLoading,
          useNativeValidation: this.useNativeValidation
        },
        attrs: isNonMobile
          ? this.$attrs
          : {
              ...this.$attrs,
              max: this.formatNative(this.maxDate),
              min: this.formatNative(this.minDate)
            },
        on: {
          blur: this.onBlur,
          focus: isNonMobile ? this.handleOnFocus : this.onFocus
        },
        nativeOn: {
          click: isNonMobile ? this.onInputClick : constVoid,
          keyup: isNonMobile ? this.keyPress : constVoid,
          change: isNonMobile ? (e: any) => this.onChange(e.target.value) : this.onChangeNativePicker
        },
        ...(isNonMobile ? { slot: 'trigger' } : {})
      });
    },
    generateDatepickerBody(): VNode {
      const nodes = [this.generateHeader(), this.generateCalendar()];
      if (this.$slots.footer) {
        nodes.push(this.generateFooter());
      }
      return this.$createElement('div', { staticClass: 'padding-size-7' }, nodes);
    },
    generateHeader(): VNode {
      return this.$createElement(
        'header',
        { staticClass: 'datepicker-header' },
        this.$scopedSlots.header !== undefined
          ? this.$scopedSlots.header({
              dateSelectionData: this.dateSelectionData,
              months: this.monthItems,
              years: this.yearItems,
              nextMonth: this.nextMonth,
              setMonth: this.setMonth,
              previousMonth: this.previousMonth,
              setYear: this.setYear,
              isDisabled: this.isDisabled
            })
          : [this.generateDefaultHeaderContents()]
      );
    },
    generateDefaultHeaderContents(): VNode {
      return this.$createElement('div', { staticClass: 'pagination field is-centered', class: this.size }, [
        this.generateButton(false),
        this.generateSelects(),
        this.generateButton(true)
      ]);
    },
    generateButton(isNext: boolean): VNode {
      return this.$createElement(
        'button',
        {
          staticClass: isNext ? 'pagination-next datepicker-next' : 'pagination-previous datepicker-previous',
          attrs: {
            disabled: this.isDisabled
          },
          on: {
            click: isNext ? this.nextMonth : this.previousMonth,
            keydown: (e: KeyboardEvent) => {
              if (isEnterEvent(e) || isSpaceEvent(e)) {
                e.preventDefault();
                isNext ? this.nextMonth() : this.previousMonth();
              }
            }
          }
        },
        [
          this.$createElement(isNext ? this.newIcons.next : this.newIcons.previous, {
            props: { variant: 'is-link', isThemeable: false }
          })
        ]
      );
    },
    generateSelects(): VNode {
      return this.$createElement('div', { staticClass: 'pagination-list' }, [
        this.$createElement(BField, [this.generateMonthSelect(), this.generateYearSelect()])
      ]);
    },
    generateMonthSelect(): VNode {
      return this.$createElement(BSelect, {
        props: {
          items: this.monthItems,
          isDisabled: this.isDisabled,
          size: this.size,
          value: this.dateSelectionData.month
        },
        on: {
          input: this.setMonth
        }
      });
    },
    generateYearSelect(): VNode {
      return this.$createElement(BSelect, {
        props: {
          items: this.yearItems,
          value: this.dateSelectionData.year,
          isDisabled: this.isDisabled,
          size: this.size
        },
        on: {
          input: this.setYear
        }
      });
    },
    generateCalendar(): VNode {
      return this.$createElement(
        'section',
        {
          slot: 'default',
          staticClass: 'datepicker-content',
          attrs: {
            'aria-label': 'Datepicker calendar'
          }
        },
        [this.generateDatepickerTable()]
      );
    },
    generateDatepickerTable(): VNode {
      return this.$createElement(BDatepickerTable, {
        props: {
          value: this.internalValue,
          dayNames: this.dayNames,
          monthNames: this.monthNames,
          firstDayOfWeek: this.firstDayOfWeek,
          rulesForFirstWeek: this.rulesForFirstWeek,
          minDate: this.minDate,
          maxDate: this.maxDate,
          dateSelectionData: this.dateSelectionData,
          isDisabled: this.isDisabled,
          unselectableDates: this.unselectableDates,
          unselectableDaysOfWeek: this.unselectableDaysOfWeek,
          selectableDates: this.selectableDates,
          events: this.events,
          indicators: this.indicators,
          dateCreator: this.dateCreator,
          showWeekNumber: this.showWeekNumber,
          isMultiple: this.isMultiple,
          focusedDate: this.focusedDate
        },
        on: {
          close: this.closeDatepicker,
          'new-focus-date': this.onNewFocusDate,
          input: (val: Date | Date[]) => {
            this.internalValue = val;
          }
        }
      });
    },
    generateFooter(): VNode {
      return this.$createElement('footer', { staticClass: 'datepicker-footer' }, this.$slots.footer);
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress);
      this.$once('hook:beforeDestroy', () => document.removeEventListener('keyup', this.keyPress));
    }
  },
  render(): VNode {
    return this.$createElement(
      'article',
      {
        staticClass: 'b-datepicker control',
        class: [this.size, { 'is-expanded': this.isExpanded }]
      },
      [this.displayNative ? this.input : this.generateDropdown()]
    );
  }
});

function toggleDate(date: Date, dates: Date[]): Date[] {
  const index = dates.findIndex(d => isSameDay(date, d));
  return index === -1 ? snoc(dates, date) : unsafeDeleteAt(index, dates);
}
