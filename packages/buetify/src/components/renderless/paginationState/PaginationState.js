"use strict";
exports.__esModule = true;
exports.PaginationState = void 0;
var pagination_1 = require("../../../composables/pagination");
var vue_1 = require("vue");
exports.PaginationState = vue_1.defineComponent({
    name: 'pagination-state',
    props: pagination_1.UsePaginationPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        var pagination = pagination_1.usePagination(props);
        return function () { return slots["default"] && slots["default"](pagination_1.extractPaginationState(pagination)); };
    }
});
