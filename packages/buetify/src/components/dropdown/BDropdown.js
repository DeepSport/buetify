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
exports.BDropdownPropsDefinition = void 0;
require("./dropdown.sass");
var theme_1 = require("../../composables/theme");
var toggle_1 = require("../../composables/toggle");
var transition_1 = require("../../composables/transition");
var windowSize_1 = require("../../composables/windowSize");
var vue_1 = require("vue");
var clickOutside_1 = require("../../directives/clickOutside");
var helpers_1 = require("../../utils/helpers");
var theme_2 = require("./theme");
exports.BDropdownPropsDefinition = __assign(__assign(__assign(__assign({}, theme_1.useThemePropsDefinition(theme_2.DropdownThemeMap)), toggle_1.getUseTogglePropsDefinition('isExpanded')), transition_1.FadeTransitionPropsDefinition), { id: String, isDisabled: {
        type: Boolean,
        "default": false
    }, isHoverable: {
        type: Boolean,
        "default": false
    }, isInline: {
        type: Boolean,
        "default": false
    }, position: {
        type: String,
        validator: function (value) {
            return helpers_1.isString(value) && ['is-top-right', 'is-top-left', 'is-bottom-left'].includes(value);
        }
    }, isMobileModal: {
        type: Boolean,
        "default": true
    }, menuTag: {
        type: String,
        "default": 'ul'
    } });
var id = 0;
function generateTrigger(toggle, id, slots) {
    return vue_1.h('div', {
        ref: 'trigger',
        "class": 'dropdown-trigger',
        role: 'button',
        'aria-owns': id,
        'aria-haspopup': 'listbox',
        'aria-expanded': "" + toggle.isOn.value,
        onClick: toggle.toggle
    }, slots.trigger && slots.trigger(toggle));
}
function generateTransition(transition, children) {
    return vue_1.h(vue_1.Transition, transition, children);
}
function useCloseConditional(toggle, isInWhiteList) {
    return function (e) {
        var target = e.target;
        return toggle.isOn.value && isInWhiteList(target);
    };
}
function generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots) {
    return vue_1.h(menuTag, {
        "class": __spreadArrays(['dropdown-content'], themeClasses),
        role: 'menu',
        id: computedId,
        'aria-hidden': toggle.isOff.value
    }, slots["default"] && slots["default"](toggle));
}
function generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, useTransition) {
    if (useTransition === void 0) { useTransition = true; }
    var menu = function () {
        return toggle.isOn.value
            ? vue_1.h('div', {
                ref: 'dropdownMenu',
                "class": 'dropdown-menu'
            }, [generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots)])
            : undefined;
    };
    return useTransition ? generateTransition(transition, menu) : menu();
}
function generateMobileBackground(menuTag, toggle, computedId, themeClasses, transition, slots) {
    return generateTransition(transition, function () {
        return vue_1.withDirectives(vue_1.h('div', {
            "class": 'background',
            'aria-hidden': toggle.isOff.value,
            onClick: toggle.setOff
        }, [generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, false)]), [[vue_1.vShow, toggle.isOn.value]]);
    });
}
function generateChildren(menuTag, isInline, toggle, computedId, transition, themeClasses, shouldDisplayMobileBackground, slots) {
    var children = [];
    if (!isInline) {
        children.push(generateTrigger(toggle, computedId, slots));
    }
    if (shouldDisplayMobileBackground) {
        children.push(generateMobileBackground(menuTag, toggle, computedId, themeClasses, transition, slots));
    }
    else {
        var menu = generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots);
        if (menu) {
            children.push(menu);
        }
    }
    return children;
}
exports["default"] = vue_1.defineComponent({
    name: 'b-dropdown',
    props: exports.BDropdownPropsDefinition,
    setup: function (props) {
        var windowSize = windowSize_1.useWindowSize();
        var toggle = toggle_1.useToggle(props, 'isExpanded');
        var themeClasses = theme_1.useTheme(props).themeClasses;
        var transition = transition_1.useTransition(props);
        var root = vue_1.shallowRef(null);
        var trigger = vue_1.shallowRef(null);
        var dropdownMenu = vue_1.shallowRef(null);
        var computedId = vue_1.computed(function () { var _a; return "dropdown-menu-" + ((_a = props.id) !== null && _a !== void 0 ? _a : id++); });
        var rootClasses = vue_1.computed(function () { return [
            props.position,
            {
                'is-disabled': props.isDisabled,
                'is-hoverable': props.isHoverable,
                'is-inline': props.isInline,
                'is-active': toggle.isOn.value || props.isInline,
                'is-mobile-modal': props.isMobileModal
            }
        ]; });
        var displayMenu = vue_1.computed(function () { return (!props.isDisabled && (toggle.isOn.value || props.isHoverable)) || props.isInline; });
        var isMobileModal = vue_1.computed(function () { return props.isMobileModal && !props.isInline && !props.isHoverable; });
        var displayMobileBackground = vue_1.computed(function () { return isMobileModal.value && windowSize.value.isTouch; });
        function getDependentElements() {
            var _a, _b;
            return Array.from((_b = (_a = dropdownMenu.value) === null || _a === void 0 ? void 0 : _a.querySelectorAll('*')) !== null && _b !== void 0 ? _b : []);
        }
        function isInDropdown(el) {
            return dropdownMenu.value !== undefined && dropdownMenu.value.contains(el);
        }
        function isInTrigger(el) {
            return trigger.value !== undefined && trigger.value.contains(el);
        }
        function isInWhiteList(el) {
            if (el === root.value)
                return true;
            if (el === dropdownMenu.value)
                return true;
            if (el === trigger.value)
                return true;
            return isInDropdown(el) || isInTrigger(el);
        }
        var menuToggle = __assign(__assign({}, toggle), { isOn: displayMenu, isOff: vue_1.computed(function () { return !displayMenu.value; }) });
        var closeConditional = useCloseConditional(menuToggle, isInWhiteList);
        var clickOutsideArgs = {
            include: getDependentElements,
            closeConditional: closeConditional
        };
        return {
            root: root,
            rootClasses: rootClasses,
            clickOutsideArgs: clickOutsideArgs,
            toggle: toggle,
            transition: transition,
            themeClasses: themeClasses,
            dropdownMenu: dropdownMenu,
            displayMobileBackground: displayMobileBackground,
            menuToggle: menuToggle,
            trigger: trigger,
            computedId: computedId
        };
    },
    render: function () {
        return vue_1.withDirectives(vue_1.h('div', { ref: 'root', "class": __spreadArrays(['dropdown'], this.rootClasses) }, generateChildren(this.menuTag, this.isInline, this.menuToggle, this.computedId, this.transition, this.themeClasses, this.displayMobileBackground, this.$slots)), [[clickOutside_1["default"], this.toggle.setOff, this.clickOutsideArgs]]);
    }
});
