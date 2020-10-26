"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = exports.routes = exports.meta = void 0;
var tslib_1 = require("tslib");
var BuetifyMenu_1 = require("../shared/BuetifyMenu");
var start = tslib_1.__importStar(require("./start"));
var usage = tslib_1.__importStar(require("./usage"));
exports.meta = (_a = {},
    _a[start.meta.fullPath] = start.meta,
    _a[usage.meta.fullPath] = usage.meta,
    _a);
exports.routes = [start.route, usage.route];
exports.menu = BuetifyMenu_1.group('Installation', [start.menu, usage.menu]);
//# sourceMappingURL=index.js.map