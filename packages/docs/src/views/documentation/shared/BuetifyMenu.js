"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = exports.group = void 0;
function group(label, items) {
    return {
        _tag: 'group',
        label: label,
        items: items
    };
}
exports.group = group;
function link(label, fullPath) {
    return {
        _tag: 'item',
        label: label,
        fullPath: fullPath
    };
}
exports.link = link;
//# sourceMappingURL=BuetifyMenu.js.map