"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getDatepickerIcons = void 0;
require("./datepicker.sass");
var disable_1 = require("../../../composables/disable");
var eqRef_1 = require("../../../composables/eqRef");
var fieldData_1 = require("../../../composables/fieldData");
var useInput_1 = require("../../../composables/input/useInput");
var shared_1 = require("./shared");
var utils_1 = require("./utils");
var BInput_1 = require("../input/BInput");
var eventHelpers_1 = require("../../../utils/eventHelpers");
var Array_1 = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var BDropdown_1 = require("../../dropdown/BDropdown");
var BDatepickerTable_1 = require("./BDatepickerTable");
var BField_1 = require("../field/BField");
var BSelect_1 = require("../select/BSelect");
var vue_1 = require("vue");
var helpers_1 = require("../../../utils/helpers");
var DEFAULT_DATEPICKER_ICONS = {
    previous: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/angleLeft'); }); }),
    next: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/angleRight'); }); }),
    calendar: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/calendar'); }); })
};
function getDatepickerIcons(icons) {
    return __assign(__assign({}, DEFAULT_DATEPICKER_ICONS), icons);
}
exports.getDatepickerIcons = getDatepickerIcons;
var BDatepickerPropsDefinition = __assign(__assign(__assign(__assign({}, BDropdown_1.BDropdownPropsDefinition), disable_1.UseDisablePropsDefinition), useInput_1.getUseInputPropsDefinition()), { modelValue: {
        type: [Array, Date],
        "default": helpers_1.constEmptyArray
    }, 'onUpdate:modelValue': {
        type: Function,
        required: true
    }, dayNames: {
        type: Array,
        "default": function_1.constant(shared_1.DEFAULT_DAY_NAMES)
    }, monthNames: {
        type: Array,
        "default": function_1.constant(shared_1.DEFAULT_MONTH_NAMES)
    }, firstDayOfWeek: {
        type: Number,
        "default": 0
    }, events: {
        type: Array,
        "default": helpers_1.constEmptyArray
    }, minDate: {
        type: Date,
        required: false
    }, maxDate: {
        type: Date,
        required: false
    }, isDisabled: {
        type: Boolean,
        "default": false
    }, unselectableDates: {
        type: Array,
        "default": helpers_1.constEmptyArray
    }, unselectableDaysOfWeek: {
        type: Array,
        "default": helpers_1.constEmptyArray
    }, selectableDates: {
        type: Object
    }, showWeekNumber: {
        type: Boolean,
        "default": false
    }, isMultiple: {
        type: Boolean,
        "default": false
    }, placeholder: {
        type: String
    }, useMobileNative: {
        type: Boolean,
        "default": false
    }, position: {
        type: String
    }, indicators: {
        type: String,
        "default": 'bars'
    }, yearsRange: {
        type: Array,
        "default": function_1.constant([-5, 3])
    }, closeOnSelect: {
        type: Boolean,
        "default": true
    }, openOnFocus: {
        type: Boolean,
        "default": true
    }, icons: {
        type: Object,
        "default": function_1.constant(DEFAULT_DATEPICKER_ICONS)
    } });
