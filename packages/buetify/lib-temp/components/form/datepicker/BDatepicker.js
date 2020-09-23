import './datepicker.sass';
import { useDisable, UseDisablePropsDefinition } from '../../../composables/disable';
import { useEqRef } from '../../../composables/eqRef';
import { useFieldData } from '../../../composables/fieldData';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { DEFAULT_DAY_NAMES, DEFAULT_MONTH_NAMES } from './shared';
import { addDays, eqSerialDate, isDate } from './utils';
import { BInput } from '../input/BInput';
import { isArrowDownEvent, isArrowLeftEvent, isArrowRightEvent, isArrowUpEvent, isEnterEvent, isEscEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { head, isNonEmpty, range } from 'fp-ts/lib/Array';
import { constant } from 'fp-ts/lib/function';
import { alt, fromNullable, getEq, getOrElse, isNone, isSome, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import BDropdown, { BDropdownPropsDefinition } from '../../dropdown/BDropdown';
import BDatepickerTable from './BDatepickerTable';
import BField from '../field/BField';
import { BSelect } from '../select/BSelect';
import { nextTick, computed, onUnmounted, onMounted, defineAsyncComponent, defineComponent, h, shallowRef, watch } from 'vue';
import { constEmptyArray, isString, toggleListItem } from '../../../utils/helpers';
const DEFAULT_DATEPICKER_ICONS = {
    previous: defineAsyncComponent(() => import('../../icons/angleLeft')),
    next: defineAsyncComponent(() => import('../../icons/angleRight')),
    calendar: defineAsyncComponent(() => import('../../icons/calendar'))
};
export function getDatepickerIcons(icons) {
    return {
        ...DEFAULT_DATEPICKER_ICONS,
        ...icons
    };
}
const BDatepickerPropsDefinition = {
    ...BDropdownPropsDefinition,
    ...UseDisablePropsDefinition,
    ...getUseInputPropsDefinition(),
    modelValue: {
        type: [Array, Date],
        default: constEmptyArray
    },
    'onUpdate:modelValue': {
        type: Function,
        required: true
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
    openOnFocus: {
        type: Boolean,
        default: true
    },
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
    return Array.isArray(modelValue) ? modelValue.map(useFormattedDate).join(', ') : useFormattedDate(modelValue);
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
        'onUpdate:modelValue': (val) => {
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
function generateButton(props, data, isNext) {
    return h('button', {
        class: isNext ? 'pagination-next datepicker-next' : 'pagination-previous datepicker-previous',
        disabled: data.isDisabled,
        onClick: isNext ? data.nextMonth : data.previousMonth,
        onKeydown: (e) => {
            if (isEnterEvent(e) || isSpaceEvent(e)) {
                e.preventDefault();
                isNext ? data.nextMonth() : data.previousMonth();
            }
        }
    }, [
        h(isNext ? props.icons.next : props.icons.previous, {
            variant: 'is-link',
            isThemeable: false
        })
    ]);
}
function generateYearSelect(props, data) {
    return h(BSelect, {
        items: data.years,
        modelValue: data.dateSelectionData.year,
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
        modelValue: data.dateSelectionData.month,
        'onUpdate:modelValue': data.setMonth
    });
}
function generateSelects(props, data) {
    return h('div', { class: 'pagination-list' }, [
        h(BField, { isGrouped: true, isHorizontal: true, hasAddons: true, class: 'is-marginless' }, () => [
            generateMonthSelect(props, data),
            generateYearSelect(props, data)
        ])
    ]);
}
function generateDefaultHeaderContents(props, data) {
    return h('div', { class: ['pagination field is-centered', props.size] }, [
        generateButton(props, data, false),
        generateSelects(props, data),
        generateButton(props, data, true)
    ]);
}
function generateHeader(props, context, data) {
    return h('header', { class: 'datepicker-header' }, context.slots.header ? context.slots.header(data) : [generateDefaultHeaderContents(props, data)]);
}
function generateDatepickerTable(props, context, data) {
    return h(BDatepickerTable, {
        modelValue: data.modelValue.value,
        'onUpdate:modelValue': (val) => {
            data.modelValue.value = val;
        },
        focusedDate: data.focusedDate.value,
        'onUpdate:focusedDate': (val) => {
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
function generateFooter(context) {
    return h('footer', { class: 'datepicker-footer' }, context.slots.footer && context.slots.footer());
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
        trigger: (toggle) => {
            return generateInput(props, context, data, toggle);
        },
        default: () => generateDatepickerBody(props, context, data)
    });
}
function getMonths(props, dateSelectionData) {
    return props.monthNames.map((month, index) => ({
        value: index,
        text: month,
        isDisabled: false,
        isSelected: dateSelectionData.month === index
    }));
}
function getYears(props, dateSelectionData) {
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
function getDateSelectionData(date) {
    return {
        month: date.getMonth(),
        year: date.getFullYear()
    };
}
function getSetPreviousMonth(props, dateSelectionData) {
    return (e) => {
        if (e) {
            e.preventDefault();
        }
        if (!props.isDisabled) {
            if (dateSelectionData.value.month > 0) {
                dateSelectionData.value = {
                    month: (dateSelectionData.value.month - 1),
                    year: dateSelectionData.value.year
                };
            }
            else {
                dateSelectionData.value = {
                    month: 11,
                    year: dateSelectionData.value.year - 1
                };
            }
        }
    };
}
function getSetNextMonth(props, dateSelectionData) {
    return (e) => {
        if (e) {
            e.preventDefault();
        }
        if (!props.isDisabled) {
            if (dateSelectionData.value.month < 11) {
                dateSelectionData.value = {
                    month: (dateSelectionData.value.month + 1),
                    year: dateSelectionData.value.year
                };
            }
            else {
                dateSelectionData.value = {
                    month: 0,
                    year: dateSelectionData.value.year + 1
                };
            }
        }
    };
}
function getSetMonth(dateSelectionData) {
    return (month) => {
        if (isString(month)) {
            const newVal = fromNullable(parseInt(month, 10));
            if (isSome(newVal)) {
                dateSelectionData.value = {
                    month: newVal.value,
                    year: dateSelectionData.value.year
                };
            }
        }
        else {
            dateSelectionData.value = {
                month: month,
                year: dateSelectionData.value.year
            };
        }
    };
}
function getSetYear(dateSelectionData) {
    return (year) => {
        if (isString(year)) {
            const newVal = fromNullable(parseInt(year, 10));
            if (isSome(newVal)) {
                dateSelectionData.value = {
                    month: dateSelectionData.value.month,
                    year: newVal.value
                };
            }
        }
        else {
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
                if ((Array.isArray(val) && props.isMultiple) || isDate(val)) {
                    props['onUpdate:modelValue'](val);
                    internalValue.value = val;
                }
                else if (props.isMultiple && isDate(val)) {
                    const newVal = toggleSerialDate(val, Array.isArray(internalValue.value) ? internalValue.value : [internalValue.value]);
                    props['onUpdate:modelValue'](newVal);
                    internalValue.value = newVal;
                }
                else if (Array.isArray(val) && isNonEmpty(val)) {
                    props['onUpdate:modelValue'](val[0]);
                    internalValue.value = val[0];
                }
                dropdown.value && dropdown.value.toggle.setOff();
            }
        });
        const focusedDate = useEqRef(getEq(eqSerialDate))(pipe(Array.isArray(props.modelValue) ? head(props.modelValue) : some(props.modelValue), alt(() => some(new Date()))));
        const dateSelectionData = shallowRef(getDateSelectionData(pipe(focusedDate.value, getOrElse(() => new Date()))));
        const nextMonth = getSetNextMonth(props, dateSelectionData);
        const previousMonth = getSetPreviousMonth(props, dateSelectionData);
        const setMonth = getSetMonth(dateSelectionData);
        const setYear = getSetYear(dateSelectionData);
        function onKeydown(e) {
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
            }
            else if (isArrowUpEvent(e)) {
                e.preventDefault();
                focusedDate.value = some(addDays(fd.value, -7));
            }
            else if (isArrowRightEvent(e)) {
                e.preventDefault();
                focusedDate.value = some(addDays(fd.value, 1));
            }
            else if (isArrowDownEvent(e)) {
                e.preventDefault();
                focusedDate.value = some(addDays(fd.value, 7));
            }
            else if (isArrowLeftEvent(e)) {
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
        watch(() => focusedDate.value, newVal => {
            if (isSome(newVal) &&
                (newVal.value.getMonth() !== dateSelectionData.value.month ||
                    newVal.value.getFullYear() !== dateSelectionData.value.year)) {
                dateSelectionData.value = getDateSelectionData(newVal.value);
            }
        });
        watch(dateSelectionData, newVal => {
            const fd = focusedDate.value;
            if (isNone(fd) || fd.value.getMonth() !== newVal.month || fd.value.getFullYear() !== newVal.year) {
                focusedDate.value = some(new Date(newVal.year, newVal.month));
            }
        });
        return () => {
            const data = {
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
            return h('article', {
                class: [
                    'b-datepicker control',
                    props.size,
                    { 'is-expanded': props.isExpanded || fieldData.attrs.isExpanded.value }
                ]
            }, [useNative(props) ? generateInput(props, context, data) : generateDropdown(props, context, data, dropdown)]);
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQkRhdGVwaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9mb3JtL2RhdGVwaWNrZXIvQkRhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsVUFBVSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUVqRixPQUFPLEVBR0wsaUJBQWlCLEVBQ2pCLG1CQUFtQixFQUdwQixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sU0FBUyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNiLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBYSxNQUFNLG9CQUFvQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBVSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxTQUFTLEVB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RTtvQkFDTCxzQkFBc0I7b0JBQ3RCLEtBQUssQ0FBQyxJQUFJO29CQUNWLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO2lCQUN4RTthQUNGLEVBQ0QsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUM1RyxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9kYXRlcGlja2VyLnNhc3MnO1xuaW1wb3J0IHsgSU8gfSBmcm9tICdmcC10cy9lczYvSU8nO1xuaW1wb3J0IHsgdXNlRGlzYWJsZSwgVXNlRGlzYWJsZVByb3BzRGVmaW5pdGlvbiB9IGZyb20gJy4uLy4uLy4uL2NvbXBvc2FibGVzL2Rpc2FibGUnO1xuaW1wb3J0IHsgdXNlRXFSZWYgfSBmcm9tICcuLi8uLi8uLi9jb21wb3NhYmxlcy9lcVJlZic7XG5pbXBvcnQgeyB1c2VGaWVsZERhdGEgfSBmcm9tICcuLi8uLi8uLi9jb21wb3NhYmxlcy9maWVsZERhdGEnO1xuaW1wb3J0IHsgZ2V0VXNlSW5wdXRQcm9wc0RlZmluaXRpb24gfSBmcm9tICcuLi8uLi8uLi9jb21wb3NhYmxlcy9pbnB1dC91c2VJbnB1dCc7XG5pbXBvcnQgeyBUb2dnbGUgfSBmcm9tICcuLi8uLi8uLi9jb21wb3NhYmxlcy90b2dnbGUnO1xuaW1wb3J0IHtcbiAgRGF0ZUV2ZW50LFxuICBEYXRlU2VsZWN0aW9uRGF0YSxcbiAgREVGQVVMVF9EQVlfTkFNRVMsXG4gIERFRkFVTFRfTU9OVEhfTkFNRVMsXG4gIEV2ZW50SW5kaWNhdG9yLFxuICBNb250aE51bWJlclxufSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBhZGREYXlzLCBlcVNlcmlhbERhdGUsIGlzRGF0ZSwgV2Vla2RheU51bWJlciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgQklucHV0IH0gZnJvbSAnLi4vaW5wdXQvQklucHV0JztcbmltcG9ydCB7XG4gIGlzQXJyb3dEb3duRXZlbnQsXG4gIGlzQXJyb3dMZWZ0RXZlbnQsXG4gIGlzQXJyb3dSaWdodEV2ZW50LFxuICBpc0Fycm93VXBFdmVudCxcbiAgaXNFbnRlckV2ZW50LFxuICBpc0VzY0V2ZW50LFxuICBpc1NwYWNlRXZlbnRcbn0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZXZlbnRIZWxwZXJzJztcbmltcG9ydCB7IGhlYWQsIGlzTm9uRW1wdHksIHJhbmdlIH0gZnJvbSAnZnAtdHMvbGliL0FycmF5JztcbmltcG9ydCB7IGNvbnN0YW50LCBGdW5jdGlvbk4gfSBmcm9tICdmcC10cy9saWIvZnVuY3Rpb24nO1xuaW1wb3J0IHsgYWx0LCBmcm9tTnVsbGFibGUsIGdldEVxLCBnZXRPckVsc2UsIGlzTm9uZSwgaXNTb21lLCBPcHRpb24sIHNvbWUgfSBmcm9tICdmcC10cy9saWIvT3B0aW9uJztcbmltcG9ydCB7IHBpcGUgfSBmcm9tICdmcC10cy9saWIvcGlwZWFibGUnO1xuaW1wb3J0IEJEcm9wZG93biwgeyBCRHJvcGRvd25Qcm9wc0RlZmluaXRpb24gfSBmcm9tICcuLi8uLi9kcm9wZG93bi9CRHJvcGRvd24nO1xuaW1wb3J0IEJEYXRlcGlja2VyVGFibGUgZnJvbSAnLi9CRGF0ZXBpY2tlclRhYmxlJztcbmltcG9ydCBCRmllbGQgZnJvbSAnLi4vZmllbGQvQkZpZWxkJztcbmltcG9ydCB7IEJTZWxlY3QsIFNlbGVjdEl0ZW0gfSBmcm9tICcuLi9zZWxlY3QvQlNlbGVjdCc7XG5pbXBvcnQge1xuICBuZXh0VGljayxcbiAgY29tcHV0ZWQsXG4gIG9uVW5tb3VudGVkLFxuICBvbk1vdW50ZWQsXG4gIFByb3BUeXBlLFxuICBWTm9kZSxcbiAgZGVmaW5lQXN5bmNDb21wb25lbnQsXG4gIGRlZmluZUNvbXBvbmVudCxcbiAgaCxcbiAgQ29tcG9uZW50LFxuICBFeHRyYWN0UHJvcFR5cGVzLFxuICBzaGFsbG93UmVmLFxuICBTZXR1cENvbnRleHQsXG4gIFJlZixcbiAgd2F0Y2hcbn0gZnJvbSAndnVlJztcbmltcG9ydCB7IGNvbnN0RW1wdHlBcnJheSwgaXNTdHJpbmcsIHRvZ2dsZUxpc3RJdGVtIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaGVscGVycyc7XG5cbnR5cGUgRHJvcGRvd24gPSBJbnN0YW5jZVR5cGU8dHlwZW9mIEJEcm9wZG93bj47XG5cbmV4cG9ydCB0eXBlIERhdGVwaWNrZXJQb3NpdGlvbiA9ICdpcy10b3AtcmlnaHQnIHwgJ2lzLXRvcC1sZWZ0JyB8ICdpcy1ib3R0b20tbGVmdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZXBpY2tlckljb25zIHtcbiAgbmV4dDogQ29tcG9uZW50O1xuICBwcmV2aW91czogQ29tcG9uZW50O1xuICBjYWxlbmRhcjogQ29tcG9uZW50O1xufVxuXG5jb25zdCBERUZBVUxUX0RBVEVQSUNLRVJfSUNPTlM6IERhdGVwaWNrZXJJY29ucyA9IHtcbiAgcHJldmlvdXM6IGRlZmluZUFzeW5jQ29tcG9uZW50KCgpID0+IGltcG9ydCgnLi4vLi4vaWNvbnMvYW5nbGVMZWZ0JykpLFxuICBuZXh0OiBkZWZpbmVBc3luY0NvbXBvbmVudCgoKSA9PiBpbXBvcnQoJy4uLy4uL2ljb25zL2FuZ2xlUmlnaHQnKSksXG4gIGNhbGVuZGFyOiBkZWZpbmVBc3luY0NvbXBvbmVudCgoKSA9PiBpbXBvcnQoJy4uLy4uL2ljb25zL2NhbGVuZGFyJykpXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0ZXBpY2tlckljb25zKGljb25zOiBQYXJ0aWFsPERhdGVwaWNrZXJJY29ucz4pOiBEYXRlcGlja2VySWNvbnMge1xuICByZXR1cm4ge1xuICAgIC4uLkRFRkFVTFRfREFURVBJQ0tFUl9JQ09OUyxcbiAgICAuLi5pY29uc1xuICB9O1xufVxuXG5jb25zdCBCRGF0ZXBpY2tlclByb3BzRGVmaW5pdGlvbiA9IHtcbiAgLi4uQkRyb3Bkb3duUHJvcHNEZWZpbml0aW9uLFxuICAuLi5Vc2VEaXNhYmxlUHJvcHNEZWZpbml0aW9uLFxuICAuLi5nZXRVc2VJbnB1dFByb3BzRGVmaW5pdGlvbjxEYXRlIHwgRGF0ZVtdPigpLFxuICBtb2RlbFZhbHVlOiB7XG4gICAgdHlwZTogW0FycmF5LCBEYXRlXSBhcyBQcm9wVHlwZTxEYXRlIHwgRGF0ZVtdPixcbiAgICBkZWZhdWx0OiBjb25zdEVtcHR5QXJyYXlcbiAgfSxcbiAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiB7XG4gICAgdHlwZTogRnVuY3Rpb24gYXMgUHJvcFR5cGU8RnVuY3Rpb25OPFtEYXRlIHwgRGF0ZVtdXSwgdm9pZD4+LFxuICAgIHJlcXVpcmVkOiB0cnVlIGFzIGNvbnN0XG4gIH0sXG4gIGRheU5hbWVzOiB7XG4gICAgdHlwZTogQXJyYXkgYXMgUHJvcFR5cGU8c3RyaW5nW10+LFxuICAgIGRlZmF1bHQ6IGNvbnN0YW50KERFRkFVTFRfREFZX05BTUVTKVxuICB9LFxuICBtb250aE5hbWVzOiB7XG4gICAgdHlwZTogQXJyYXkgYXMgUHJvcFR5cGU8c3RyaW5nW10+LFxuICAgIGRlZmF1bHQ6IGNvbnN0YW50KERFRkFVTFRfTU9OVEhfTkFNRVMpXG4gIH0sXG4gIGZpcnN0RGF5T2ZXZWVrOiB7XG4gICAgdHlwZTogTnVtYmVyIGFzIFByb3BUeXBlPFdlZWtkYXlOdW1iZXI+LFxuICAgIGRlZmF1bHQ6IDAgYXMgY29uc3RcbiAgfSxcbiAgZXZlbnRzOiB7XG4gICAgdHlwZTogQXJyYXkgYXMgUHJvcFR5cGU8RGF0ZUV2ZW50W10+LFxuICAgIGRlZmF1bHQ6IGNvbnN0RW1wdHlBcnJheVxuICB9LFxuICBtaW5EYXRlOiB7XG4gICAgdHlwZTogRGF0ZSBhcyBQcm9wVHlwZTxEYXRlPixcbiAgICByZXF1aXJlZDogZmFsc2VcbiAgfSxcbiAgbWF4RGF0ZToge1xuICAgIHR5cGU6IERhdGUgYXMgUHJvcFR5cGU8RGF0ZT4sXG4gICAgcmVxdWlyZWQ6IGZhbHNlXG4gIH0sXG4gIGlzRGlzYWJsZWQ6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIHVuc2VsZWN0YWJsZURhdGVzOiB7XG4gICAgdHlwZTogQXJyYXkgYXMgUHJvcFR5cGU8RGF0ZVtdPixcbiAgICBkZWZhdWx0OiBjb25zdEVtcHR5QXJyYXlcbiAgfSxcbiAgdW5zZWxlY3RhYmxlRGF5c09mV2Vlazoge1xuICAgIHR5cGU6IEFycmF5IGFzIFByb3BUeXBlPG51bWJlcltdPixcbiAgICBkZWZhdWx0OiBjb25zdEVtcHR5QXJyYXlcbiAgfSxcbiAgc2VsZWN0YWJsZURhdGVzOiB7XG4gICAgdHlwZTogT2JqZWN0IGFzIFByb3BUeXBlPERhdGVbXT5cbiAgfSxcbiAgc2hvd1dlZWtOdW1iZXI6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IGZhbHNlIGFzIGNvbnN0XG4gIH0sXG4gIGlzTXVsdGlwbGU6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIHBsYWNlaG9sZGVyOiB7XG4gICAgdHlwZTogU3RyaW5nIGFzIFByb3BUeXBlPHN0cmluZz5cbiAgfSxcbiAgdXNlTW9iaWxlTmF0aXZlOiB7XG4gICAgdHlwZTogQm9vbGVhbiBhcyBQcm9wVHlwZTxib29sZWFuPixcbiAgICBkZWZhdWx0OiBmYWxzZVxuICB9LFxuICBwb3NpdGlvbjoge1xuICAgIHR5cGU6IFN0cmluZyBhcyBQcm9wVHlwZTxEYXRlcGlja2VyUG9zaXRpb24+XG4gIH0sXG4gIGluZGljYXRvcnM6IHtcbiAgICB0eXBlOiBTdHJpbmcgYXMgUHJvcFR5cGU8RXZlbnRJbmRpY2F0b3I+LFxuICAgIGRlZmF1bHQ6ICdiYXJzJyBhcyBjb25zdFxuICB9LFxuICB5ZWFyc1JhbmdlOiB7XG4gICAgdHlwZTogKEFycmF5IGFzIHVua25vd24pIGFzIFByb3BUeXBlPFtudW1iZXIsIG51bWJlcl0+LFxuICAgIGRlZmF1bHQ6IGNvbnN0YW50KFstNSwgM10gYXMgY29uc3QpXG4gIH0sXG4gIGNsb3NlT25TZWxlY3Q6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgb3Blbk9uRm9jdXM6IHtcbiAgICB0eXBlOiBCb29sZWFuIGFzIFByb3BUeXBlPGJvb2xlYW4+LFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgaWNvbnM6IHtcbiAgICB0eXBlOiBPYmplY3QgYXMgUHJvcFR5cGU8RGF0ZXBpY2tlckljb25zPixcbiAgICBkZWZhdWx0OiBjb25zdGFudChERUZBVUxUX0RBVEVQSUNLRVJfSUNPTlMpXG4gIH1cbn07XG5cbmV4cG9ydCB0eXBlIEJEYXRlcGlja2VyUHJvcHMgPSBFeHRyYWN0UHJvcFR5cGVzPHR5cGVvZiBCRGF0ZXBpY2tlclByb3BzRGVmaW5pdGlvbj47XG5cbmZ1bmN0aW9uIHVzZU5hdGl2ZShwcm9wczogQkRhdGVwaWNrZXJQcm9wcykge1xuICByZXR1cm4gcHJvcHMudXNlTW9iaWxlTmF0aXZlICYmICFwcm9wcy5pc0lubGluZTtcbn1cblxuY29uc3QgdXNlRm9ybWF0dGVkRGF0ZSA9IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2RlZmF1bHQnLCB7XG4gIHllYXI6ICdudW1lcmljJyxcbiAgbW9udGg6ICdudW1lcmljJyxcbiAgZGF5OiAnbnVtZXJpYydcbn0pLmZvcm1hdDtcblxuZnVuY3Rpb24gdXNlRm9ybWF0dGVkTW9kZWxWYWx1ZShtb2RlbFZhbHVlOiBEYXRlIHwgRGF0ZVtdKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG1vZGVsVmFsdWUpID8gbW9kZWxWYWx1ZS5tYXAodXNlRm9ybWF0dGVkRGF0ZSkuam9pbignLCAnKSA6IHVzZUZvcm1hdHRlZERhdGUobW9kZWxWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSW5wdXRTdHJpbmcoc3RyOiBzdHJpbmcpOiBEYXRlW10ge1xuICBjb25zdCBzcGxpdHMgPSBzdHIuc3BsaXQoJywnKS5tYXAocyA9PiBzLnRyaW0oKSk7XG4gIHJldHVybiBzcGxpdHMubWFwKHMgPT4gbmV3IERhdGUocykpLmZpbHRlcihkID0+IGlzRGF0ZShkKSAmJiAhaXNOYU4oZC5nZXRUaW1lKCkpKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVJbnB1dChwcm9wczogQkRhdGVwaWNrZXJQcm9wcywgY29udGV4dDogU2V0dXBDb250ZXh0LCBkYXRhOiBCRGF0ZXBpY2tlckRhdGEsIHRvZ2dsZT86IFRvZ2dsZSk6IFZOb2RlIHtcbiAgY29uc3QgaXNNb2JpbGUgPSB1c2VOYXRpdmUocHJvcHMpO1xuICByZXR1cm4gaChCSW5wdXQsIHtcbiAgICBtYXg6IHByb3BzLm1heERhdGUgPyB1c2VGb3JtYXR0ZWREYXRlKHByb3BzLm1heERhdGUpIDogbnVsbCxcbiAgICBtaW46IHByb3BzLm1pbkRhdGUgPyB1c2VGb3JtYXR0ZWREYXRlKHByb3BzLm1pbkRhdGUpIDogbnVsbCxcbiAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICAgIHR5cGU6IGlzTW9iaWxlID8gJ2RhdGUnIDogJ3RleHQnLFxuICAgIG1vZGVsVmFsdWU6IHVzZUZvcm1hdHRlZE1vZGVsVmFsdWUoZGF0YS5tb2RlbFZhbHVlLnZhbHVlKSxcbiAgICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6ICh2YWw6IHN0cmluZykgPT4ge1xuICAgICAgZGF0YS5tb2RlbFZhbHVlLnZhbHVlID0gcGFyc2VJbnB1dFN0cmluZyh2YWwpO1xuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHByb3BzLnBsYWNlaG9sZGVyLFxuICAgIHNpemU6IHByb3BzLnNpemUsXG4gICAgaWNvbjogcHJvcHMuaWNvbnMuY2FsZW5kYXIsXG4gICAgaXNSb3VuZGVkOiBwcm9wcy5pc1JvdW5kZWQsXG4gICAgaXNEaXNhYmxlZDogcHJvcHMuaXNEaXNhYmxlZCxcbiAgICBpc1JlYWRvbmx5OiBwcm9wcy5pc1JlYWRvbmx5LFxuICAgIGlzTG9hZGluZzogcHJvcHMuaXNMb2FkaW5nLFxuICAgIHVzZU5hdGl2ZVZhbGlkYXRpb246IHByb3BzLnVzZU5hdGl2ZVZhbGlkYXRpb24sXG4gICAgb25Gb2N1czogKCkgPT4ge1xuICAgICAgaWYgKCFpc01vYmlsZSAmJiBwcm9wcy5vcGVuT25Gb2N1cyAmJiB0b2dnbGUpIHtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIGlmICh0b2dnbGUuaXNPZmYudmFsdWUpIHtcbiAgICAgICAgICAgIHRvZ2dsZS5zZXRPZmYoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQnV0dG9uKHByb3BzOiBCRGF0ZXBpY2tlclByb3BzLCBkYXRhOiBCRGF0ZXBpY2tlckRhdGEsIGlzTmV4dDogYm9vbGVhbik6IFZOb2RlIHtcbiAgcmV0dXJuIGgoXG4gICAgJ2J1dHRvbicsXG4gICAge1xuICAgICAgY2xhc3M6IGlzTmV4dCA/ICdwYWdpbmF0aW9uLW5leHQgZGF0ZXBpY2tlci1uZXh0JyA6ICdwYWdpbmF0aW9uLXByZXZpb3VzIGRhdGVwaWNrZXItcHJldmlvdXMnLFxuICAgICAgZGlzYWJsZWQ6IGRhdGEuaXNEaXNhYmxlZCxcbiAgICAgIG9uQ2xpY2s6IGlzTmV4dCA/IGRhdGEubmV4dE1vbnRoIDogZGF0YS5wcmV2aW91c01vbnRoLFxuICAgICAgb25LZXlkb3duOiAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoaXNFbnRlckV2ZW50KGUpIHx8IGlzU3BhY2VFdmVudChlKSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpc05leHQgPyBkYXRhLm5leHRNb250aCgpIDogZGF0YS5wcmV2aW91c01vbnRoKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIGgoaXNOZXh0ID8gcHJvcHMuaWNvbnMubmV4dCA6IChwcm9wcy5pY29ucy5wcmV2aW91cyBhcyBhbnkpLCB7XG4gICAgICAgIHZhcmlhbnQ6ICdpcy1saW5rJyxcbiAgICAgICAgaXNUaGVtZWFibGU6IGZhbHNlXG4gICAgICB9KVxuICAgIF1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVZZWFyU2VsZWN0KHByb3BzOiBCRGF0ZXBpY2tlclByb3BzLCBkYXRhOiBCRGF0ZXBpY2tlckRhdGEpOiBWTm9kZSB7XG4gIHJldHVybiBoKEJTZWxlY3QsIHtcbiAgICBpdGVtczogZGF0YS55ZWFycyxcbiAgICBtb2RlbFZhbHVlOiBkYXRhLmRhdGVTZWxlY3Rpb25EYXRhLnllYXIsXG4gICAgaXNEaXNhYmxlZDogZGF0YS5pc0Rpc2FibGVkLFxuICAgIHNpemU6IHByb3BzLnNpemUsXG4gICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBkYXRhLnNldFllYXJcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTW9udGhTZWxlY3QocHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsIGRhdGE6IEJEYXRlcGlja2VyRGF0YSk6IFZOb2RlIHtcbiAgcmV0dXJuIGgoQlNlbGVjdCwge1xuICAgIGl0ZW1zOiBkYXRhLm1vbnRocyxcbiAgICBpc0Rpc2FibGVkOiBkYXRhLmlzRGlzYWJsZWQsXG4gICAgc2l6ZTogcHJvcHMuc2l6ZSxcbiAgICBtb2RlbFZhbHVlOiBkYXRhLmRhdGVTZWxlY3Rpb25EYXRhLm1vbnRoLFxuICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogZGF0YS5zZXRNb250aFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVTZWxlY3RzKHByb3BzOiBCRGF0ZXBpY2tlclByb3BzLCBkYXRhOiBCRGF0ZXBpY2tlckRhdGEpOiBWTm9kZSB7XG4gIHJldHVybiBoKCdkaXYnLCB7IGNsYXNzOiAncGFnaW5hdGlvbi1saXN0JyB9LCBbXG4gICAgaChCRmllbGQsIHsgaXNHcm91cGVkOiB0cnVlLCBpc0hvcml6b250YWw6IHRydWUsIGhhc0FkZG9uczogdHJ1ZSwgY2xhc3M6ICdpcy1tYXJnaW5sZXNzJyB9LCAoKSA9PiBbXG4gICAgICBnZW5lcmF0ZU1vbnRoU2VsZWN0KHByb3BzLCBkYXRhKSxcbiAgICAgIGdlbmVyYXRlWWVhclNlbGVjdChwcm9wcywgZGF0YSlcbiAgICBdKVxuICBdKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEZWZhdWx0SGVhZGVyQ29udGVudHMocHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsIGRhdGE6IEJEYXRlcGlja2VyRGF0YSk6IFZOb2RlIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6IFsncGFnaW5hdGlvbiBmaWVsZCBpcy1jZW50ZXJlZCcsIHByb3BzLnNpemVdIH0sIFtcbiAgICBnZW5lcmF0ZUJ1dHRvbihwcm9wcywgZGF0YSwgZmFsc2UpLFxuICAgIGdlbmVyYXRlU2VsZWN0cyhwcm9wcywgZGF0YSksXG4gICAgZ2VuZXJhdGVCdXR0b24ocHJvcHMsIGRhdGEsIHRydWUpXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUhlYWRlcihwcm9wczogQkRhdGVwaWNrZXJQcm9wcywgY29udGV4dDogU2V0dXBDb250ZXh0LCBkYXRhOiBCRGF0ZXBpY2tlckRhdGEpOiBWTm9kZSB7XG4gIHJldHVybiBoKFxuICAgICdoZWFkZXInLFxuICAgIHsgY2xhc3M6ICdkYXRlcGlja2VyLWhlYWRlcicgfSxcbiAgICBjb250ZXh0LnNsb3RzLmhlYWRlciA/IGNvbnRleHQuc2xvdHMuaGVhZGVyKGRhdGEpIDogW2dlbmVyYXRlRGVmYXVsdEhlYWRlckNvbnRlbnRzKHByb3BzLCBkYXRhKV1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEYXRlcGlja2VyVGFibGUocHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsIGNvbnRleHQ6IFNldHVwQ29udGV4dCwgZGF0YTogQkRhdGVwaWNrZXJEYXRhKTogVk5vZGUge1xuICByZXR1cm4gaChCRGF0ZXBpY2tlclRhYmxlLCB7XG4gICAgbW9kZWxWYWx1ZTogZGF0YS5tb2RlbFZhbHVlLnZhbHVlLFxuICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogKHZhbDogRGF0ZSB8IERhdGVbXSkgPT4ge1xuICAgICAgZGF0YS5tb2RlbFZhbHVlLnZhbHVlID0gdmFsO1xuICAgIH0sXG4gICAgZm9jdXNlZERhdGU6IGRhdGEuZm9jdXNlZERhdGUudmFsdWUsXG4gICAgJ29uVXBkYXRlOmZvY3VzZWREYXRlJzogKHZhbDogT3B0aW9uPERhdGU+KSA9PiB7XG4gICAgICBkYXRhLmZvY3VzZWREYXRlLnZhbHVlID0gdmFsO1xuICAgIH0sXG4gICAgZGF5TmFtZXM6IHByb3BzLmRheU5hbWVzLFxuICAgIG1vbnRoTmFtZXM6IHByb3BzLm1vbnRoTmFtZXMsXG4gICAgZmlyc3REYXlPZldlZWs6IHByb3BzLmZpcnN0RGF5T2ZXZWVrLFxuICAgIG1pbkRhdGU6IHByb3BzLm1pbkRhdGUsXG4gICAgbWF4RGF0ZTogcHJvcHMubWF4RGF0ZSxcbiAgICBkYXRlU2VsZWN0aW9uRGF0YTogZGF0YS5kYXRlU2VsZWN0aW9uRGF0YSxcbiAgICBpc0Rpc2FibGVkOiBkYXRhLmlzRGlzYWJsZWQsXG4gICAgdW5zZWxlY3RhYmxlRGF0ZXM6IHByb3BzLnVuc2VsZWN0YWJsZURhdGVzLFxuICAgIHVuc2VsZWN0YWJsZURheXNPZldlZWs6IHByb3BzLnVuc2VsZWN0YWJsZURheXNPZldlZWssXG4gICAgc2VsZWN0YWJsZURhdGVzOiBwcm9wcy5zZWxlY3RhYmxlRGF0ZXMsXG4gICAgZXZlbnRzOiBwcm9wcy5ldmVudHMsXG4gICAgaW5kaWNhdG9yczogcHJvcHMuaW5kaWNhdG9ycyxcbiAgICBzaG93V2Vla051bWJlcjogcHJvcHMuc2hvd1dlZWtOdW1iZXJcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRm9vdGVyKGNvbnRleHQ6IFNldHVwQ29udGV4dCk6IFZOb2RlIHtcbiAgcmV0dXJuIGgoJ2Zvb3RlcicsIHsgY2xhc3M6ICdkYXRlcGlja2VyLWZvb3RlcicgfSwgY29udGV4dC5zbG90cy5mb290ZXIgJiYgY29udGV4dC5zbG90cy5mb290ZXIoKSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ2FsZW5kYXIocHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsIGNvbnRleHQ6IFNldHVwQ29udGV4dCwgZGF0YTogQkRhdGVwaWNrZXJEYXRhKTogVk5vZGUge1xuICByZXR1cm4gaChcbiAgICAnc2VjdGlvbicsXG4gICAge1xuICAgICAgY2xhc3M6ICdkYXRlcGlja2VyLWNvbnRlbnQnLFxuICAgICAgJ2FyaWEtbGFiZWwnOiAnRGF0ZXBpY2tlciBjYWxlbmRhcidcbiAgICB9LFxuICAgIFtnZW5lcmF0ZURhdGVwaWNrZXJUYWJsZShwcm9wcywgY29udGV4dCwgZGF0YSldXG4gICk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRGF0ZXBpY2tlckJvZHkocHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsIGNvbnRleHQ6IFNldHVwQ29udGV4dCwgZGF0YTogQkRhdGVwaWNrZXJEYXRhKTogVk5vZGUge1xuICBjb25zdCBub2RlcyA9IFtnZW5lcmF0ZUhlYWRlcihwcm9wcywgY29udGV4dCwgZGF0YSksIGdlbmVyYXRlQ2FsZW5kYXIocHJvcHMsIGNvbnRleHQsIGRhdGEpXTtcbiAgaWYgKGNvbnRleHQuc2xvdHMuZm9vdGVyKSB7XG4gICAgbm9kZXMucHVzaChnZW5lcmF0ZUZvb3Rlcihjb250ZXh0KSk7XG4gIH1cbiAgcmV0dXJuIGgoJ2RpdicsIG5vZGVzKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVEcm9wZG93bihcbiAgcHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsXG4gIGNvbnRleHQ6IFNldHVwQ29udGV4dCxcbiAgZGF0YTogQkRhdGVwaWNrZXJEYXRhLFxuICBkcm9wZG93bjogUmVmPERyb3Bkb3duIHwgbnVsbD5cbik6IFZOb2RlIHtcbiAgcmV0dXJuIGgoXG4gICAgQkRyb3Bkb3duLFxuICAgIHtcbiAgICAgIHJlZjogZHJvcGRvd24sXG4gICAgICBwb3NpdGlvbjogcHJvcHMucG9zaXRpb24sXG4gICAgICBpc0Rpc2FibGVkOiBwcm9wcy5pc0Rpc2FibGVkLFxuICAgICAgaXNJbmxpbmU6IHByb3BzLmlzSW5saW5lXG4gICAgfSxcbiAgICB7XG4gICAgICB0cmlnZ2VyOiAodG9nZ2xlOiBUb2dnbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlSW5wdXQocHJvcHMsIGNvbnRleHQsIGRhdGEsIHRvZ2dsZSk7XG4gICAgICB9LFxuICAgICAgZGVmYXVsdDogKCkgPT4gZ2VuZXJhdGVEYXRlcGlja2VyQm9keShwcm9wcywgY29udGV4dCwgZGF0YSlcbiAgICB9XG4gICk7XG59XG5cbmludGVyZmFjZSBCRGF0ZXBpY2tlckRhdGEge1xuICBkYXRlU2VsZWN0aW9uRGF0YTogRGF0ZVNlbGVjdGlvbkRhdGE7XG4gIG5leHRNb250aDogSU88dm9pZD47XG4gIHByZXZpb3VzTW9udGg6IElPPHZvaWQ+O1xuICBzZXRZZWFyOiBGdW5jdGlvbk48W3N0cmluZyB8IG51bWJlcl0sIHZvaWQ+O1xuICBzZXRNb250aDogRnVuY3Rpb25OPFtzdHJpbmcgfCBudW1iZXJdLCB2b2lkPjtcbiAgbW9udGhzOiBTZWxlY3RJdGVtPG51bWJlcj5bXTtcbiAgeWVhcnM6IFNlbGVjdEl0ZW08bnVtYmVyPltdO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICBmb2N1c2VkRGF0ZTogUmVmPE9wdGlvbjxEYXRlPj47XG4gIG1vZGVsVmFsdWU6IFJlZjxEYXRlIHwgRGF0ZVtdPjtcbn1cblxuZnVuY3Rpb24gZ2V0TW9udGhzKHByb3BzOiBCRGF0ZXBpY2tlclByb3BzLCBkYXRlU2VsZWN0aW9uRGF0YTogRGF0ZVNlbGVjdGlvbkRhdGEpOiBTZWxlY3RJdGVtPG51bWJlcj5bXSB7XG4gIHJldHVybiBwcm9wcy5tb250aE5hbWVzLm1hcCgobW9udGg6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4gKHtcbiAgICB2YWx1ZTogaW5kZXgsXG4gICAgdGV4dDogbW9udGgsXG4gICAgaXNEaXNhYmxlZDogZmFsc2UsXG4gICAgaXNTZWxlY3RlZDogZGF0ZVNlbGVjdGlvbkRhdGEubW9udGggPT09IGluZGV4XG4gIH0pKTtcbn1cblxuZnVuY3Rpb24gZ2V0WWVhcnMocHJvcHM6IEJEYXRlcGlja2VyUHJvcHMsIGRhdGVTZWxlY3Rpb25EYXRhOiBEYXRlU2VsZWN0aW9uRGF0YSk6IFNlbGVjdEl0ZW08bnVtYmVyPltdIHtcbiAgY29uc3QgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIHJldHVybiByYW5nZShwcm9wcy55ZWFyc1JhbmdlWzBdLCBwcm9wcy55ZWFyc1JhbmdlWzFdKVxuICAgIC5tYXAoaW5jID0+IGN1cnJlbnRZZWFyICsgaW5jKVxuICAgIC5tYXAoeWVhciA9PiAoe1xuICAgICAgdmFsdWU6IHllYXIsXG4gICAgICB0ZXh0OiB5ZWFyLnRvU3RyaW5nKCksXG4gICAgICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgICAgIGlzU2VsZWN0ZWQ6IGRhdGVTZWxlY3Rpb25EYXRhLnllYXIgPT09IHllYXJcbiAgICB9KSk7XG59XG5cbmZ1bmN0aW9uIGdldERhdGVTZWxlY3Rpb25EYXRhKGRhdGU6IERhdGUpOiBEYXRlU2VsZWN0aW9uRGF0YSB7XG4gIHJldHVybiB7XG4gICAgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSBhcyBNb250aE51bWJlcixcbiAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKClcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0UHJldmlvdXNNb250aChwcm9wczogQkRhdGVwaWNrZXJQcm9wcywgZGF0ZVNlbGVjdGlvbkRhdGE6IFJlZjxEYXRlU2VsZWN0aW9uRGF0YT4pIHtcbiAgcmV0dXJuIChlPzogRXZlbnQpID0+IHtcbiAgICBpZiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBpZiAoIXByb3BzLmlzRGlzYWJsZWQpIHtcbiAgICAgIGlmIChkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZS5tb250aCA+IDApIHtcbiAgICAgICAgZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUgPSB7XG4gICAgICAgICAgbW9udGg6IChkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZS5tb250aCAtIDEpIGFzIE1vbnRoTnVtYmVyLFxuICAgICAgICAgIHllYXI6IGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlLnllYXJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlID0ge1xuICAgICAgICAgIG1vbnRoOiAxMSxcbiAgICAgICAgICB5ZWFyOiBkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZS55ZWFyIC0gMVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0U2V0TmV4dE1vbnRoKHByb3BzOiBCRGF0ZXBpY2tlclByb3BzLCBkYXRlU2VsZWN0aW9uRGF0YTogUmVmPERhdGVTZWxlY3Rpb25EYXRhPikge1xuICByZXR1cm4gKGU/OiBFdmVudCkgPT4ge1xuICAgIGlmIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGlmICghcHJvcHMuaXNEaXNhYmxlZCkge1xuICAgICAgaWYgKGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlLm1vbnRoIDwgMTEpIHtcbiAgICAgICAgZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUgPSB7XG4gICAgICAgICAgbW9udGg6IChkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZS5tb250aCArIDEpIGFzIE1vbnRoTnVtYmVyLFxuICAgICAgICAgIHllYXI6IGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlLnllYXJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlID0ge1xuICAgICAgICAgIG1vbnRoOiAwLFxuICAgICAgICAgIHllYXI6IGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlLnllYXIgKyAxXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTZXRNb250aChkYXRlU2VsZWN0aW9uRGF0YTogUmVmPERhdGVTZWxlY3Rpb25EYXRhPikge1xuICByZXR1cm4gKG1vbnRoOiBudW1iZXIgfCBzdHJpbmcpID0+IHtcbiAgICBpZiAoaXNTdHJpbmcobW9udGgpKSB7XG4gICAgICBjb25zdCBuZXdWYWwgPSBmcm9tTnVsbGFibGUocGFyc2VJbnQobW9udGgsIDEwKSk7XG4gICAgICBpZiAoaXNTb21lKG5ld1ZhbCkpIHtcbiAgICAgICAgZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUgPSB7XG4gICAgICAgICAgbW9udGg6IG5ld1ZhbC52YWx1ZSBhcyBNb250aE51bWJlcixcbiAgICAgICAgICB5ZWFyOiBkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZS55ZWFyXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlID0ge1xuICAgICAgICBtb250aDogbW9udGggYXMgTW9udGhOdW1iZXIsXG4gICAgICAgIHllYXI6IGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlLnllYXJcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTZXRZZWFyKGRhdGVTZWxlY3Rpb25EYXRhOiBSZWY8RGF0ZVNlbGVjdGlvbkRhdGE+KSB7XG4gIHJldHVybiAoeWVhcjogbnVtYmVyIHwgc3RyaW5nKSA9PiB7XG4gICAgaWYgKGlzU3RyaW5nKHllYXIpKSB7XG4gICAgICBjb25zdCBuZXdWYWwgPSBmcm9tTnVsbGFibGUocGFyc2VJbnQoeWVhciwgMTApKTtcbiAgICAgIGlmIChpc1NvbWUobmV3VmFsKSkge1xuICAgICAgICBkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZSA9IHtcbiAgICAgICAgICBtb250aDogZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUubW9udGgsXG4gICAgICAgICAgeWVhcjogbmV3VmFsLnZhbHVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlID0ge1xuICAgICAgICBtb250aDogZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUubW9udGgsXG4gICAgICAgIHllYXJcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG5jb25zdCB0b2dnbGVTZXJpYWxEYXRlID0gdG9nZ2xlTGlzdEl0ZW0oZXFTZXJpYWxEYXRlKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ2ItZGF0ZXBpY2tlcicsXG4gIHByb3BzOiBCRGF0ZXBpY2tlclByb3BzRGVmaW5pdGlvbixcbiAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcbiAgICBjb25zdCBmaWVsZERhdGEgPSB1c2VGaWVsZERhdGEoKTtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gdXNlRGlzYWJsZShwcm9wcyk7XG5cbiAgICBjb25zdCBkcm9wZG93bjogUmVmPG51bGwgfCBEcm9wZG93bj4gPSBzaGFsbG93UmVmKG51bGwpO1xuXG4gICAgY29uc3QgaW50ZXJuYWxWYWx1ZSA9IHNoYWxsb3dSZWYocHJvcHMubW9kZWxWYWx1ZSk7XG5cbiAgICB3YXRjaChcbiAgICAgICgpID0+IHByb3BzLm1vZGVsVmFsdWUsXG4gICAgICBuZXdWYWwgPT4ge1xuICAgICAgICBpbnRlcm5hbFZhbHVlLnZhbHVlID0gbmV3VmFsO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBtb2RlbFZhbHVlID0gY29tcHV0ZWQoe1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gaW50ZXJuYWxWYWx1ZS52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsOiBEYXRlIHwgRGF0ZVtdKSB7XG4gICAgICAgIGlmICgoQXJyYXkuaXNBcnJheSh2YWwpICYmIHByb3BzLmlzTXVsdGlwbGUpIHx8IGlzRGF0ZSh2YWwpKSB7XG4gICAgICAgICAgcHJvcHNbJ29uVXBkYXRlOm1vZGVsVmFsdWUnXSh2YWwpO1xuICAgICAgICAgIGludGVybmFsVmFsdWUudmFsdWUgPSB2YWw7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMuaXNNdWx0aXBsZSAmJiBpc0RhdGUodmFsKSkge1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbCA9IHRvZ2dsZVNlcmlhbERhdGUoXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KGludGVybmFsVmFsdWUudmFsdWUpID8gaW50ZXJuYWxWYWx1ZS52YWx1ZSA6IFtpbnRlcm5hbFZhbHVlLnZhbHVlXVxuICAgICAgICAgICk7XG4gICAgICAgICAgcHJvcHNbJ29uVXBkYXRlOm1vZGVsVmFsdWUnXShuZXdWYWwpO1xuICAgICAgICAgIGludGVybmFsVmFsdWUudmFsdWUgPSBuZXdWYWw7XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWwpICYmIGlzTm9uRW1wdHkodmFsKSkge1xuICAgICAgICAgIHByb3BzWydvblVwZGF0ZTptb2RlbFZhbHVlJ10odmFsWzBdKTtcbiAgICAgICAgICBpbnRlcm5hbFZhbHVlLnZhbHVlID0gdmFsWzBdO1xuICAgICAgICB9XG4gICAgICAgIGRyb3Bkb3duLnZhbHVlICYmIGRyb3Bkb3duLnZhbHVlLnRvZ2dsZS5zZXRPZmYoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGZvY3VzZWREYXRlID0gdXNlRXFSZWYoZ2V0RXEoZXFTZXJpYWxEYXRlKSkoXG4gICAgICBwaXBlKFxuICAgICAgICBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID8gaGVhZChwcm9wcy5tb2RlbFZhbHVlKSA6IHNvbWUocHJvcHMubW9kZWxWYWx1ZSksXG4gICAgICAgIGFsdCgoKSA9PiBzb21lKG5ldyBEYXRlKCkpKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBjb25zdCBkYXRlU2VsZWN0aW9uRGF0YSA9IHNoYWxsb3dSZWYoXG4gICAgICBnZXREYXRlU2VsZWN0aW9uRGF0YShcbiAgICAgICAgcGlwZShcbiAgICAgICAgICBmb2N1c2VkRGF0ZS52YWx1ZSxcbiAgICAgICAgICBnZXRPckVsc2UoKCkgPT4gbmV3IERhdGUoKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBjb25zdCBuZXh0TW9udGggPSBnZXRTZXROZXh0TW9udGgocHJvcHMsIGRhdGVTZWxlY3Rpb25EYXRhKTtcbiAgICBjb25zdCBwcmV2aW91c01vbnRoID0gZ2V0U2V0UHJldmlvdXNNb250aChwcm9wcywgZGF0ZVNlbGVjdGlvbkRhdGEpO1xuICAgIGNvbnN0IHNldE1vbnRoID0gZ2V0U2V0TW9udGgoZGF0ZVNlbGVjdGlvbkRhdGEpO1xuICAgIGNvbnN0IHNldFllYXIgPSBnZXRTZXRZZWFyKGRhdGVTZWxlY3Rpb25EYXRhKTtcblxuICAgIGZ1bmN0aW9uIG9uS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICBpZiAoaXNFc2NFdmVudChlKSkge1xuICAgICAgICBkcm9wZG93bi52YWx1ZSAmJiBkcm9wZG93bi52YWx1ZS50b2dnbGUuc2V0T2ZmKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZkID0gZm9jdXNlZERhdGUudmFsdWU7XG4gICAgICBpZiAoaXNOb25lKGZkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaXNFbnRlckV2ZW50KGUpIHx8IGlzU3BhY2VFdmVudChlKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG1vZGVsVmFsdWUudmFsdWUgPSBmZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJvd1VwRXZlbnQoZSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmb2N1c2VkRGF0ZS52YWx1ZSA9IHNvbWUoYWRkRGF5cyhmZC52YWx1ZSwgLTcpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJvd1JpZ2h0RXZlbnQoZSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmb2N1c2VkRGF0ZS52YWx1ZSA9IHNvbWUoYWRkRGF5cyhmZC52YWx1ZSwgMSkpO1xuICAgICAgfSBlbHNlIGlmIChpc0Fycm93RG93bkV2ZW50KGUpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZm9jdXNlZERhdGUudmFsdWUgPSBzb21lKGFkZERheXMoZmQudmFsdWUsIDcpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJvd0xlZnRFdmVudChlKSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGZvY3VzZWREYXRlLnZhbHVlID0gc29tZShhZGREYXlzKGZkLnZhbHVlLCAtMSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleWRvd24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlkb3duKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdhdGNoKFxuICAgICAgKCkgPT4gZm9jdXNlZERhdGUudmFsdWUsXG4gICAgICBuZXdWYWwgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNTb21lKG5ld1ZhbCkgJiZcbiAgICAgICAgICAobmV3VmFsLnZhbHVlLmdldE1vbnRoKCkgIT09IGRhdGVTZWxlY3Rpb25EYXRhLnZhbHVlLm1vbnRoIHx8XG4gICAgICAgICAgICBuZXdWYWwudmFsdWUuZ2V0RnVsbFllYXIoKSAhPT0gZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUueWVhcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUgPSBnZXREYXRlU2VsZWN0aW9uRGF0YShuZXdWYWwudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIHdhdGNoKGRhdGVTZWxlY3Rpb25EYXRhLCBuZXdWYWwgPT4ge1xuICAgICAgY29uc3QgZmQgPSBmb2N1c2VkRGF0ZS52YWx1ZTtcbiAgICAgIGlmIChpc05vbmUoZmQpIHx8IGZkLnZhbHVlLmdldE1vbnRoKCkgIT09IG5ld1ZhbC5tb250aCB8fCBmZC52YWx1ZS5nZXRGdWxsWWVhcigpICE9PSBuZXdWYWwueWVhcikge1xuICAgICAgICBmb2N1c2VkRGF0ZS52YWx1ZSA9IHNvbWUobmV3IERhdGUobmV3VmFsLnllYXIsIG5ld1ZhbC5tb250aCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGE6IEJEYXRlcGlja2VyRGF0YSA9IHtcbiAgICAgICAgbW9kZWxWYWx1ZSxcbiAgICAgICAgaXNEaXNhYmxlZDogaXNEaXNhYmxlZC52YWx1ZSxcbiAgICAgICAgZm9jdXNlZERhdGU6IGZvY3VzZWREYXRlLFxuICAgICAgICBkYXRlU2VsZWN0aW9uRGF0YTogZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUsXG4gICAgICAgIG5leHRNb250aCxcbiAgICAgICAgcHJldmlvdXNNb250aCxcbiAgICAgICAgc2V0TW9udGgsXG4gICAgICAgIHNldFllYXIsXG4gICAgICAgIG1vbnRoczogZ2V0TW9udGhzKHByb3BzLCBkYXRlU2VsZWN0aW9uRGF0YS52YWx1ZSksXG4gICAgICAgIHllYXJzOiBnZXRZZWFycyhwcm9wcywgZGF0ZVNlbGVjdGlvbkRhdGEudmFsdWUpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGgoXG4gICAgICAgICdhcnRpY2xlJyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgICAnYi1kYXRlcGlja2VyIGNvbnRyb2wnLFxuICAgICAgICAgICAgcHJvcHMuc2l6ZSxcbiAgICAgICAgICAgIHsgJ2lzLWV4cGFuZGVkJzogcHJvcHMuaXNFeHBhbmRlZCB8fCBmaWVsZERhdGEuYXR0cnMuaXNFeHBhbmRlZC52YWx1ZSB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBbdXNlTmF0aXZlKHByb3BzKSA/IGdlbmVyYXRlSW5wdXQocHJvcHMsIGNvbnRleHQsIGRhdGEpIDogZ2VuZXJhdGVEcm9wZG93bihwcm9wcywgY29udGV4dCwgZGF0YSwgZHJvcGRvd24pXVxuICAgICAgKTtcbiAgICB9O1xuICB9XG59KTtcbiJdfQ==