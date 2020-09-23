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
exports.BAutocomplete = void 0;
require("./autocomplete.sass");
var useInput_1 = require("../../../composables/input/useInput");
var useModel_1 = require("../../../composables/model/useModel");
var proxy_1 = require("../../../composables/proxy");
var shared_1 = require("../../../composables/shared");
var theme_1 = require("../../../composables/theme");
var helpers_1 = require("../../../utils/helpers");
var dropdown_1 = require("../../dropdown");
var BDropdown_1 = require("../../dropdown/BDropdown");
var eventHelpers_1 = require("../../../utils/eventHelpers");
var function_1 = require("fp-ts/lib/function");
var BDropdownDivider_1 = require("../../dropdown/BDropdownDivider");
var BDropdownItem_1 = require("../../dropdown/BDropdownItem");
var Array_1 = require("fp-ts/lib/Array");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
var input_1 = require("../input");
function getActiveDescendentId(selectedItems, itemId) {
    return pipeable_1.pipe(selectedItems, Array_1.head, Option_1.map(function (item) { return helpers_1.extractProp(itemId, item); }), Option_1.toUndefined);
}
function getAutocompleteItems(items, selectedItems, itemId, itemText, eq, hoveredItem) {
    return items.map(function (item, index) { return ({
        id: helpers_1.extractProp(itemId, item),
        isSelected: selectedItems.some(function (i) { return eq.equals(i, item); }),
        isHovered: Option_1.isSome(hoveredItem) ? hoveredItem.value.id === helpers_1.extractProp(itemId, item) : false,
        text: helpers_1.extractProp(itemText, item),
        value: item,
        index: index
    }); });
}
function getSetSelected(props, closeDropdown, inputModel, selectedItemsModel) {
    var toggle = helpers_1.toggleListItem(props.eq);
    return function (item) {
        inputModel.value = props.clearOnSelect ? '' : helpers_1.extractProp(props.itemText, item.value);
        selectedItemsModel.value = toggle(item.value, selectedItemsModel.value || []);
        if (props.closeOnSelect) {
            closeDropdown();
        }
    };
}
function getSetHovered(hoveredItem, templateItems) {
    return function (item) {
        var newItem = Option_1.fromNullable(item);
        if (Option_1.isSome(newItem)) {
            hoveredItem.value = newItem;
            pipeable_1.pipe(newItem, Option_1.map(function (item) { return item.index; }), Option_1.chain(function (index) { return Array_1.lookup(index, templateItems.value); }), Option_1.fold(function_1.constant(function_1.constVoid), function (li) { return function () { return li.focus && li.focus(); }; }))();
        }
    };
}
function getOnKeydown(autocompleteItems, hoveredItem, closeDropdown, setSelected, setHovered) {
    function onArrowPress(isUp) {
        pipeable_1.pipe(hoveredItem.value, Option_1.map(function (item) { return item.index; }), Option_1.alt(function () { return Option_1.some(0); }), Option_1.chain(function (index) {
            return Array_1.lookup(isUp ? Math.max(index - 1, 0) : Math.min(index + 1, autocompleteItems.value.length - 1), autocompleteItems.value);
        }), Option_1.fold(function_1.constant(function_1.constVoid), function (newItem) { return function () { return setHovered(newItem); }; }))();
    }
    return function onKeydown(event) {
        if (eventHelpers_1.isEnterEvent(event)) {
            event.preventDefault();
            if (Option_1.isSome(hoveredItem.value)) {
                setSelected(hoveredItem.value.value);
            }
        }
        else if (eventHelpers_1.isTabEvent(event)) {
            event.preventDefault();
            if (Option_1.isSome(hoveredItem.value)) {
                setSelected(hoveredItem.value.value);
            }
            else {
                vue_1.nextTick(closeDropdown);
            }
        }
        else if (eventHelpers_1.isArrowUpEvent(event)) {
            event.preventDefault();
            onArrowPress(true);
        }
        else if (eventHelpers_1.isArrowDownEvent(event)) {
            event.preventDefault();
            onArrowPress(false);
        }
        else if (eventHelpers_1.isEscEvent(event)) {
            event.preventDefault();
            vue_1.nextTick(closeDropdown);
        }
    };
}
function getGenerateItem(itemsRef, length, onKeydown, setSelected, setHovered, slots) {
    return function generateItem(item, index) {
        return vue_1.h(BDropdownItem_1["default"], {
            key: item.id,
            ref: function (el) {
                itemsRef.value[index] = el;
            },
            id: item.id,
            isActive: item.isSelected,
            tabindex: item.isSelected ? -1 : 0,
            'aria-selected': item.isSelected,
            'aria-label': "Option " + (index + 1) + " of " + length.value,
            "class": { 'is-hovered': item.isHovered },
            onClick: function () { return setSelected(item); },
            onMouseenter: function () { return setHovered(item); },
            onKeydown: onKeydown
        }, function () { return (slots["default"] ? slots["default"]({ option: item, index: index }) : item.text); });
    };
}
function generateHeaderItem(slots) {
    return vue_1.h('li', { tabindex: -1 }, [vue_1.h(BDropdownItem_1["default"], { tag: 'div' }, slots.header())]);
}
function generateLoadingItem(slots) {
    return vue_1.h('li', { tabindex: -1 }, [
        vue_1.h(BDropdownItem_1["default"], { tag: 'div' }, function () { return (slots.loading ? slots.loading() : 'Loading results...'); })
    ]);
}
function generateEmptyItem(modelValue, slots) {
    return vue_1.h(BDropdownItem_1["default"], {
        "class": 'is-disabled'
    }, function () { return (slots.empty ? slots.empty() : modelValue ? "No results" : "No results for " + modelValue); });
}
function defineAutocomplete() {
    return vue_1.defineComponent({
        name: 'b-autocomplete',
        props: __assign(__assign(__assign(__assign(__assign(__assign({}, useInput_1.StaticUseInputProps), shared_1.getEqPropsDefinition()), theme_1.useThemePropsDefinition(dropdown_1.DropdownThemeMap)), useModel_1.getUseModelPropsDefinition()), useModel_1.getUseModelPropsDefinition('selectedItems', 'onUpdate:selectedItems')), { selectedItems: {
                type: Array,
                required: true
            }, items: {
                type: Array,
                "default": helpers_1.constEmptyArray
            }, itemFilter: {
                type: Function,
                required: false
            }, itemId: {
                type: [String, Function],
                "default": 'id'
            }, itemText: {
                type: [String, Function],
                "default": 'text'
            }, closeOnSelect: {
                type: Boolean,
                "default": true
            }, clearOnSelect: {
                type: Boolean,
                "default": true
            }, openOnFocus: {
                type: Boolean,
                "default": true
            }, onSelected: {
                type: Function,
                required: false
            } }),
        setup: function (props, _a) {
            var slots = _a.slots;
            var searchValue = proxy_1.useProxy(vue_1.computed(function () { var _a; return (_a = props.modelValue) !== null && _a !== void 0 ? _a : ''; }), vue_1.toRef(props, 'onUpdate:modelValue')).value;
            var selectedItems = proxy_1.useProxy(vue_1.toRef(props, 'selectedItems'), vue_1.toRef(props, 'onUpdate:selectedItems')).value;
            var itemsRef = vue_1.shallowRef([]);
            var filteredItems = vue_1.computed(function () {
                return props.itemFilter ? props.items.filter(props.itemFilter(searchValue.value)) : props.items;
            });
            vue_1.onBeforeUpdate(function () { return (itemsRef.value = []); });
            var dropdown = vue_1.shallowRef(null);
            function close() {
                dropdown.value && dropdown.value.toggle.setOff();
            }
            var hoveredItem = vue_1.shallowRef(Option_1.none);
            var activeDescendentId = vue_1.computed(function () { return getActiveDescendentId(props.selectedItems, props.itemId); });
            var autocompleteItems = vue_1.computed(function () {
                return getAutocompleteItems(filteredItems.value, selectedItems.value, props.itemId, props.itemText, props.eq, hoveredItem.value);
            });
            var numberOfItems = vue_1.computed(function () { return autocompleteItems.value.length; });
            var setSelected = getSetSelected(props, close, searchValue, selectedItems);
            var setHovered = getSetHovered(hoveredItem, itemsRef);
            var onKeydown = getOnKeydown(autocompleteItems, hoveredItem, close, setSelected, setHovered);
            var generateItem = getGenerateItem(itemsRef, numberOfItems, onKeydown, setSelected, setHovered, slots);
            return function () {
                return vue_1.h(BDropdown_1["default"], {
                    ref: dropdown,
                    isMobileModal: false,
                    "class": ['b-autocomplete', { 'is-expanded': props.isExpanded }]
                }, {
                    trigger: function () {
                        return vue_1.h(input_1.BInput, {
                            modelValue: searchValue.value,
                            type: 'text',
                            size: props.size,
                            isLoading: props.isLoading,
                            isRounded: props.isRounded,
                            icon: props.icon,
                            maxlength: props.maxlength,
                            autocomplete: props.autocomplete || 'list',
                            placeholder: props.placeholder,
                            role: 'searchbox',
                            'aria-activedescendant': activeDescendentId.value,
                            'onUpdate:modelValue': function (val) {
                                searchValue.value = val;
                            },
                            onFocus: function () {
                                if (props.openOnFocus) {
                                    vue_1.nextTick(function () {
                                        var d = dropdown.value;
                                        if (d && d.toggle.isOff.value) {
                                            d.toggle.setOn();
                                        }
                                    });
                                }
                            },
                            onBlur: props.onBlur,
                            onKeydown: onKeydown
                        });
                    },
                    "default": function () {
                        var nodes;
                        if (props.isLoading) {
                            nodes = [generateLoadingItem(slots)];
                        }
                        else {
                            nodes = Array_1.isEmpty(autocompleteItems.value)
                                ? [generateEmptyItem(searchValue.value, slots)]
                                : autocompleteItems.value.map(generateItem);
                            if (slots.header) {
                                nodes.unshift(generateHeaderItem(slots), vue_1.h(BDropdownDivider_1["default"]));
                            }
                        }
                        return nodes;
                    }
                });
            };
        }
    });
}
exports.BAutocomplete = defineAutocomplete();