function useNative(props) {
    return props.useMobileNative && !props.isInline;
}
var useFormattedDate = Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}).format;
function useFormattedModelValue(modelValue) {
    return Array.isArray(modelValue) ? modelValue.map(useFormattedDate).join(', ') : useFormattedDate(modelValue);
}
function parseInputString(str) {
    var splits = str.split(',').map(function (s) { return s.trim(); });
    return splits.map(function (s) { return new Date(s); }).filter(function (d) { return utils_1.isDate(d) && !isNaN(d.getTime()); });
}
function generateInput(props, context, data, toggle) {
    var isMobile = useNative(props);
    return vue_1.h(BInput_1.BInput, {
        max: props.maxDate ? useFormattedDate(props.maxDate) : null,
        min: props.minDate ? useFormattedDate(props.minDate) : null,
        autocomplete: 'off',
        type: isMobile ? 'date' : 'text',
        modelValue: useFormattedModelValue(data.modelValue.value),
        'onUpdate:modelValue': function (val) {
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
        onFocus: function () {
            if (!isMobile && props.openOnFocus && toggle) {
                vue_1.nextTick(function () {
                    if (toggle.isOff.value) {
                        toggle.setOff();
                    }
                });
            }
        }
    });
}
function generateButton(props, data, isNext) {
    return vue_1.h('button', {
        "class": isNext ? 'pagination-next datepicker-next' : 'pagination-previous datepicker-previous',
        disabled: data.isDisabled,
        onClick: isNext ? data.nextMonth : data.previousMonth,
        onKeydown: function (e) {
            if (eventHelpers_1.isEnterEvent(e) || eventHelpers_1.isSpaceEvent(e)) {
                e.preventDefault();
                isNext ? data.nextMonth() : data.previousMonth();
            }
        }
    }, [
        vue_1.h(isNext ? props.icons.next : props.icons.previous, {
            variant: 'is-link',
            isThemeable: false
        })
    ]);
}
function generateYearSelect(props, data) {
    return vue_1.h(BSelect_1.BSelect, {
        items: data.years,
        modelValue: data.dateSelectionData.year,
        isDisabled: data.isDisabled,
        size: props.size,
        'onUpdate:modelValue': data.setYear
    });
}
function generateMonthSelect(props, data) {
    return vue_1.h(BSelect_1.BSelect, {
        items: data.months,
        isDisabled: data.isDisabled,
        size: props.size,
        modelValue: data.dateSelectionData.month,
        'onUpdate:modelValue': data.setMonth
    });
}
function generateSelects(props, data) {
    return vue_1.h('div', { "class": 'pagination-list' }, [
        vue_1.h(BField_1["default"], { isGrouped: true, isHorizontal: true, hasAddons: true, "class": 'is-marginless' }, function () { return [
            generateMonthSelect(props, data),
            generateYearSelect(props, data)
        ]; })
    ]);
}
function generateDefaultHeaderContents(props, data) {
    return vue_1.h('div', { "class": ['pagination field is-centered', props.size] }, [
        generateButton(props, data, false),
        generateSelects(props, data),
        generateButton(props, data, true)
    ]);
}
function generateHeader(props, context, data) {
    return vue_1.h('header', { "class": 'datepicker-header' }, context.slots.header ? context.slots.header(data) : [generateDefaultHeaderContents(props, data)]);
}
function generateDatepickerTable(props, context, data) {
    return vue_1.h(BDatepickerTable_1["default"], {
        modelValue: data.modelValue.value,
        'onUpdate:modelValue': function (val) {
            data.modelValue.value = val;
        },
        focusedDate: data.focusedDate.value,
        'onUpdate:focusedDate': function (val) {
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
    return vue_1.h('footer', { "class": 'datepicker-footer' }, context.slots.footer && context.slots.footer());
}
function generateCalendar(props, context, data) {
    return vue_1.h('section', {
        "class": 'datepicker-content',
        'aria-label': 'Datepicker calendar'
    }, [generateDatepickerTable(props, context, data)]);
}
function generateDatepickerBody(props, context, data) {
    var nodes = [generateHeader(props, context, data), generateCalendar(props, context, data)];
    if (context.slots.footer) {
        nodes.push(generateFooter(context));
    }
    return vue_1.h('div', nodes);
}
function generateDropdown(props, context, data, dropdown) {
    return vue_1.h(BDropdown_1["default"], {
        ref: dropdown,
        position: props.position,
        isDisabled: props.isDisabled,
        isInline: props.isInline
    }, {
        trigger: function (toggle) {
            return generateInput(props, context, data, toggle);
        },
        "default": function () { return generateDatepickerBody(props, context, data); }
    });
}
function getMonths(props, dateSelectionData) {
    return props.monthNames.map(function (month, index) { return ({
        value: index,
        text: month,
        isDisabled: false,
        isSelected: dateSelectionData.month === index
    }); });
}
function getYears(props, dateSelectionData) {
    var currentYear = new Date().getFullYear();
    return Array_1.range(props.yearsRange[0], props.yearsRange[1])
        .map(function (inc) { return currentYear + inc; })
        .map(function (year) { return ({
        value: year,
        text: year.toString(),
        isDisabled: false,
        isSelected: dateSelectionData.year === year
    }); });
}
function getDateSelectionData(date) {
    return {
        month: date.getMonth(),
        year: date.getFullYear()
    };
}
function getSetPreviousMonth(props, dateSelectionData) {
    return function (e) {
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
    return function (e) {
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
    return function (month) {
        if (helpers_1.isString(month)) {
            var newVal = Option_1.fromNullable(parseInt(month, 10));
            if (Option_1.isSome(newVal)) {
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
    return function (year) {
        if (helpers_1.isString(year)) {
            var newVal = Option_1.fromNullable(parseInt(year, 10));
            if (Option_1.isSome(newVal)) {
                dateSelectionData.value = {
                    month: dateSelectionData.value.month,
                    year: newVal.value
                };
            }
        }
        else {
            dateSelectionData.value = {
                month: dateSelectionData.value.month,
                year: year
            };
        }
    };
}
var toggleSerialDate = helpers_1.toggleListItem(utils_1.eqSerialDate);
exports["default"] = vue_1.defineComponent({
    name: 'b-datepicker',
    props: BDatepickerPropsDefinition,
    setup: function (props, context) {
        var fieldData = fieldData_1.useFieldData();
        var isDisabled = disable_1.useDisable(props);
        var dropdown = vue_1.shallowRef(null);
        var internalValue = vue_1.shallowRef(props.modelValue);
        vue_1.watch(function () { return props.modelValue; }, function (newVal) {
            internalValue.value = newVal;
        });
        var modelValue = vue_1.computed({
            get: function () {
                return internalValue.value;
            },
            set: function (val) {
                if ((Array.isArray(val) && props.isMultiple) || utils_1.isDate(val)) {
                    props['onUpdate:modelValue'](val);
                    internalValue.value = val;
                }
                else if (props.isMultiple && utils_1.isDate(val)) {
                    var newVal = toggleSerialDate(val, Array.isArray(internalValue.value) ? internalValue.value : [internalValue.value]);
                    props['onUpdate:modelValue'](newVal);
                    internalValue.value = newVal;
                }
                else if (Array.isArray(val) && Array_1.isNonEmpty(val)) {
                    props['onUpdate:modelValue'](val[0]);
                    internalValue.value = val[0];
                }
                dropdown.value && dropdown.value.toggle.setOff();
            }
        });
        var focusedDate = eqRef_1.useEqRef(Option_1.getEq(utils_1.eqSerialDate))(pipeable_1.pipe(Array.isArray(props.modelValue) ? Array_1.head(props.modelValue) : Option_1.some(props.modelValue), Option_1.alt(function () { return Option_1.some(new Date()); })));
        var dateSelectionData = vue_1.shallowRef(getDateSelectionData(pipeable_1.pipe(focusedDate.value, Option_1.getOrElse(function () { return new Date(); }))));
        var nextMonth = getSetNextMonth(props, dateSelectionData);
        var previousMonth = getSetPreviousMonth(props, dateSelectionData);
        var setMonth = getSetMonth(dateSelectionData);
        var setYear = getSetYear(dateSelectionData);
        function onKeydown(e) {
            if (eventHelpers_1.isEscEvent(e)) {
                dropdown.value && dropdown.value.toggle.setOff();
                return;
            }
            var fd = focusedDate.value;
            if (Option_1.isNone(fd)) {
                return;
            }
            if (eventHelpers_1.isEnterEvent(e) || eventHelpers_1.isSpaceEvent(e)) {
                e.preventDefault();
                modelValue.value = fd.value;
            }
            else if (eventHelpers_1.isArrowUpEvent(e)) {
                e.preventDefault();
                focusedDate.value = Option_1.some(utils_1.addDays(fd.value, -7));
            }
            else if (eventHelpers_1.isArrowRightEvent(e)) {
                e.preventDefault();
                focusedDate.value = Option_1.some(utils_1.addDays(fd.value, 1));
            }
            else if (eventHelpers_1.isArrowDownEvent(e)) {
                e.preventDefault();
                focusedDate.value = Option_1.some(utils_1.addDays(fd.value, 7));
            }
            else if (eventHelpers_1.isArrowLeftEvent(e)) {
                e.preventDefault();
                focusedDate.value = Option_1.some(utils_1.addDays(fd.value, -1));
            }
        }
        vue_1.onMounted(function () {
            if (typeof window !== 'undefined') {
                document.addEventListener('keyup', onKeydown);
            }
        });
        vue_1.onUnmounted(function () {
            if (typeof window !== 'undefined') {
                document.removeEventListener('keyup', onKeydown);
            }
        });
        vue_1.watch(function () { return focusedDate.value; }, function (newVal) {
            if (Option_1.isSome(newVal) &&
                (newVal.value.getMonth() !== dateSelectionData.value.month ||
                    newVal.value.getFullYear() !== dateSelectionData.value.year)) {
                dateSelectionData.value = getDateSelectionData(newVal.value);
            }
        });
        vue_1.watch(dateSelectionData, function (newVal) {
            var fd = focusedDate.value;
            if (Option_1.isNone(fd) || fd.value.getMonth() !== newVal.month || fd.value.getFullYear() !== newVal.year) {
                focusedDate.value = Option_1.some(new Date(newVal.year, newVal.month));
            }
        });
        return function () {
            var data = {
                modelValue: modelValue,
                isDisabled: isDisabled.value,
                focusedDate: focusedDate,
                dateSelectionData: dateSelectionData.value,
                nextMonth: nextMonth,
                previousMonth: previousMonth,
                setMonth: setMonth,
                setYear: setYear,
                months: getMonths(props, dateSelectionData.value),
                years: getYears(props, dateSelectionData.value)
            };
            return vue_1.h('article', {
                "class": [
                    'b-datepicker control',
                    props.size,
                    { 'is-expanded': props.isExpanded || fieldData.attrs.isExpanded.value }
                ]
            }, [useNative(props) ? generateInput(props, context, data) : generateDropdown(props, context, data, dropdown)]);
        };
    }
});
