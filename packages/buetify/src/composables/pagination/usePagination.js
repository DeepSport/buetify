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
exports.extractPaginationState = exports.usePagination = exports.UsePaginationPropsDefinition = void 0;
var vue_1 = require("vue");
var model_1 = require("../model");
exports.UsePaginationPropsDefinition = __assign(__assign({}, model_1.getUseModelPropsDefinition()), { modelValue: {
        type: Number,
        "default": 0
    }, total: {
        type: Number,
        required: true
    }, perPage: {
        type: Number,
        "default": 25
    } });
function usePagination(props) {
    var model = model_1.useModel(props);
    var current = vue_1.computed(function () { return Math.max(model.modelValue.value, 1); });
    var numberOfPages = vue_1.computed(function () { return Math.ceil(props.total / props.perPage); });
    var after = vue_1.computed(function () { return Math.max((model.modelValue.value - 1) * props.perPage, 0); });
    var nextPage = vue_1.computed(function () { return Math.min(numberOfPages.value, model.modelValue.value + 1); });
    var hasNext = vue_1.computed(function () { return props.perPage + after.value < props.total; });
    var previousPage = vue_1.computed(function () { return Math.max(0, model.modelValue.value - 1); });
    var hasPrevious = vue_1.computed(function () { return after.value > 0 && props.total > 0; });
    function next(e) {
        e.preventDefault();
        if (hasNext.value) {
            model.set(nextPage.value);
        }
    }
    function previous(e) {
        e.preventDefault();
        if (hasPrevious.value) {
            model.set(previousPage.value);
        }
    }
    function first() {
        model.set(1);
    }
    function last() {
        model.set(numberOfPages.value);
    }
    function set(num) {
        if (num >= 1 && num <= numberOfPages.value) {
            model.set(num);
        }
    }
    return {
        current: current,
        numberOfPages: numberOfPages,
        after: after,
        nextPage: nextPage,
        hasNext: hasNext,
        previousPage: previousPage,
        hasPrevious: hasPrevious,
        next: next,
        previous: previous,
        first: first,
        last: last,
        set: set
    };
}
exports.usePagination = usePagination;
function extractPaginationState(pagination) {
    return {
        current: pagination.current.value,
        numberOfPages: pagination.numberOfPages.value,
        after: pagination.after.value,
        nextPage: pagination.nextPage.value,
        hasNext: pagination.hasNext.value,
        previousPage: pagination.previousPage.value,
        hasPrevious: pagination.hasPrevious.value,
        next: pagination.next,
        previous: pagination.previous,
        first: pagination.first,
        last: pagination.last,
        set: pagination.set
    };
}
exports.extractPaginationState = extractPaginationState;
