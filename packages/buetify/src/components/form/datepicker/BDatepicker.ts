import './datepicker.sass';
import { IO } from 'fp-ts/es6/IO';
import { useDisable, UseDisablePropsDefinition } from '../../../composables/disable';
import { useEqRef } from '../../../composables/eqRef';
import { useFieldData } from '../../../composables/fieldData';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { Toggle } from '../../../composables/toggle';
import {
  DateEvent,
  DateSelectionData,
  DEFAULT_DAY_NAMES,
  DEFAULT_MONTH_NAMES,
  EventIndicator,
  MonthNumber
} from './shared';
import { addDays, eqSerialDate, isDate, WeekdayNumber } from './utils';
import { BInput } from '../input/BInput';
import {
  isArrowDownEvent,
  isArrowLeftEvent,
  isArrowRightEvent,
  isArrowUpEvent,
  isEnterEvent,
  isEscEvent,
  isSpaceEvent
} from '../../../utils/eventHelpers';
import { head, isNonEmpty, range } from 'fp-ts/lib/Array';
import { constant, FunctionN } from 'fp-ts/lib/function';
import { alt, fromNullable, getEq, getOrElse, isNone, isSome, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import BDropdown, { BDropdownPropsDefinition } from '../../dropdown/BDropdown';
import BDatepickerTable from './BDatepickerTable';
import BField from '../field/BField';
import { BSelect, SelectItem } from '../select/BSelect';
import {
  nextTick,
  computed,
  onUnmounted,
  onMounted,
  PropType,
  VNode,
  defineAsyncComponent,
  defineComponent,
  h,
  Component,
  ExtractPropTypes,
  shallowRef,
  SetupContext,
  Ref,
  watch
} from 'vue';
import { constEmptyArray, isString, toggleListItem } from '../../../utils/helpers';

type Dropdown = InstanceType<typeof BDropdown>;

export type DatepickerPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';

export interface DatepickerIcons {
  next: Component;
  previous: Component;
  calendar: Component;
}

const DEFAULT_DATEPICKER_ICONS: DatepickerIcons = {
  previous: defineAsyncComponent(() => import('../../icons/angleLeft')),
  next: defineAsyncComponent(() => import('../../icons/angleRight')),
  calendar: defineAsyncComponent(() => import('../../icons/calendar'))
};

export function getDatepickerIcons(icons: Partial<DatepickerIcons>): DatepickerIcons {
  return {
    ...DEFAULT_DATEPICKER_ICONS,
    ...icons
  };
}

const BDatepickerPropsDefinition = {
  ...BDropdownPropsDefinition,
  ...UseDisablePropsDefinition,
  ...getUseInputPropsDefinition<Date | Date[]>(),
  modelValue: {
    type: [Array, Date] as PropType<Date | Date[]>,
    default: constEmptyArray
  },
  'onUpdate:modelValue': {
    type: Function as PropType<FunctionN<[Date | Date[]], void>>,
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
  },
  isMultiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  placeholder: {
    type: String as PropType<string>
  },
  useMobileNative: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<DatepickerPosition>
  },
  indicators: {
    type: String as PropType<EventIndicator>,
    default: 'bars' as const
  },
  yearsRange: {
    type: (Array as unknown) as PropType<[number, number]>,
    default: constant([-5, 3] as const)
  },
  closeOnSelect: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  openOnFocus: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  icons: {
    type: Object as PropType<DatepickerIcons>,
    default: constant(DEFAULT_DATEPICKER_ICONS)
  }
};

export type BDatepickerProps = ExtractPropTypes<typeof BDatepickerPropsDefinition>;

function useNative(props: BDatepickerProps) {
  return props.useMobileNative && !props.isInline;
}

const useFormattedDate = Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).format;

function useFormattedModelValue(modelValue: Date | Date[]) {
  return Array.isArray(modelValue) ? modelValue.map(useFormattedDate).join(', ') : useFormattedDate(modelValue);
}

function parseInputString(str: string): Date[] {
  const splits = str.split(',').map(s => s.trim());
  return splits.map(s => new Date(s)).filter(d => isDate(d) && !isNaN(d.getTime()));
}

