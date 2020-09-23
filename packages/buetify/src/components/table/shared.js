"use strict";
exports.__esModule = true;
exports.toggleBTableRow = exports.eqColumnTableData = exports.eqBTableRowData = exports.eqBTableRow = void 0;
var Eq_1 = require("fp-ts/lib/Eq");
var helpers_1 = require("../../utils/helpers");
exports.eqBTableRow = Eq_1.eq.contramap(Eq_1.eqString, function (row) { return row.id; });
exports.eqBTableRowData = exports.eqBTableRow;
exports.eqColumnTableData = Eq_1.eq.contramap(Eq_1.eqString, function (column) { return column.label; });
exports.toggleBTableRow = helpers_1.toggleListItem(exports.eqBTableRow);
