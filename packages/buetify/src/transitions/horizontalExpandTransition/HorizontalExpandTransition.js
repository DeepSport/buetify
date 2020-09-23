"use strict";
exports.__esModule = true;
exports.HorizontalExpandTransition = void 0;
require("../../sass/helpers/animations.sass");
var createJavascriptTransition_1 = require("../shared/createJavascriptTransition");
var expandTransition_1 = require("../shared/expandTransition");
exports.HorizontalExpandTransition = createJavascriptTransition_1.createJavascriptTransition('is-horizontal-expand-transition', expandTransition_1.createExpandTransition('expand-horizontal-transition', true));
