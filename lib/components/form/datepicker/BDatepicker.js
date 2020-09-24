import "../../../../src/components/form/datepicker/datepicker.sass";
import { useDisable, UseDisablePropsDefinition } from '../../../composables/disable';
import { useFieldData } from '../../../composables/fieldData';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { useModel } from '../../../composables/model';
import { isDate, serialDateOrd } from './utils';
import { BInput } from '../input/BInput';
import { isEnterEvent, isEscEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { head, range } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { alt, chain, fromNullable, getOrElse, isSome, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import BDropdown, { BDropdownPropsDefinition } from '../../dropdown/BDropdown';
import BDatepickerTable, { BDatepickerTablePropsDefinition } from './BDatepickerTable';
import BField from '../field/BField';
import { BSelect } from '../select/BSelect';
import { onUnmounted, onMounted, defineAsyncComponent, defineComponent, h, shallowRef, shallowReactive, watch } from 'vue';
import { isString, toggleListItem } from '../../../utils/helpers';

function defaultDateFormatter(date, isMultiple) {
  const targetDates = Array.isArray(date) ? date : [date];
  const dates = targetDates.map(date => {
    const yyyyMMdd = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    const d = new Date(yyyyMMdd);
    return d.toLocaleDateString();
  });
  return !isMultiple ? dates.join(' - ') : dates.join(', ');
}

function defaultDateParser(date) {
  if (date) {
    const s = date.split('/');
    const year = s[0].length === 4 ? s[0] : s[1];
    const month = s[0].length === 2 ? s[0] : s[1];

    if (year && month) {
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1, 0, 0, 0, 0);
    }
  }

  return null;
}

const DEFAULT_DATEPICKER_ICONS = {
  previous: defineAsyncComponent(() => import('../../icons/angleLeft')),
  next: defineAsyncComponent(() => import('../../icons/angleRight')),
  calendar: defineAsyncComponent(() => import('../../icons/calendar'))
};
export function getDatepickerIcons(icons) {
  return Object.assign(Object.assign({}, DEFAULT_DATEPICKER_ICONS), icons);
}
const BDatepickerPropsDefinition = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, BDropdownPropsDefinition), BDatepickerTablePropsDefinition), UseDisablePropsDefinition), getUseInputPropsDefinition()), {
  placeholder: {
    type: String
  },
  initiallyFocusedDate: {
    type: Date,
    default: () => new Date()
  },
  dateFormatter: {
    type: Function,
    default: constant(defaultDateFormatter)
  },
  dateParser: {
    type: Function,
    default: constant(defaultDateParser)
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
  isMultiple: {
    type: Boolean,
    default: false
  },
  openOnFocus: {
    type: Boolean,
    default: true
  },
  icons: {
    type: Object,
    default: constant(DEFAULT_DATEPICKER_ICONS)
  }
});

function useNative(props) {
  return props.useMobileNative && !props.isInline;
}

function formatDateInput(props, value) {
  if (Array.isArray(value)) {
    return value.every(isDate) ? props.dateFormatter(value, props.isMultiple) : null;
  } else {
    return isDate(value) ? props.dateFormatter(value, props.isMultiple) : null;
  }
}

function formatYYYYMMDD(value) {
  const date = new Date(value);

  if (value && isDate(date)) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
  }

  return '';
}

function getUpdateValue(props, model, dateSelectionData) {
  return value => {
    if (value === null || value === undefined) {
      return;
    } else if (Array.isArray(value)) {
      model.modelValue.value = value;
      const currentDate = value.length ? value[0] : props.dateCreator();
      dateSelectionData.value = {
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
      };
    } else {
      if (props.isMultiple) {
        const currentValue = model.modelValue.value;
        const existingDates = Array.isArray(currentValue) ? currentValue : [currentValue].filter(isDate);
        const newDates = toggleDate(value, existingDates);
        model.modelValue.value = newDates;
        const currentDate = newDates.length ? newDates[0] : props.dateCreator();
        dateSelectionData.value = {
          month: currentDate.getMonth(),
          year: currentDate.getFullYear()
        };
      } else {
        model.modelValue.value = value;
        dateSelectionData.value = {
          month: value.getMonth(),
          year: value.getFullYear()
        };
      }
    }
  };
}

