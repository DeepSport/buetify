export function isEnterEvent(e) {
    return e.key === 'Enter' || e.keyCode === 13;
}
export function isSpaceEvent(e) {
    return e.code === 'Space' || e.which === 32 || e.key === ' ';
}
export function isEscEvent(e) {
    return e.key === 'Escape' || e.code === 'Escape' || e.which === 27;
}
export function isArrowDownEvent(e) {
    return e.key === 'ArrowDown' || e.code === 'ArrowDown' || e.which === 40;
}
export function isArrowRightEvent(e) {
    return e.key === 'ArrowRight' || e.code === 'ArrowRight' || e.which === 39;
}
export function isArrowLeftEvent(e) {
    return e.key === 'ArrowLeft' || e.code === 'ArrowLeft' || e.which === 37;
}
export function isArrowUpEvent(e) {
    return e.key === 'ArrowUp' || e.code === 'ArrowUp' || e.which === 38;
}
export function isTabEvent(e) {
    return e.key === 'Tab' || e.code === 'Tab' || e.which === 9;
}
//# sourceMappingURL=eventHelpers.js.map