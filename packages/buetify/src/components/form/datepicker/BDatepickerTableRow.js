"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BDatepickerTableRowPropsDefinition = void 0;
require("./datepicker.sass");
var BDatepickerTableCell_1 = require("./BDatepickerTableCell");
var utils_1 = require("./utils");
var helpers_1 = require("../../../utils/helpers");
var Array_1 = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
exports.BDatepickerTableRowPropsDefinition = {
    modelValue: {
        type: [Date, Array],
        required: true
    },
    'onUpdate:modelValue': {
        type: Function,
        required: true
    },
    focusedDate: {
        type: Object,
        required: true
    },
    'onUpdate:focusedDate': {
        type: Function,
        required: true
    },
    showWeekNumber: {
        type: Boolean,
        "default": false
    },
    weekNumber: {
        type: Number,
        required: true
    },
    week: {
        type: Array,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    minDate: {
        type: Object,
        required: true
    },
    maxDate: {
        type: Object,
        required: true
    },
    isDisabled: {
        type: Boolean,
        "default": false
    },
    unselectableDates: {
        type: Array,
        "default": helpers_1.constEmptyArray
    },
    unselectableDaysOfWeek: {
        type: Array,
        "default": helpers_1.constEmptyArray
    },
    selectableDates: {
        type: Object,
        "default": helpers_1.constNone
    },
    events: {
        type: Array,
        "default": helpers_1.constEmptyArray
    },
    indicators: {
        type: String,
        required: true
    }
};
function getIsAfterMinDate(props) {
    return function isAfterMinDate(date) {
        return pipeable_1.pipe(props.minDate, Option_1.fold(function_1.constTrue, function (d) { return utils_1.isOnOrAfterDate(date, d); }));
    };
}
function getIsBeforeMaxDate(props) {
    return function isBeforeMaxDate(date) {
        return pipeable_1.pipe(props.maxDate, Option_1.fold(function_1.constTrue, function (d) { return utils_1.isOnOrBeforeDate(date, d); }));
    };
}
function getIsWithinMonth(props) {
    return function isWithinMonth(date) {
        return date.getMonth() === props.month;
    };
}
function getIsEnabled(props) {
    return function isEnabled(date) {
        return (!utils_1.elemSerialDate(date, props.unselectableDates) &&
            pipeable_1.pipe(props.selectableDates, Option_1.fold(function_1.constTrue, function (dates) { return utils_1.elemSerialDate(date, dates); })));
    };
}
function getIsOnSelectableDayOfWeek(props) {
    return function isOnSelectableDayOfWeek(date) {
        return !props.unselectableDaysOfWeek.includes(date.getDay());
    };
}
function getDatePredicates(props) {
    var isAfterMinDate = getIsAfterMinDate(props);
    var isBeforeMaxDate = getIsBeforeMaxDate(props);
    var isWithinMonth = getIsWithinMonth(props);
    var isEnabled = getIsEnabled(props);
    var isOnSelectableDayOfWeek = getIsOnSelectableDayOfWeek(props);
    function isSelectedDate(date) {
        return Array.isArray(props.modelValue)
            ? props.modelValue.some(function (d) { return utils_1.isSameDay(d, date); })
            : utils_1.isSameDay(props.modelValue, date);
    }
    function isSelectableDate(date) {
        return [
            isAfterMinDate(date),
            isBeforeMaxDate(date),
            isWithinMonth(date),
            isEnabled(date),
            isOnSelectableDayOfWeek(date)
        ].every(function_1.identity);
    }
    return {
        isAfterMinDate: isAfterMinDate,
        isBeforeMaxDate: isBeforeMaxDate,
        isWithinMonth: isWithinMonth,
        isEnabled: isEnabled,
        isOnSelectableDayOfWeek: isOnSelectableDayOfWeek,
        isSelectableDate: isSelectableDate,
        isSelectedDate: isSelectedDate
    };
}
function getDateClassesGenerator(props, predicates) {
    var today = new Date();
    return function getDateClasses(date, hasEvents) {
        if (hasEvents === void 0) { hasEvents = false; }
        if (utils_1.isDate(date)) {
            var isSelectable = predicates.isSelectableDate(date);
            return {
                'is-selected': predicates.isSelectedDate(date),
                'is-today': utils_1.isSameDay(date, today),
                'is-selectable': isSelectable && !props.isDisabled,
                'is-unselectable': !isSelectable || props.isDisabled,
                'has-event': hasEvents
            };
        }
        else {
            return {};
        }
    };
}
function generateWeekNumber(weekNumber) {
    return vue_1.h('td', ["" + weekNumber]);
}
function getGenerateCell(props) {
    return function generateCell(cell) {
        return vue_1.h(BDatepickerTableCell_1["default"], {
            key: cell.date.toLocaleDateString(),
            cell: cell,
            modelValue: props.modelValue,
            'onUpdate:modelValue': props['onUpdate:modelValue'],
            focusedDate: props.focusedDate,
            'onUpdate:focusedDate': props['onUpdate:focusedDate'],
            indicators: props.indicators
        });
    };
}
exports["default"] = vue_1.defineComponent({
    name: 'b-datepicker-table-row',
    props: exports.BDatepickerTableRowPropsDefinition,
    setup: function (props) {
        var formattedEvents = vue_1.computed(function () {
            return props.events.map(function (event) { return (utils_1.isDate(event) ? { date: event, variant: 'is-primary' } : event); });
        });
        var predicates = getDatePredicates(props);
        var getDateClasses = getDateClassesGenerator(props, predicates);
        var cells = vue_1.computed(function () {
            return props.week.map(function (date) {
                var events = formattedEvents.value.filter(function (event) { return utils_1.isSameDay(date, event.date); });
                var hasEvents = Array_1.isNonEmpty(events);
                return {
                    date: date,
                    events: events,
                    hasEvents: hasEvents,
                    isSelected: predicates.isSelectedDate(date),
                    isDisabled: props.isDisabled || !predicates.isSelectableDate(date),
                    number: date.getDate(),
                    ariaLabel: date.toLocaleDateString(),
                    classes: getDateClasses(date, hasEvents)
                };
            });
        });
        var generateCell = getGenerateCell(props);
        return function () {
            return vue_1.h('tr', { "class": 'datepicker-row' }, props.showWeekNumber
                ? __spreadArrays([generateWeekNumber(props.weekNumber)], cells.value.map(generateCell)) : cells.value.map(generateCell));
        };
    }
});
