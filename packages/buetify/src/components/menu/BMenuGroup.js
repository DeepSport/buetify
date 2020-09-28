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
require("./menu.sass");
var toggle_1 = require("../../composables/toggle");
var verticalExpandTransition_1 = require("../../transitions/verticalExpandTransition");
var VerticalExpansionIcon_1 = require("../icons/verticalExpansion/VerticalExpansionIcon");
var BMenuList_1 = require("./BMenuList");
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'b-menu-group',
    props: __assign(__assign({}, toggle_1.getUseTogglePropsDefinition('isExpanded')), { isExpandable: {
            type: Boolean,
            "default": false
        }, menuLabelClass: {
            type: [String, Object, Array],
            "default": ''
        }, menuListClass: {
            type: [String, Object, Array],
            "default": ''
        } }),
    setup: function (props, _a) {
        var slots = _a.slots;
        var toggle = toggle_1.useToggle(props, 'isExpanded');
        return function () {
            return vue_1.h('section', [
                props.isExpandable
                    ? vue_1.h('button', __assign(__assign({ "class": [
                            'is-flex flex-direction-row justify-content-space-between align-items-center is-fullwidth',
                            props.menuLabelClass
                        ] }, toggle.listeners), toggle.attrs.value), [
                        slots['menu-label'] && slots['menu-label'](),
                        vue_1.h(VerticalExpansionIcon_1["default"], {
                            isExpanded: toggle.isOn.value
                        })
                    ])
                    : vue_1.h('div', { "class": 'padding-bottom-size-8' }, slots['menu-label'] && slots['menu-label']()),
                props.isExpandable
                    ? vue_1.h(verticalExpandTransition_1["default"], undefined, function () { return [
                        vue_1.withDirectives(vue_1.h(BMenuList_1["default"], {
                            "class": [props.menuListClass, 'expand-vertical-transition'],
                            'aria-hidden': toggle.isOff.value
                        }, slots["default"]), [[vue_1.vShow, toggle.isOn.value]])
                    ]; })
                    : vue_1.h(BMenuList_1["default"], {
                        "class": props.menuListClass
                    }, slots["default"])
            ]);
        };
    }
});