function generateInput(props: BDatepickerProps, context: SetupContext, data: BDatepickerData, toggle?: Toggle): VNode {
  const isMobile = useNative(props);
  return h(BInput, {
    max: props.maxDate ? useFormattedDate(props.maxDate) : null,
    min: props.minDate ? useFormattedDate(props.minDate) : null,
    autocomplete: 'off',
    type: isMobile ? 'date' : 'text',
    modelValue: useFormattedModelValue(data.modelValue.value),
    'onUpdate:modelValue': (val: string) => {
      data.modelValue.value = parseInputString(val);
    },
    placeholder: props.placeholder,
    size: props.size,
    icon: props.icons.calendar,
    isRounded: props.isRounded,
    isDisabled: props.isDisabled,
    isReadonly: props.isReadonly,
    isLoading: props.isLoading,
    useNativeValidation: props.useNativeValidation,
    onFocus: () => {
      if (!isMobile && props.openOnFocus && toggle) {
        nextTick(() => {
          if (toggle.isOff.value) {
            toggle.setOff();
          }
        });
      }
    }
  });
}

function generateButton(props: BDatepickerProps, data: BDatepickerData, isNext: boolean): VNode {
  return h(
    'button',
    {
      class: isNext ? 'pagination-next datepicker-next' : 'pagination-previous datepicker-previous',
      disabled: data.isDisabled,
      onClick: isNext ? data.nextMonth : data.previousMonth,
      onKeydown: (e: KeyboardEvent) => {
        if (isEnterEvent(e) || isSpaceEvent(e)) {
          e.preventDefault();
          isNext ? data.nextMonth() : data.previousMonth();
        }
      }
    },
    [
      h(isNext ? props.icons.next : (props.icons.previous as any), {
        variant: 'is-link',
        isThemeable: false
      })
    ]
  );
}

function generateYearSelect(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h(BSelect, {
    items: data.years,
    modelValue: data.dateSelectionData.year,
    isDisabled: data.isDisabled,
    size: props.size,
    'onUpdate:modelValue': data.setYear
  });
}

function generateMonthSelect(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h(BSelect, {
    items: data.months,
    isDisabled: data.isDisabled,
    size: props.size,
    modelValue: data.dateSelectionData.month,
    'onUpdate:modelValue': data.setMonth
  });
}

function generateSelects(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h('div', { class: 'pagination-list' }, [
    h(BField, { isGrouped: true, isHorizontal: true, hasAddons: true, class: 'is-marginless' }, () => [
      generateMonthSelect(props, data),
      generateYearSelect(props, data)
    ])
  ]);
}

function generateDefaultHeaderContents(props: BDatepickerProps, data: BDatepickerData): VNode {
  return h('div', { class: ['pagination field is-centered', props.size] }, [
    generateButton(props, data, false),
    generateSelects(props, data),
    generateButton(props, data, true)
  ]);
}

function generateHeader(props: BDatepickerProps, context: SetupContext, data: BDatepickerData): VNode {
  return h(
    'header',
    { class: 'datepicker-header' },
    context.slots.header ? context.slots.header(data) : [generateDefaultHeaderContents(props, data)]
  );
}

function generateDatepickerTable(props: BDatepickerProps, context: SetupContext, data: BDatepickerData): VNode {
  return h(BDatepickerTable, {
    modelValue: data.modelValue.value,
    'onUpdate:modelValue': (val: Date | Date[]) => {
      data.modelValue.value = val;
    },
    focusedDate: data.focusedDate.value,
    'onUpdate:focusedDate': (val: Option<Date>) => {
      data.focusedDate.value = val;
    },
    dayNames: props.dayNames,
    monthNames: props.monthNames,
    firstDayOfWeek: props.firstDayOfWeek,
    minDate: props.minDate,
    maxDate: props.maxDate,
    dateSelectionData: data.dateSelectionData,
    isDisabled: data.isDisabled,
    unselectableDates: props.unselectableDates,
    unselectableDaysOfWeek: props.unselectableDaysOfWeek,
    selectableDates: props.selectableDates,
    events: props.events,
    indicators: props.indicators,
    showWeekNumber: props.showWeekNumber
  });
}

function generateFooter(context: SetupContext): VNode {
  return h('footer', { class: 'datepicker-footer' }, context.slots.footer && context.slots.footer());
}

function generateCalendar(props: BDatepickerProps, context: SetupContext, data: BDatepickerData): VNode {
  return h(
    'section',
    {
      class: 'datepicker-content',
      'aria-label': 'Datepicker calendar'
    },
    [generateDatepickerTable(props, context, data)]
  );
}

