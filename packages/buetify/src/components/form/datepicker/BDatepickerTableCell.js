"use strict";
exports.__esModule = true;
require("./datepicker.sass");
var helpers_1 = require("../../../utils/helpers");
var utils_1 = require("./utils");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
function generateEvents(events) {
    return vue_1.h('div', { "class": 'events' }, events.map(function (event, index) {
        return vue_1.h('div', {
            key: index,
            "class": ['event', event.variant]
        });
    }));
}
var toggleSerialDate = helpers_1.toggleListItem(utils_1.eqSerialDate);
var eqOptionSerialDate = Option_1.getEq(utils_1.eqSerialDate);
exports["default"] = vue_1.defineComponent({
    name: 'b-datepicker-table-cell',
    props: {
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
        indicators: {
            type: String,
            required: true
        },
        cell: {
            type: Object,
            required: true
        }
    },
    setup: function (props) {
        var buttonRef = vue_1.shallowRef(null);
        function onClick(e) {
            e && e.preventDefault();
            var currentValue = props.modelValue;
            props['onUpdate:modelValue'](Array.isArray(currentValue) ? toggleSerialDate(props.cell.date, currentValue) : props.cell.date);
        }
        var onFocus = function () {
            props['onUpdate:focusedDate'](Option_1.some(props.cell.date));
        };
        vue_1.onMounted(function () {
            return vue_1.watch(function () { return props.focusedDate; }, function (newVal, oldVal) {
                if (((oldVal && !eqOptionSerialDate.equals(newVal, oldVal)) || oldVal === undefined) &&
                    buttonRef.value &&
                    pipeable_1.pipe(newVal, Option_1.exists(function (d) { return utils_1.isSameDay(d, props.cell.date); })) &&
                    document.activeElement !== buttonRef.value) {
                    buttonRef.value.focus({ preventScroll: true });
                }
            }, {
                immediate: true
            });
        });
        return function () {
            return vue_1.h('td', [
                vue_1.h('button', {
                    ref: buttonRef,
                    "class": ['datepicker-cell', props.cell.classes, props.indicators],
                    disabled: props.cell.isDisabled,
                    tabindex: props.cell.isDisabled || props.cell.isSelected ? -1 : 0,
                    'aria-label': props.cell.ariaLabel,
                    onClick: onClick,
                    onFocus: onFocus,
                    onMouseenter: onFocus
                }, [props.cell.date.getDate(), props.cell.hasEvents ? generateEvents(props.cell.events) : undefined])
            ]);
        };
    }
});
