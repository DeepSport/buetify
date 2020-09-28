"use strict";
exports.__esModule = true;
require("./scroll.sass");
var getSimpleFunctionalComponent_1 = require("../../utils/getSimpleFunctionalComponent");
function testWindowScrollbar() {
    var parent = document.createElement('div');
    parent.setAttribute('style', 'width:30px;height:30px;');
    parent.classList.add('scrollbar-test');
    var child = document.createElement('div');
    child.setAttribute('style', 'width:100%;height:40px');
    parent.appendChild(child);
    document.body.appendChild(parent);
    // eslint-disable-next-line
    // @ts-ignore
    var scrollbarWidth = 30 - parent.firstChild.clientWidth;
    if (scrollbarWidth) {
        document.body.classList.add('layout-scrollbar-obtrusive');
    }
    document.body.removeChild(parent);
}
requestAnimationFrame(testWindowScrollbar);
exports["default"] = getSimpleFunctionalComponent_1.getSimpleFunctionalComponent('b-scroll', 'div');
