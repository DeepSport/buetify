"use strict";
exports.__esModule = true;
exports.toSet = void 0;
function toSet(rows) {
    var set = new Set();
    rows.forEach(function (row) { return set.add(row.id); });
    return set;
}
exports.toSet = toSet;
