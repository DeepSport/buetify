"use strict";
exports.__esModule = true;
exports.createExpandTransition = void 0;
var helpers_1 = require("../../utils/helpers");
function createExpandTransition(expandedParentClass, x) {
    if (expandedParentClass === void 0) { expandedParentClass = ''; }
    if (x === void 0) { x = false; }
    var sizeProperty = x ? 'width' : 'height';
    var offsetProperty = "offset" + helpers_1.capitalizeFirstLetter(sizeProperty);
    function resetStyles(el) {
        var size = el._initialStyle[sizeProperty];
        el.style.overflow = el._initialStyle.overflow;
        if (size != null)
            el.style[sizeProperty] = size;
        delete el._initialStyle;
    }
    function onAfterLeave(el) {
        if (expandedParentClass && el._parent) {
            el._parent.classList.remove(expandedParentClass);
        }
        resetStyles(el);
    }
    return {
        onBeforeEnter: function (el) {
            var _a;
            el._parent = el.parentNode;
            el._initialStyle = (_a = {
                    transition: el.style.transition,
                    visibility: el.style.visibility,
                    overflow: el.style.overflow
                },
                _a[sizeProperty] = el.style[sizeProperty],
                _a);
        },
        onEnter: function (el) {
            var initialStyle = el._initialStyle;
            var offset = el[offsetProperty] + "px";
            el.style.setProperty('transition', 'none', 'important');
            el.style.visibility = 'hidden';
            el.style.visibility = initialStyle.visibility;
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = '0';
            void el.offsetHeight; // force reflow
            el.style.transition = initialStyle.transition;
            if (expandedParentClass && el._parent) {
                el._parent.classList.add(expandedParentClass);
            }
            requestAnimationFrame(function () {
                el.style[sizeProperty] = offset;
            });
        },
        onAfterEnter: resetStyles,
        onEnterCancelled: resetStyles,
        onLeave: function (el) {
            var _a;
            el._initialStyle = (_a = {
                    transition: '',
                    visibility: '',
                    overflow: el.style.overflow
                },
                _a[sizeProperty] = el.style[sizeProperty],
                _a);
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = el[offsetProperty] + "px";
            void el.offsetHeight; // force reflow
            requestAnimationFrame(function () { return (el.style[sizeProperty] = '0'); });
        },
        onAfterLeave: onAfterLeave,
        onLeaveCancelled: onAfterLeave
    };
}
exports.createExpandTransition = createExpandTransition;