function generateDatepickerBody(props: BDatepickerProps, context: SetupContext, data: BDatepickerData): VNode {
  const nodes = [generateHeader(props, context, data), generateCalendar(props, context, data)];
  if (context.slots.footer) {
    nodes.push(generateFooter(context));
  }
  return h('div', nodes);
}

function generateDropdown(
  props: BDatepickerProps,
  context: SetupContext,
  data: BDatepickerData,
  dropdown: Ref<Dropdown | null>
): VNode {
  return h(
    BDropdown,
    {
      ref: dropdown,
      position: props.position,
      isDisabled: props.isDisabled,
      isInline: props.isInline
    },
    {
      trigger: (toggle: Toggle) => {
        return generateInput(props, context, data, toggle);
      },
      default: () => generateDatepickerBody(props, context, data)
    }
  );
}

interface BDatepickerData {
  dateSelectionData: DateSelectionData;
  nextMonth: IO<void>;
  previousMonth: IO<void>;
  setYear: FunctionN<[string | number], void>;
  setMonth: FunctionN<[string | number], void>;
  months: SelectItem<number>[];
  years: SelectItem<number>[];
  isDisabled: boolean;
  focusedDate: Ref<Option<Date>>;
  modelValue: Ref<Date | Date[]>;
}

function getMonths(props: BDatepickerProps, dateSelectionData: DateSelectionData): SelectItem<number>[] {
  return props.monthNames.map((month: string, index: number) => ({
    value: index,
    text: month,
    isDisabled: false,
    isSelected: dateSelectionData.month === index
  }));
}

function getYears(props: BDatepickerProps, dateSelectionData: DateSelectionData): SelectItem<number>[] {
  const currentYear = new Date().getFullYear();
  return range(props.yearsRange[0], props.yearsRange[1])
    .map(inc => currentYear + inc)
    .map(year => ({
      value: year,
      text: year.toString(),
      isDisabled: false,
      isSelected: dateSelectionData.year === year
    }));
}

function getDateSelectionData(date: Date): DateSelectionData {
  return {
    month: date.getMonth() as MonthNumber,
    year: date.getFullYear()
  };
}

function getSetPreviousMonth(props: BDatepickerProps, dateSelectionData: Ref<DateSelectionData>) {
  return (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (!props.isDisabled) {
      if (dateSelectionData.value.month > 0) {
        dateSelectionData.value = {
          month: (dateSelectionData.value.month - 1) as MonthNumber,
          year: dateSelectionData.value.year
        };
      } else {
        dateSelectionData.value = {
          month: 11,
          year: dateSelectionData.value.year - 1
        };
      }
    }
  };
}

function getSetNextMonth(props: BDatepickerProps, dateSelectionData: Ref<DateSelectionData>) {
  return (e?: Event) => {
    if (e) {
      e.preventDefault();
    }
    if (!props.isDisabled) {
      if (dateSelectionData.value.month < 11) {
        dateSelectionData.value = {
          month: (dateSelectionData.value.month + 1) as MonthNumber,
          year: dateSelectionData.value.year
        };
      } else {
        dateSelectionData.value = {
          month: 0,
          year: dateSelectionData.value.year + 1
        };
      }
    }
  };
}

function getSetMonth(dateSelectionData: Ref<DateSelectionData>) {
  return (month: number | string) => {
    if (isString(month)) {
      const newVal = fromNullable(parseInt(month, 10));
      if (isSome(newVal)) {
        dateSelectionData.value = {
          month: newVal.value as MonthNumber,
          year: dateSelectionData.value.year
        };
      }
    } else {
      dateSelectionData.value = {
        month: month as MonthNumber,
        year: dateSelectionData.value.year
      };
    }
  };
}

function getSetYear(dateSelectionData: Ref<DateSelectionData>) {
  return (year: number | string) => {
    if (isString(year)) {
      const newVal = fromNullable(parseInt(year, 10));
      if (isSome(newVal)) {
        dateSelectionData.value = {
          month: dateSelectionData.value.month,
          year: newVal.value
        };
      }
    } else {
      dateSelectionData.value = {
        month: dateSelectionData.value.month,
        year
      };
    }
  };
}

