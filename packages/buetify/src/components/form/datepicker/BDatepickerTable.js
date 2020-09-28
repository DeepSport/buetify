"use strict";
exports.__esModule = true;
exports.BDatepickerTablePropsDefinition = void 0;
require("./datepicker.sass");
var shared_1 = require("./shared");
var utils_1 = require("./utils");
var helpers_1 = require("../../../utils/helpers");
var Array_1 = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var BDatepickerTableRow_1 = require("./BDatepickerTableRow");
exports.BDatepickerTablePropsDefinition = {
    modelValue: {
        type: [Array, Date],
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
    dateSelectionData: {
        type: Object,
        required: true
    },
    dayNames: {
        type: Array,
        "default": function_1.constant(shared_1.DEFAULT_DAY_NAMES)
    },
    monthNames: {
        type: Array,
        "default": function_1.constant(shared_1.DEFAULT_MONTH_NAMES)
    },
    firstDayOfWeek: {
        type: Number,
        "default": 0
    },
    events: {
        type: Array,
        "default": helpers_1.constEmptyArray
    },
    indicators: {
        type: String,
        required: true
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
        type: Object
    },
    showWeekNumber: {
        type: Boolean,
        "default": false
    }
};
function getWeeksWithinMonth(props) {
    var startOfMonth = utils_1.getStartOfMonth(new Date(props.dateSelectionData.year, props.dateSelectionData.month + 1, 0));
    var endOfCalendar = utils_1.getEndOfWeek(utils_1.getEndOfMonth(startOfMonth));
    var weeks = [];
    var date = utils_1.getStartOfWeek(startOfMonth);
    while (utils_1.isOnOrBeforeDate(date, endOfCalendar)) {
        weeks.push(utils_1.getDatesInWeek(date, props.firstDayOfWeek));
        date = utils_1.addDays(date, 7);
    }
    return weeks;
}
function getEventsWithinWeek(props, week) {
    return props.events.filter(function (event) {
        var eventDate = utils_1.isDate(event) ? event : event.date;
        return utils_1.isWithinWeek(week[0], eventDate, props.firstDayOfWeek);
    });
}
function getWeeks(props) {
    return getWeeksWithinMonth(props).map(function (week, weekNumber) { return ({
        week: week,
        weekNumber: weekNumber,
        events: getEventsWithinWeek(props, week)
    }); });
}
function generateTableHeader(dayNames) {
    return vue_1.h('thead', { "class": 'datepicker-header' }, [
        vue_1.h('tr', dayNames.map(function (day) { return vue_1.h('th', { key: day, "class": 'datepicker-cell' }, day); }))
    ]);
}
function getGenerateTableRow(props, focusedDate) {
    return function generateTableRow(weekData) {
        return vue_1.h(BDatepickerTableRow_1["default"], {
            key: weekData.weekNumber,
            modelValue: props.modelValue,
            'onUpdate:modelValue': props['onUpdate:modelValue'],
            focusedDate: focusedDate.value,
            'onUpdate:focusedDate': function (val) {
                focusedDate.value = val;
            },
            week: weekData.week,
            weekNumber: weekData.weekNumber,
            month: props.dateSelectionData.month,
            minDate: Option_1.fromNullable(props.minDate),
            maxDate: Option_1.fromNullable(props.maxDate),
            unselectableDates: props.unselectableDates,
            unselectableDaysOfWeek: props.unselectableDaysOfWeek,
            selectableDates: Option_1.fromNullable(props.selectableDates),
            events: weekData.events,
            indicators: props.indicators
        });
    };
}
function generateTableBody(props, focusedDate) {
    return vue_1.h('tbody', {
        "class": ['datepicker-body', { 'has-events': !Array_1.isEmpty(props.events) }]
    }, getWeeks(props).map(getGenerateTableRow(props, focusedDate)));
}
exports["default"] = vue_1.defineComponent({
    name: 'b-datepicker-table',
    props: exports.BDatepickerTablePropsDefinition,
    setup: function (props) {
        var focusedDate = vue_1.computed({
            get: function () {
                return props.focusedDate;
            },
            set: function (date) {
                if (Option_1.isNone(date)) {
                    props['onUpdate:focusedDate'](date);
                }
                else if (props.minDate && props.maxDate) {
                    props['onUpdate:focusedDate'](utils_1.isOnOrAfterDate(date.value, props.minDate) && utils_1.isOnOrBeforeDate(date.value, props.maxDate) ? date : Option_1.none);
                }
                else if (props.minDate) {
                    props['onUpdate:focusedDate'](utils_1.isOnOrAfterDate(date.value, props.minDate) ? date : Option_1.none);
                }
                else if (props.maxDate) {
                    props['onUpdate:focusedDate'](utils_1.isOnOrBeforeDate(date.value, props.maxDate) ? date : Option_1.none);
                }
                else {
                    props['onUpdate:focusedDate'](date);
                }
            }
        });
        return function () {
            return vue_1.h('table', { "class": 'datepicker-table' }, [
                generateTableHeader(Array_1.rotate(-props.firstDayOfWeek)(props.dayNames)),
                generateTableBody(props, focusedDate)
            ]);
        };
    }
});
