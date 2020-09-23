"use strict";
exports.__esModule = true;
require("../../sass/helpers/animations.sass");
var createJavascriptTransition_1 = require("../shared/createJavascriptTransition");
var expandTransition_1 = require("../shared/expandTransition");
exports["default"] = createJavascriptTransition_1.createJavascriptTransitionGroup('vertical-expand-transition', expandTransition_1.createExpandTransition('expand-vertical-transition'));
