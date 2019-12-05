import "../../../../src/components/pagination/pagination.sass";
import "../../../../src/components/dropdown/dropdown.sass";
import "../../../../src/components/form/datepicker/datepicker.sass";
import { useDisable, UseDisablePropsDefinition } from '../../../composables/disable';
import { useEqRef } from '../../../composables/eqRef';
import { useFieldData } from '../../../composables/fieldData';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { useProxy } from '../../../composables/proxy/useProxy';
import { DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import { addDays, eqSerialDate, isDate } from './utils';
import { BInput } from '../input/BInput';
import { isArrowDownEvent, isArrowLeftEvent, isArrowRightEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { head, isNonEmpty, range } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { alt, chain, fromNullable, getEq, isNone, isSome, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import BDropdown, { BDropdownPropsDefinition } from '../../dropdown/BDropdown';
import BDatepickerTable from './BDatepickerTable';
import BField from '../field/BField';
import { BSelect } from '../select/BSelect';
import { computed, onUnmounted, onMounted, defineAsyncComponent, defineComponent, h, shallowRef, watch, toRef } from 'vue';
import { constEmptyArray, isString, toggleListItem } from '../../../utils/helpers';
const DEFAULT_DATEPICKER_ICONS = {
  previous: defineAsyncComponent(() => import('../../icons/angleLeft')),
  next: defineAsyncComponent(() => import('../../icons/angleRight')),
  calendar: defineAsyncComponent(() => import('../../icons/calendar'))
};
export function getDatepickerIcons(icons) {
  return { ...DEFAULT_DATEPICKER_ICONS,
    ...icons
  };
}
const BDatepickerPropsDefinition = { ...BDropdownPropsDefinition,
  ...UseDisablePropsDefinition,
  ...getUseInputPropsDefinition(),
  modelValue: {
    type: [Array, Date]
  },
  'onUpdate:modelValue': {
    type: Function,
    required: true
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  'onUpdate:year': {
    type: Function,
    required: false
  },
  month: {
    type: Number,
    default: new Date().getMonth()
  },
  'onUpdate:month': {
    type: Function,
    required: false
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
  },
  isMultiple: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String
  },
  useMobileNative: {
    type: Boolean,
    default: false
  },
  position: {
    type: String
  },
  indicators: {
    type: String,
    default: 'bars'
  },
  yearsRange: {
    type: Array,
    default: constant([-5, 3])
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  },
  isReadonly: {
    type: Boolean,
    default: true
  },
  useNativeValidation: {
    type: Boolean,
    default: false
  },
  // openOnFocus: {
  //   type: Boolean as PropType<boolean>,
  //   default: true
  // },
  icons: {
    type: Object,
    default: constant(DEFAULT_DATEPICKER_ICONS)
  }
};

function useNative(props) {
  return props.useMobileNative && !props.isInline;
}

const useFormattedDate = Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}).format;

function useFormattedModelValue(modelValue) {
  return Array.isArray(modelValue) ? modelValue.map(useFormattedDate).join(', ') : modelValue ? useFormattedDate(modelValue) : null;
}

function parseInputString(str) {
  const splits = str.split(',').map(s => s.trim());
  return splits.map(s => new Date(s)).filter(d => isDate(d) && !isNaN(d.getTime()));
}

function generateInput(props, context, data, toggle) {
  const isMobile = useNative(props);
  return h(BInput, {
    max: props.maxDate ? useFormattedDate(props.maxDate) : null,
    min: props.minDate ? useFormattedDate(props.minDate) : null,
    autocomplete: 'off',
    type: isMobile ? 'date' : 'text',
    modelValue: useFormattedModelValue(data.modelValue.value),
    'onUpdate:modelValue': val => {
      data.modelValue.value = parseInputString(val);
    },
    placeholder: props.placeholder,
    size: props.size,
    icon: props.icons.calendar,
    isRounded: props.isRounded,
    isDisabled: props.isDisabled,
    isReadonly: props.isReadonly,
    isLoading: props.isLoading,
    useNativeValidation: props.useNativeValidation // onFocus: () => {
    //   if (!isMobile && props.openOnFocus && toggle) {
    //     if (toggle.isOff.value) {
    //       console.log('focus-set-on')
    //       toggle.setOn();
    //       Date.now()
    //     }
    //   }
    // }

  });
}

function generateButton(props, data, isNext) {
  return h('button', {
    class: isNext ? 'pagination-next datepicker-next' : 'pagination-previous datepicker-previous',
    disabled: data.isDisabled,
    onClick: isNext ? data.nextMonth : data.previousMonth,
    onKeydown: e => {
      if (isEnterEvent(e) || isSpaceEvent(e)) {
        e.preventDefault();
        isNext ? data.nextMonth() : data.previousMonth();
      }
    }
  }, [h(isNext ? props.icons.next : props.icons.previous, {
    variant: 'is-link',
    isThemeable: false
  })]);
}

function generateYearSelect(props, data) {
  return h(BSelect, {
    items: data.years,
    modelValue: data.year.value,
    isDisabled: data.isDisabled,
    size: props.size,
    'onUpdate:modelValue': data.setYear
  });
}

function generateMonthSelect(props, data) {
  return h(BSelect, {
    items: data.months,
    isDisabled: data.isDisabled,
    size: props.size,
    modelValue: data.month.value,
    'onUpdate:modelValue': data.setMonth
  });
}

function generateSelects(props, data) {
  return h('div', {
    class: 'pagination-list'
  }, [h(BField, {
    class: 'is-marginless'
  }, () => [generateMonthSelect(props, data), generateYearSelect(props, data)])]);
}

function generateDefaultHeaderContents(props, data) {
  return h('div', {
    class: ['pagination field is-centered', props.size]
  }, [generateButton(props, data, false), generateSelects(props, data), generateButton(props, data, true)]);
}

function generateHeader(props, context, data) {
  return h('header', {
    class: 'datepicker-header'
  }, context.slots.header ? context.slots.header(data) : [generateDefaultHeaderContents(props, data)]);
}

function generateDatepickerTable(props, context, data) {
  return h(BDatepickerTable, {
    modelValue: data.modelValue.value,
    'onUpdate:modelValue': val => {
      data.modelValue.value = val;
    },
    focusedDate: data.focusedDate.value,
    'onUpdate:focusedDate': val => {
      data.focusedDate.value = val;
    },
    dayNames: props.dayNames,
    monthNames: props.monthNames,
    firstDayOfWeek: props.firstDayOfWeek,
    minDate: props.minDate,
    maxDate: props.maxDate,
    month: data.month.value,
    year: data.year.value,
    isDisabled: data.isDisabled,
    unselectableDates: props.unselectableDates,
    unselectableDaysOfWeek: props.unselectableDaysOfWeek,
    selectableDates: props.selectableDates,
    events: props.events,
    indicators: props.indicators,
    showWeekNumber: props.showWeekNumber
  });
}

function generateFooter(context) {
  return h('footer', {
    class: 'datepicker-footer'
  }, context.slots.footer && context.slots.footer());
}

function generateCalendar(props, context, data) {
  return h('section', {
    class: 'datepicker-content',
    'aria-label': 'Datepicker calendar'
  }, [generateDatepickerTable(props, context, data)]);
}

function generateDatepickerBody(props, context, data) {
  const nodes = [generateHeader(props, context, data), generateCalendar(props, context, data)];

  if (context.slots.footer) {
    nodes.push(generateFooter(context));
  }

  return h('div', nodes);
}

function generateDropdown(props, context, data, dropdown) {
  return h(BDropdown, {
    ref: dropdown,
    position: props.position,
    isDisabled: props.isDisabled,
    isInline: props.isInline
  }, {
    trigger: toggle => {
      return generateInput(props, context, data, toggle);
    },
    default: () => generateDatepickerBody(props, context, data)
  });
}

function getMonths(props, focusedMonth) {
  return props.monthNames.map((month, index) => ({
    value: index,
    text: month,
    isDisabled: false,
    isSelected: focusedMonth === index
  }));
}

function getYears(props, focusedYear) {
  const currentYear = new Date().getFullYear();
  return range(props.yearsRange[0], props.yearsRange[1]).map(inc => currentYear + inc).map(year => ({
    value: year,
    text: year.toString(),
    isDisabled: false,
    isSelected: focusedYear === year
  }));
}

function getSetPreviousMonth(props, month, year) {
  return e => {
    if (e) {
      e.preventDefault();
    }

    if (!props.isDisabled) {
      if (month.value > 0) {
        month.value = month.value - 1;
      } else {
        month.value = 11;
        year.value = year.value - 1;
      }
    }
  };
}

function getSetNextMonth(props, month, year) {
  return e => {
    if (e) {
      e.preventDefault();
    }

    if (!props.isDisabled) {
      const mv = month.value;

      if (mv < 11) {
        month.value = mv + 1;
      } else {
        month.value = 0;
        year.value = year.value + 1;
      }
    }
  };
}

function getSetMonth(monthRef) {
  return month => {
    if (isString(month)) {
      const newVal = fromNullable(parseInt(month, 10));

      if (isSome(newVal)) {
        monthRef.value = newVal.value;
      }
    } else {
      monthRef.value = month;
    }
  };
}

function getSetYear(yearRef) {
  return year => {
    if (isString(year)) {
      const newVal = fromNullable(parseInt(year, 10));

      if (isSome(newVal)) {
        yearRef.value = newVal.value;
      }
    } else {
      yearRef.value = year;
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
    const dropdown = shallowRef(null);
    const internalValue = shallowRef(props.modelValue);
    watch(() => props.modelValue, newVal => {
      internalValue.value = newVal;
    });
    const modelValue = computed({
      get() {
        return internalValue.value;
      },

      set(val) {
        if (!val) {
          return;
        }

        if (Array.isArray(val) && props.isMultiple || isDate(val)) {
          props['onUpdate:modelValue'](val);
          internalValue.value = val;
        } else if (props.isMultiple && isDate(val)) {
          const newVal = toggleSerialDate(val, internalValue.value == undefined ? [] : Array.isArray(internalValue.value) ? internalValue.value : [internalValue.value]);
          props['onUpdate:modelValue'](newVal);
          internalValue.value = newVal;
        } else if (Array.isArray(val) && isNonEmpty(val)) {
          props['onUpdate:modelValue'](val[0]);
          internalValue.value = val[0];
        }

        if (props.closeOnSelect) {
          dropdown.value && dropdown.value.toggle.setOff();
        }
      }

    });
    const focusedDate = useEqRef(getEq(eqSerialDate))(pipe(fromNullable(props.modelValue), chain(v => Array.isArray(v) ? head(v) : some(v)), alt(() => some(new Date()))));
    const {
      value: month
    } = useProxy(toRef(props, 'month'), toRef(props, 'onUpdate:month'));
    const {
      value: year
    } = useProxy(toRef(props, 'year'), toRef(props, 'onUpdate:year'));
    const nextMonth = getSetNextMonth(props, month, year);
    const previousMonth = getSetPreviousMonth(props, month, year);
    const setMonth = getSetMonth(month);
    const setYear = getSetYear(year);

    function onKeydown(e) {
      if (dropdown.value === undefined || dropdown.value?.$el === undefined || !dropdown.value.$el.contains(e.target)) {
        return;
      }

      if (isEscEvent(e)) {
        dropdown.value && dropdown.value.toggle.setOff();
        return;
      }

      const fd = pipe(focusedDate.value, alt(() => pipe(fromNullable(modelValue.value), chain(v => Array.isArray(v) ? head(v) : some(v)))));

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
    watch(focusedDate, fd => {
      const m = month.value;
      const y = year.value;

      if (isSome(fd)) {
        const fdValue = fd.value;
        const nMonth = fdValue.getMonth();

        if (nMonth !== m) {
          month.value = nMonth;
        }

        const nYear = fdValue.getFullYear();

        if (nYear !== y) {
          year.value = nYear;
        }
      }
    }, {
      immediate: true
    });
    return () => {
      const data = {
        modelValue,
        month,
        year,
        isDisabled: isDisabled.value,
        focusedDate: focusedDate,
        nextMonth,
        previousMonth,
        setMonth,
        setYear,
        months: getMonths(props, month.value),
        years: getYears(props, year.value)
      };
      return h('article', {
        class: ['b-datepicker control', props.size, {
          'is-expanded': props.isExpanded || fieldData.attrs.isExpanded.value
        }]
      }, [useNative(props) ? generateInput(props, context, data) : generateDropdown(props, context, data, dropdown)]);
    };
  }

});
//# sourceMappingURL=BDatepicker.js.map