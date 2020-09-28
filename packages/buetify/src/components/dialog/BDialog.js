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
require("./dialog.sass");
var Array_1 = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var popupController_1 = require("../../composables/popupController");
var helpers_1 = require("../../utils/helpers");
var BOverlay_1 = require("../overlay/BOverlay");
var BDialogContent_1 = require("./BDialogContent");
var vue_1 = require("vue");
function containsBDialogContent(node) {
    var _a, _b, _c;
    var components = (helpers_1.isObject(node) && ((_b = (_a = node) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.components)) || {};
    for (var k in components) {
        if (((_c = components[k]) === null || _c === void 0 ? void 0 : _c.name) === BDialogContent_1.B_DIALOG_CONTENT_NAME) {
            return true;
        }
    }
    return false;
}
exports["default"] = vue_1.defineComponent({
    name: 'b-dialog',
    props: popupController_1.UsePopupControllerPropsDefinition,
    setup: function (props, _a) {
        var attrs = _a.attrs, slots = _a.slots;
        var generateDialog = vue_1.shallowRef(helpers_1.constEmptyArray);
        var popup = popupController_1.usePopupController(props, generateDialog);
        generateDialog.value = function () {
            return [
                vue_1.h(BOverlay_1["default"], __assign(__assign({}, attrs), { "class": 'dialog', isActive: true, onClick: popup.close }), function () {
                    var nodes = slots["default"] ? slots["default"](popup) : [];
                    var isDialogContent = function_1.pipe(Array_1.head(nodes), Option_1.exists(containsBDialogContent));
                    return isDialogContent
                        ? nodes
                        : vue_1.h(BDialogContent_1["default"], {
                            asCard: false
                        }, {
                            header: function () { return slots.header && slots.header(popup); },
                            "default": function () { return nodes; },
                            footer: function () { return slots.footer && slots.footer(popup); }
                        });
                })
            ];
        };
        return function () { return slots.trigger && slots.trigger(popup); };
    }
});
