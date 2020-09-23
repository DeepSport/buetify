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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BPaginationPropsDefinition = void 0;
require("./pagination.sass");
var pagination_1 = require("../../composables/pagination");
var theme_1 = require("../../composables/theme");
var AngleLeftIcon_1 = require("../icons/angleLeft/AngleLeftIcon");
var AngleRightIcon_1 = require("../icons/angleRight/AngleRightIcon");
var Array_1 = require("fp-ts/lib/Array");
var vue_1 = require("vue");
exports.BPaginationPropsDefinition = __assign(__assign(__assign({}, pagination_1.UsePaginationPropsDefinition), theme_1.DefaultThemePropsDefinition), { size: {
        type: String,
        "default": ''
    }, isSimple: {
        type: Boolean,
        "default": false
    }, isRounded: {
        type: Boolean,
        "default": false
    }, position: {
        type: String,
        "default": ''
    } });
function getAriaLabel(num, total) {
    return "Go to page " + num + " of " + total;
}
var ellipsis = vue_1.h('li', [
    vue_1.h('span', {
        "class": 'pagination-ellipsis',
        innerHTML: "&hellip;"
    })
]);
function generatePreviousButton(context, pagination, themeClasses) {
    return vue_1.h('button', {
        "class": __spreadArrays(['pagination-previous'], themeClasses),
        disabled: pagination.hasPrevious.value,
        'aria-label': getAriaLabel(pagination.previousPage.value, pagination.numberOfPages.value),
        onClick: pagination.previous
    }, context.slots.previous ? context.slots.previous() : vue_1.h(AngleLeftIcon_1["default"]));
}
function generateNextButton(context, pagination, themeClasses) {
    return vue_1.h('button', {
        "class": __spreadArrays(['pagination-next'], themeClasses),
        disabled: pagination.hasNext.value,
        'aria-label': getAriaLabel(pagination.nextPage.value, pagination.numberOfPages.value),
        onClick: pagination.next
    }, context.slots.next ? context.slots.next() : vue_1.h(AngleRightIcon_1["default"]));
}
function getGeneratePaginationListItem(pagination, themeClasses) {
    return function (page) {
        return vue_1.h('li', {
            key: page.number
        }, [
            vue_1.h('button', {
                "class": __spreadArrays(['pagination-link'], themeClasses, [{ 'is-current': page.isCurrent }]),
                'aria-label': getAriaLabel(page.number, pagination.numberOfPages.value),
                'aria-current': page.isCurrent,
                onClick: function (e) {
                    e.preventDefault();
                    pagination.set(page.number);
                }
            }, "" + page.number)
        ]);
    };
}
function getPageRange(props, pagination) {
    if (props.isSimple) {
        return [];
    }
    else {
        var currentValue_1 = pagination.current.value;
        var numberOfPages = pagination.numberOfPages.value;
        var left = currentValue_1 === numberOfPages ? numberOfPages - 3 : Math.max(0, currentValue_1 - 2); // internal value is 1 indexed
        var right = Math.min(left + 3, numberOfPages);
        return Array_1.range(1, numberOfPages)
            .map(function (number) { return ({
            number: number,
            isCurrent: number === currentValue_1
        }); })
            .slice(left, right);
    }
}
function generatePaginationList(props, pagination, themeClasses) {
    var generatePaginationListItem = getGeneratePaginationListItem(pagination, themeClasses);
    var currentValue = pagination.current.value;
    var numberOfPages = pagination.numberOfPages.value;
    var nodes = getPageRange(props, pagination).map(generatePaginationListItem);
    if (currentValue >= 5) {
        nodes.unshift(ellipsis);
    }
    if (currentValue >= 3) {
        nodes.unshift(generatePaginationListItem({ number: 1, isCurrent: currentValue === 1 }));
    }
    if (currentValue < numberOfPages - 3) {
        nodes.push(ellipsis);
    }
    if (currentValue <= numberOfPages - 2) {
        nodes.push(generatePaginationListItem({ number: numberOfPages, isCurrent: currentValue === numberOfPages }));
    }
    return vue_1.h('ul', { "class": 'pagination-list' }, nodes);
}
function generateSimpleSummary(props, pagination) {
    return vue_1.h('small', { "class": 'info' }, props.perPage === 1
        ? pagination.after.value + 1 + " / " + props.total
        : pagination.after.value + 1 + " - " + Math.min(pagination.after.value + props.perPage, props.total || 0) + " / " + (props.total || 0));
}
function generatePaginationControls(props, context, pagination, themeClasses) {
    return vue_1.h('section', {
        'aria-label': 'Pagination Controls',
        "class": ['pagination', props.position, props.size, { 'is-simple': props.isSimple, 'is-rounded': props.isRounded }]
    }, props.isSimple
        ? [
            generatePreviousButton(context, pagination, themeClasses),
            generateNextButton(context, pagination, themeClasses),
            generateSimpleSummary(props, pagination)
        ]
        : [
            generatePreviousButton(context, pagination, themeClasses),
            generateNextButton(context, pagination, themeClasses),
            generatePaginationList(props, pagination, themeClasses)
        ]);
}
exports["default"] = vue_1.defineComponent({
    name: 'b-pagination',
    props: exports.BPaginationPropsDefinition,
    setup: function (props, context) {
        var pagination = pagination_1.usePagination(props);
        var themeClasses = theme_1.useTheme(props).themeClasses;
        return function () {
            return context.slots["default"]
                ? vue_1.h('article', [
                    context.slots["default"](pagination_1.extractPaginationState(pagination)),
                    generatePaginationControls(props, context, pagination, themeClasses.value)
                ])
                : [generatePaginationControls(props, context, pagination, themeClasses.value)];
        };
    }
});
