"use strict";
// from buefy
exports.__esModule = true;
exports.useSlug = exports.toSlug = void 0;
var vue_1 = require("vue");
function toSlug(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
exports.toSlug = toSlug;
function useSlug(text) {
    return vue_1.computed(function () { return toSlug(text.value); });
}
exports.useSlug = useSlug;