function getOnNativeInput(updateValue) {
  return function onNativeInput(event) {
    const value = event.target.value;
    const date = new Date(value + 'T00:00:00');
    updateValue(isDate(date) ? date : null);
  };
}

function getOnInput(props, updateValue) {
  return function onInput(value) {
    const date = props.dateParser(value);

    if (isDate(date)) {
      updateValue(date);
    } else {
      updateValue(null);
    }
  };
}

function generateInput(props, context, model, dropdownProps) {
  const isMobile = useNative(props);
  return h(BInput, Object.assign(Object.assign(Object.assign({}, isMobile ? context.attrs : Object.assign(Object.assign({}, context.attrs), {
    max: formatYYYYMMDD(props.maxDate),
    min: formatYYYYMMDD(props.minDate)
  })), {
    autocomplete: 'off',
    type: isMobile ? 'date' : 'text',
    value: formatDateInput(props, model.modelValue.value),
    placeholder: props.placeholder,
    size: props.size,
    icon: props.icons.calendar,
    isRounded: props.isRounded,
    isDisabled: props.isDisabled,
    isReadonly: props.isReadonly,
    isLoading: props.isLoading,
    useNativeValidation: props.useNativeValidation,
    onFocus: () => {
      if (!isMobile && props.openOnFocus) {
        dropdownProps.open();
      }
    }
  }), isMobile ? {
    onChange: dropdownProps.onNativeInput
  } : {
    onKeyup: e => {
      if (isEscEvent(e)) {
        dropdownProps.close();
      }
    },
    onInput: dropdownProps.onInput
  }));
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
    props: {
      variant: 'is-link',
      isThemeable: false
    }
  })]);
}

function generateYearSelect(props, data) {
  return h(BSelect, {
    items: data.years,
    value: data.dateSelectionData.year,
    isDisabled: data.isDisabled,
    size: props.size,
    onInput: data.setYear
  });
}

function generateMonthSelect(props, data) {
  return h(BSelect, {
    items: data.months,
    isDisabled: data.isDisabled,
    size: props.size,
    value: data.dateSelectionData.month,
    onInput: data.setMonth
  });
}