const toggleSerialDate = toggleListItem(eqSerialDate);

export default defineComponent({
  name: 'b-datepicker',
  props: BDatepickerPropsDefinition,
  setup(props, context) {
    const fieldData = useFieldData();
    const isDisabled = useDisable(props);

    const dropdown: Ref<null | Dropdown> = shallowRef(null);

    const internalValue = shallowRef(props.modelValue);

    watch(
      () => props.modelValue,
      newVal => {
        internalValue.value = newVal;
      }
    );

    const modelValue = computed({
      get() {
        return internalValue.value;
      },
      set(val: Date | Date[]) {
        if ((Array.isArray(val) && props.isMultiple) || isDate(val)) {
          props['onUpdate:modelValue'](val);
          internalValue.value = val;
        } else if (props.isMultiple && isDate(val)) {
          const newVal = toggleSerialDate(
            val,
            Array.isArray(internalValue.value) ? internalValue.value : [internalValue.value]
          );
          props['onUpdate:modelValue'](newVal);
          internalValue.value = newVal;
        } else if (Array.isArray(val) && isNonEmpty(val)) {
          props['onUpdate:modelValue'](val[0]);
          internalValue.value = val[0];
        }
        dropdown.value && dropdown.value.toggle.setOff();
      }
    });

    const focusedDate = useEqRef(getEq(eqSerialDate))(
      pipe(
        Array.isArray(props.modelValue) ? head(props.modelValue) : some(props.modelValue),
        alt(() => some(new Date()))
      )
    );

    const dateSelectionData = shallowRef(
      getDateSelectionData(
        pipe(
          focusedDate.value,
          getOrElse(() => new Date())
        )
      )
    );

    const nextMonth = getSetNextMonth(props, dateSelectionData);
    const previousMonth = getSetPreviousMonth(props, dateSelectionData);
    const setMonth = getSetMonth(dateSelectionData);
    const setYear = getSetYear(dateSelectionData);

    function onKeydown(e: KeyboardEvent) {
      if (isEscEvent(e)) {
        dropdown.value && dropdown.value.toggle.setOff();
        return;
      }
      const fd = focusedDate.value;
      if (isNone(fd)) {
        return;
      }
      if (isEnterEvent(e) || isSpaceEvent(e)) {
        e.preventDefault();
        modelValue.value = fd.value;
      } else if (isArrowUpEvent(e)) {
        e.preventDefault();
        focusedDate.value = some(addDays(fd.value, -7));
      } else if (isArrowRightEvent(e)) {
        e.preventDefault();
        focusedDate.value = some(addDays(fd.value, 1));
      } else if (isArrowDownEvent(e)) {
        e.preventDefault();
        focusedDate.value = some(addDays(fd.value, 7));
      } else if (isArrowLeftEvent(e)) {
        e.preventDefault();
        focusedDate.value = some(addDays(fd.value, -1));
      }
    }

    onMounted(() => {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', onKeydown);
      }
    });

    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', onKeydown);
      }
    });

    watch(
      () => focusedDate.value,
      newVal => {
        if (
          isSome(newVal) &&
          (newVal.value.getMonth() !== dateSelectionData.value.month ||
            newVal.value.getFullYear() !== dateSelectionData.value.year)
        ) {
          dateSelectionData.value = getDateSelectionData(newVal.value);
        }
      }
    );

    watch(dateSelectionData, newVal => {
      const fd = focusedDate.value;
      if (isNone(fd) || fd.value.getMonth() !== newVal.month || fd.value.getFullYear() !== newVal.year) {
        focusedDate.value = some(new Date(newVal.year, newVal.month));
      }
    });

    return () => {
      const data: BDatepickerData = {
        modelValue,
        isDisabled: isDisabled.value,
        focusedDate: focusedDate,
        dateSelectionData: dateSelectionData.value,
        nextMonth,
        previousMonth,
        setMonth,
        setYear,
        months: getMonths(props, dateSelectionData.value),
        years: getYears(props, dateSelectionData.value)
      };
      return h(
        'article',
        {
          class: [
            'b-datepicker control',
            props.size,
            { 'is-expanded': props.isExpanded || fieldData.attrs.isExpanded.value }
          ]
        },
        [useNative(props) ? generateInput(props, context, data) : generateDropdown(props, context, data, dropdown)]
      );
    };
  }
});
