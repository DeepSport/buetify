"use strict";
exports.__esModule = true;
exports.useDraggableTable = exports.BTableDraggablePropsDefinition = void 0;
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var function_1 = require("fp-ts/lib/function");
var shared_1 = require("../shared");
exports.BTableDraggablePropsDefinition = {
    isDraggable: {
        type: Boolean,
        "default": false
    },
    dropEffect: {
        type: String,
        "default": 'move'
    },
    onDragstart: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onDragenter: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onDragover: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onDragleave: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onDragend: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onDrop: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    }
};
function useDraggableTable(props) {
    var dragIsActive = vue_1.shallowRef(false);
    var dropTarget = vue_1.shallowRef(Option_1.none);
    function getOnDragStartListener(row, index) {
        return function (e) {
            dragIsActive.value = true;
            if (e.dataTransfer) {
                e.dataTransfer.setData('text/plain', String(index));
                e.dataTransfer.dropEffect = props.dropEffect;
            }
            dropTarget.value = Option_1.some(row);
            props.onDragstart(row, e, index);
        };
    }
    function getOnDropListener(row, index) {
        return function (e) {
            if (row.isDroppable) {
                e.preventDefault();
                props.onDrop(row, e, index);
            }
            dragIsActive.value = false;
        };
    }
    function getOnDragEnterListener(row, index) {
        return function (e) {
            if (row.isDroppable) {
                e.preventDefault();
                dropTarget.value = Option_1.some(row);
                props.onDragenter(row, e, index);
            }
        };
    }
    function getOnDragOverListener(row, index) {
        return function (e) {
            if (row.isDroppable) {
                e.preventDefault();
                var target = dropTarget.value;
                if (Option_1.isNone(target) || (Option_1.isSome(target) && !shared_1.eqBTableRow.equals(target.value, row))) {
                    dropTarget.value = Option_1.some(row);
                }
                props.onDragover(row, e, index);
            }
        };
    }
    function getOnDragLeaveListener(row, index) {
        return function (e) {
            if (row.isDroppable) {
                e.preventDefault();
                var target = dropTarget.value;
                if (Option_1.isSome(target) && shared_1.eqBTableRow.equals(target.value, row)) {
                    dropTarget.value = Option_1.none;
                }
                props.onDragleave(row, e, index);
            }
        };
    }
    function getOnDragEndListener(row, index) {
        return function (e) {
            props.onDragend(row, e, index);
            if (Option_1.isSome(dropTarget.value)) {
                dropTarget.value = Option_1.none;
            }
            dragIsActive.value = false;
        };
    }
    function getRowDragListeners(row, index) {
        if (row.isDraggable) {
            return {
                onDragstart: getOnDragStartListener(row, index),
                onDrop: getOnDropListener(row, index),
                onDragenter: getOnDragEnterListener(row, index),
                onDragleave: getOnDragLeaveListener(row, index),
                onDragover: getOnDragOverListener(row, index),
                onDragend: getOnDragEndListener(row, index)
            };
        }
        else {
            return {};
        }
    }
    return {
        getRowDragListeners: getRowDragListeners,
        dragIsActive: dragIsActive,
        dropTarget: dropTarget
    };
}
exports.useDraggableTable = useDraggableTable;
