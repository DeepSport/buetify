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
exports.BStepsPropsDefinition = void 0;
require("./steps.sass");
var model_1 = require("../../composables/model");
var theme_1 = require("../../composables/theme");
var helpers_1 = require("../../utils/helpers");
var Array_1 = require("fp-ts/lib/Array");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
var shared_1 = require("./shared");
exports.BStepsPropsDefinition = __assign(__assign(__assign({}, model_1.getUseModelPropsDefinition()), theme_1.DefaultThemePropsDefinition), { variant: {
        type: String,
        "default": 'is-link'
    }, size: {
        type: String,
        "default": ''
    }, isAnimated: {
        type: Boolean,
        "default": true
    } });
function getOnStepItemClick(step, index, model, activeLabel, transition) {
    return function () {
        var val = model.modelValue.value || 0;
        if (val !== index) {
            transition.value = index < val ? 'slide-next' : 'slide-prev';
            vue_1.nextTick(function () {
                model.set(index);
                activeLabel.value = Option_1.some(step.props.label);
            });
        }
    };
}
function getGenerateNavItem(props, model, activeLabel, transition) {
    return function generateNavItem(step, index) {
        return vue_1.h('li', {
            key: step.props.label,
            "class": [
                {
                    'is-active': index === model.modelValue.value
                }
            ]
        }, [
            vue_1.h('a', { onClick: getOnStepItemClick(step, index, model, activeLabel, transition) }, step.props.icon ? [vue_1.h(step.props.icon), step.props.label] : step.props.label)
        ]);
    };
}
function generateNavItems(props, tabs, model, activeLabel, transition) {
    return vue_1.h('ul', tabs.map(getGenerateNavItem(props, model, activeLabel, transition)));
}
function generateNavHeaderContent(props, steps, model, activeLabel, transition, themeClasses) {
    return vue_1.h('nav', {
        "class": __spreadArrays(['tabs', props.size], (props.variant === '' ? themeClasses : [props.variant]))
    }, generateNavItems(props, steps, model, activeLabel, transition));
}
function generateNavHeader(props, steps, model, activeLabel, transition, themeClasses) {
    return generateNavHeaderContent(props, steps, model, activeLabel, transition, themeClasses);
}
function generateStepContent(props, steps, model, transition) {
    return props.isAnimated
        ? vue_1.h(vue_1.Transition, { name: transition.value }, function () { return steps[model.modelValue.value || 0]; })
        : steps[model.modelValue.value || 0];
}
function isStepItemNode(node) {
    return (helpers_1.isObject(node) &&
        helpers_1.isObject(node.type) &&
        node.type.name === shared_1.STEP_ITEM_NAME &&
        (node.props['is-visible'] === undefined ||
            node.props['is-visible'] ||
            node.props.isVisible === undefined ||
            node.props.isVisible));
}
function getSteps(slots) {
    return pipeable_1.pipe(slots["default"] ? slots["default"]() : [], Array_1.head, Option_1.chain(function (fragment) {
        return fragment.children && Array.isArray(fragment.children) ? Option_1.some(fragment.children.filter(vue_1.isVNode)) : Option_1.none;
    }), Option_1.getOrElse(helpers_1.constEmptyArray)).filter(isStepItemNode);
}
exports["default"] = vue_1.defineComponent({
    name: 'b-steps',
    props: exports.BStepsPropsDefinition,
    setup: function (props, context) {
        var themeClasses = theme_1.useTheme(props).themeClasses;
        var model = model_1.useModel(props);
        var transition = vue_1.shallowRef('slide-next');
        var injection = {
            activeLabel: vue_1.shallowRef(Option_1.none)
        };
        vue_1.provide(shared_1.STEPS_SYMBOL, injection);
        vue_1.onBeforeMount(function () {
            if (model.modelValue.value === undefined) {
                model.set(0);
            }
        });
        return function () {
            var steps = getSteps(context.slots);
            return vue_1.h('article', { "class": 'b-steps' }, [
                generateNavHeader(props, steps, model, injection.activeLabel, transition, themeClasses.value),
                generateStepContent(props, steps, model, transition)
            ]);
        };
    }
});
