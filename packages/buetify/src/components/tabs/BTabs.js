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
exports.BTabsPropsDefinition = void 0;
require("./tabs.sass");
var model_1 = require("../../composables/model");
var theme_1 = require("../../composables/theme");
var helpers_1 = require("../../utils/helpers");
var BScroll_1 = require("../scroll/BScroll");
var vue_1 = require("vue");
var Option_1 = require("fp-ts/lib/Option");
var shared_1 = require("./shared");
var theme_2 = require("./theme");
exports.BTabsPropsDefinition = __assign(__assign(__assign({}, model_1.getUseModelPropsDefinition()), theme_1.useThemePropsDefinition(theme_2.TabsThemeMap)), { isExpanded: {
        type: Boolean,
        "default": false
    }, type: {
        type: String,
        "default": ''
    }, size: {
        type: String,
        "default": ''
    }, position: {
        type: String,
        "default": ''
    }, label: {
        type: String
    }, variant: {
        type: String,
        "default": ''
    }, isAnimated: {
        type: Boolean,
        "default": true
    }, isScrollable: {
        type: Boolean,
        "default": false
    } });
function useOnTabItemClick(tab, index, model, activeLabel, transition) {
    return function () {
        var val = model.modelValue.value || 0;
        if (val !== index) {
            transition.value = index < val ? 'slide-next' : 'slide-prev';
            vue_1.nextTick(function () {
                model.set(index);
                activeLabel.value = Option_1.some(tab.props.label);
            });
        }
    };
}
function useGenerateNavItem(props, model, activeLabel, transition) {
    return function generateNavItem(step, index) {
        return vue_1.h('li', {
            key: step.props.label,
            "class": [
                {
                    'is-active': index === model.modelValue.value,
                    'is-disabled': step.props.isDisabled
                }
            ]
        }, [
            vue_1.h('a', { onClick: useOnTabItemClick(step, index, model, activeLabel, transition) }, step.props.icon
                ? [
                    vue_1.h(step.props.icon, {
                        size: props.size
                    }),
                    step.props.label
                ]
                : step.props.label)
        ]);
    };
}
function generateNavLabel(props) {
    return vue_1.h('label', {
        "class": ['label is-marginless align-self-center', props.size]
    }, props.label);
}
function generateNavItems(props, tabs, model, activeLabel, transition) {
    return vue_1.h('ul', tabs.map(useGenerateNavItem(props, model, activeLabel, transition)));
}
function generateNavHeaderContent(props, tabs, model, activeLabel, transition, themeClasses) {
    return vue_1.h('nav', {
        "class": [
            'tabs',
            props.type,
            props.size,
            props.position,
            {
                'is-fullwidth': !!props.isExpanded || !!props.isScrollable,
                'is-toggle-rounded is-toggle': props.type === 'is-toggle-rounded'
            }
        ].concat(props.variant === '' ? themeClasses : [props.variant])
    }, props.label
        ? [generateNavLabel(props), generateNavItems(props, tabs, model, activeLabel, transition)]
        : [generateNavItems(props, tabs, model, activeLabel, transition)]);
}
function generateNavHeader(props, tabs, model, activeLabel, transition, themeClasses) {
    return props.isScrollable
        ? vue_1.h(BScroll_1["default"], { "class": 'is-fullwidth' }, function () { return [
            generateNavHeaderContent(props, tabs, model, activeLabel, transition, themeClasses)
        ]; })
        : generateNavHeaderContent(props, tabs, model, activeLabel, transition, themeClasses);
}
function generateTabContent(props, tabs, model, transition) {
    return props.isAnimated
        ? vue_1.h(vue_1.Transition, { name: transition.value }, function () { return tabs[model.modelValue.value || 0]; })
        : tabs[model.modelValue.value || 0];
}
function isBTabItemNode(node) {
    return (helpers_1.isObject(node) &&
        helpers_1.isObject(node.type) &&
        node.type.name === shared_1.TAB_ITEM_NAME &&
        (node.props['is-visible'] === undefined ||
            node.props['is-visible'] ||
            node.props.isVisible === undefined ||
            node.props.isVisible));
}
function getTabs(slots) {
    return (((slots["default"] && slots["default"]()) ||
        []).flatMap(function (node) { return (helpers_1.isFragment(node) ? node.children : [node]); }).filter(isBTabItemNode));
}
exports["default"] = vue_1.defineComponent({
    name: 'b-tabs',
    props: exports.BTabsPropsDefinition,
    setup: function (props, context) {
        var themeClasses = theme_1.useTheme(props).themeClasses;
        var model = model_1.useModel(props);
        var transition = vue_1.shallowRef('slide-next');
        var injection = {
            activeLabel: vue_1.shallowRef(Option_1.none)
        };
        vue_1.provide(shared_1.TABS_SYMBOL, injection);
        vue_1.onBeforeMount(function () {
            if (model.modelValue.value === undefined) {
                model.set(0);
            }
        });
        return function () {
            var tabs = getTabs(context.slots);
            return vue_1.h('article', { "class": 'b-tabs' }, [
                generateNavHeader(props, tabs, model, injection.activeLabel, transition, themeClasses.value),
                generateTabContent(props, tabs, model, transition)
            ]);
        };
    }
});
