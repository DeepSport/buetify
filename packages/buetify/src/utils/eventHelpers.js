"use strict";
exports.__esModule = true;
exports.isTabEvent = exports.isArrowUpEvent = exports.isArrowLeftEvent = exports.isArrowRightEvent = exports.isArrowDownEvent = exports.isEscEvent = exports.isSpaceEvent = exports.isEnterEvent = void 0;
function isEnterEvent(e) {
    return e.key === 'Enter' || e.keyCode === 13;
}
exports.isEnterEvent = isEnterEvent;
function isSpaceEvent(e) {
    return e.code === 'Space' || e.which === 32 || e.key === ' ';
}
exports.isSpaceEvent = isSpaceEvent;
function isEscEvent(e) {
    return e.key === 'Escape' || e.code === 'Escape' || e.which === 27;
}
exports.isEscEvent = isEscEvent;
function isArrowDownEvent(e) {
    return e.key === 'ArrowDown' || e.code === 'ArrowDown' || e.which === 40;
}
exports.isArrowDownEvent = isArrowDownEvent;
function isArrowRightEvent(e) {
    return e.key === 'ArrowRight' || e.code === 'ArrowRight' || e.which === 39;
}
exports.isArrowRightEvent = isArrowRightEvent;
function isArrowLeftEvent(e) {
    return e.key === 'ArrowLeft' || e.code === 'ArrowLeft' || e.which === 37;
}
exports.isArrowLeftEvent = isArrowLeftEvent;
function isArrowUpEvent(e) {
    return e.key === 'ArrowUp' || e.code === 'ArrowUp' || e.which === 38;
}
exports.isArrowUpEvent = isArrowUpEvent;
function isTabEvent(e) {
    return e.key === 'Tab' || e.code === 'Tab' || e.which === 9;
}
exports.isTabEvent = isTabEvent;
