"use strict";
exports.__esModule = true;
exports.getEqPropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var Eq_1 = require("fp-ts/lib/Eq");
var helpers_1 = require("../../utils/helpers");
var eqDeep = Eq_1.fromEquals(helpers_1.deepEqual);
function getEqPropsDefinition(eq) {
    if (eq === void 0) { eq = eqDeep; }
    return {
        eq: {
            type: Object,
            "default": function_1.constant(eq)
        }
    };
}
exports.getEqPropsDefinition = getEqPropsDefinition;
