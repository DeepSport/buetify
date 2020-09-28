"use strict";
exports.__esModule = true;
exports.useFieldData = void 0;
var vue_1 = require("vue");
var provideFieldData_1 = require("./provideFieldData");
function useFieldData() {
    return vue_1.inject(provideFieldData_1.PROVIDE_FIELD_DATA_INJECTION_SYMBOL, provideFieldData_1.DEFAULT_FIELD_DATA_INJECTION);
}
exports.useFieldData = useFieldData;
