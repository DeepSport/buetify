"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var theme_1 = require("../../composables/theme");
var AdjustIcon_1 = require("../icons/adjust/AdjustIcon");
var BTooltip_1 = require("../tooltip/BTooltip");
exports["default"] = vue_1.defineComponent({
    name: 'b-theme-toggle',
    setup: function (_, _a) {
        var slots = _a.slots;
        var toggleTheme = theme_1.useTheme().toggleTheme;
        return function () {
            return vue_1.h('button', { 'aria-label': 'toggle color theme', onClick: toggleTheme }, [
                vue_1.h(BTooltip_1["default"], {
                    label: 'Toggle color theme'
                }, function () { return (slots["default"] ? slots["default"]() : vue_1.h(AdjustIcon_1["default"])); })
            ]);
        };
    }
});
