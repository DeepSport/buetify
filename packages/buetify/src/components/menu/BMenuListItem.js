"use strict";
exports.__esModule = true;
require("./menu.sass");
var getThemeableFunctionalComponent_1 = require("../../utils/getThemeableFunctionalComponent");
var theme_1 = require("./theme");
exports["default"] = getThemeableFunctionalComponent_1.getThemeableFunctionalComponent({ cls: 'menu-list-item', el: 'li', themeMap: theme_1.MenuListItemThemeMap });