function generateSelects(props, data) {
  return h('div', {
    class: 'pagination-list'
  }, [h(BField, [generateMonthSelect(props, data), generateYearSelect(props, data)])]);
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

function generateDatepickerTable(props, context, model, data) {
  return h(BDatepickerTable, {
    value: model.modelValue.value,
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
    dateCreator: props.dateCreator,
    showWeekNumber: props.showWeekNumber,
    isMultiple: props.isMultiple,
    focusedDate: data.focusedDate,
    onInput: model.set,
    onFocus: data.setFocusedDate
  });
}

function generateFooter(context) {
  return h('footer', {
    class: 'datepicker-footer'
  }, context.slots.footer());
}

function generateCalendar(props, context, model, data) {
  return h('section', {
    class: 'datepicker-content',
    'aria-label': 'Datepicker calendar'
  }, [generateDatepickerTable(props, context, model, data)]);
}

function generateDatepickerBody(props, context, model, data) {
  const nodes = [generateHeader(props, context, data), generateCalendar(props, context, model, data)];

  if (context.slots.footer) {
    nodes.push(generateFooter(context));
  }

  return h('div', nodes);
}

function generateDropdown(props, context, model, data) {
  return h(BDropdown, Object.assign(Object.assign({}, data.toggleProps), {
    position: props.position,
    isDisabled: props.isDisabled,
    isInline: props.isInline,
    slots: {
      trigger: () => generateInput(props, context, model, data),
      default: () => generateDatepickerBody(props, context, model, data)
    }
  }));
}

const toggleDate = toggleListItem(serialDateOrd);

function getMonths(props, dateSelectionData) {
  return props.monthNames.map((month, index) => ({
    value: index,
    text: month,
    isDisabled: false,
    isSelected: dateSelectionData.month === index
  }));
}

function getYears(props, dateSelectionData) {
  const currentYear = props.dateCreator().getFullYear();
  return range(props.yearsRange[0], props.yearsRange[1]).map(inc => currentYear + inc).map(year => ({
    value: year,
    text: year.toString(),
    isDisabled: false,
    isSelected: dateSelectionData.year === year
  }));
}

function getStartDate(props) {
  return pipe(fromNullable(props.value), chain(val => Array.isArray(val) ? head(val) : some(val)), alt(constant(fromNullable(props.initiallyFocusedDate))), getOrElse(props.dateCreator));
}

function getDateSelectionData(date) {
  return {
    month: date.getMonth(),
    year: date.getFullYear()
  };
}

function getInitialDateSelectionData(props) {
  return getDateSelectionData(getStartDate(props));
}

function getSetPreviousMonth(props, dateSelectionData) {
  return e => {
    if (e) {
      e.preventDefault();
    }

    if (!props.isDisabled) {
      if (dateSelectionData.value.month > 0) {
        dateSelectionData.value = {
          month: dateSelectionData.value.month - 1,
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

function getSetNextMonth(props, dateSelectionData) {
  return e => {
    if (e) {
      e.preventDefault();
    }

    if (!props.isDisabled) {
      if (dateSelectionData.value.month < 11) {
        dateSelectionData.value = {
          month: dateSelectionData.value.month + 1,
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

function getSetMonth(dateSelectionData) {
  return month => {
    if (isString(month)) {
      const newVal = fromNullable(parseInt(month, 10));

      if (isSome(newVal)) {
        dateSelectionData.value = {
          month: newVal.value,
          year: dateSelectionData.value.year
        };
      }
    } else {
      dateSelectionData.value = {
        month: month,
        year: dateSelectionData.value.year
      };
    }
  };
}

function getSetYear(dateSelectionData) {
  return year => {
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

function getSetFocusedDate(focusedDate) {
  return date => {
    focusedDate.value = date;
  };
}

export default defineComponent({
  name: 'b-datepicker',
  props: BDatepickerPropsDefinition,

  setup(props, context) {
    const fieldData = useFieldData();
    const isDisabled = useDisable(props);
    const model = useModel(props);
    const toggleProps = shallowReactive({
      isExpanded: false,
      hasPopup: true
    });

    const open = () => {
      toggleProps.isExpanded = false;
    };

    const close = () => {
      toggleProps.isExpanded = true;
    };

    const focusedDate = shallowRef(fromNullable(props.initiallyFocusedDate));
    const dateSelectionData = shallowRef(getInitialDateSelectionData(props));
    const updateValue = getUpdateValue(props, model, dateSelectionData);
    const onInput = getOnInput(props, updateValue);
    const onNativeInput = getOnNativeInput(updateValue);
    const setFocusedDate = getSetFocusedDate(focusedDate);
    const nextMonth = getSetNextMonth(props, dateSelectionData);
    const previousMonth = getSetPreviousMonth(props, dateSelectionData);
    const setMonth = getSetMonth(dateSelectionData);
    const setYear = getSetYear(dateSelectionData);

    function onEscape(e) {
      if (isEscEvent(e)) {
        close();
      }
    }

    onMounted(() => {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', onEscape);
      }
    });
    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', onEscape);
      }
    });
    watch(focusedDate, newVal => {
      if (isSome(newVal.value)) {
        dateSelectionData.value = getDateSelectionData(newVal.value.value);
      }
    });
    return () => {
      const data = {
        toggleProps,
        isDisabled: isDisabled.value,
        open,
        close,
        focusedDate: focusedDate.value,
        onInput,
        onNativeInput,
        dateSelectionData: dateSelectionData.value,
        setFocusedDate,
        nextMonth,
        previousMonth,
        setMonth,
        setYear,
        months: getMonths(props, dateSelectionData.value),
        years: getYears(props, dateSelectionData.value)
      };
      return h('article', {
        class: ['b-datepicker control', props.size, {
          'is-expanded': props.isExpanded || fieldData.attrs.isExpanded.value
        }]
      }, [useNative(props) ? generateInput(props, context, model, data) : generateDropdown(props, context, model, data)]);
    };
  }

});
//# sourceMappingURL=BDatepicker.js.map