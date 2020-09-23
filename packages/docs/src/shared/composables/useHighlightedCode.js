"use strict";
exports.__esModule = true;
exports.useHighlightedCode = void 0;
var vue_1 = require("vue");
var core_1 = require("highlight.js/lib/core");
var xml_1 = require("highlight.js/lib/languages/xml");
var typescript_1 = require("highlight.js/lib/languages/typescript");
require("highlight.js/styles/github.css");
core_1["default"].registerLanguage('html', xml_1["default"]);
core_1["default"].registerLanguage('typescript', typescript_1["default"]);
function useHighlightedCode(props) {
    return vue_1.computed(function () { return core_1["default"].highlight(props.lang, props.code, true); });
}
exports.useHighlightedCode = useHighlightedCode;
