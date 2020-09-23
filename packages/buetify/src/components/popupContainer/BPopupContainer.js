"use strict";
exports.__esModule = true;
exports.removePopup = exports.eqPopup = void 0;
var Eq_1 = require("fp-ts/lib/Eq");
var vue_1 = require("vue");
var transition_1 = require("../../composables/transition");
var helpers_1 = require("../../utils/helpers");
exports.eqPopup = Eq_1.eq.contramap(Eq_1.eqNumber, function (popup) { return popup.id; });
exports.removePopup = helpers_1.removeListItem(exports.eqPopup);
var id = 0;
var BPopupContainer = vue_1.defineComponent({
    name: 'b-popup-container',
    setup: function () {
        var popups = vue_1.ref([]);
        function showPopup(options) {
            var nid = id++;
            var popup = vue_1.reactive({ id: nid, render: helpers_1.constEmptyArray, transition: transition_1.formatTransition(options.transition) });
            popups.value.push(popup);
            vue_1.nextTick(function () { popup.render = options.render; });
            return function () {
                popup.render = helpers_1.constEmptyArray;
                setTimeout(function () {
                    var index = popups.value.findIndex(function (p) { return p.id === nid; });
                    if (index > 0) {
                        popups.value.splice(index, 1);
                    }
                }, 250);
            };
        }
        var rootZ = vue_1.computed(function () { return popups.value.length ? 1 : 0; });
        return {
            showPopup: showPopup,
            popups: popups,
            rootZ: rootZ
        };
    },
    methods: {
        generatePopup: function (popup, index) {
            return vue_1.h('div', { key: popup.id, style: { 'z-index': index + 1 } }, [
                vue_1.h(vue_1.Transition, popup.transition, popup.render)
            ]);
        }
    },
    render: function () {
        return vue_1.h('div', { style: { 'z-index': this.rootZ } }, this.rootZ ? this.popups.map(this.generatePopup) : undefined);
    }
});
exports["default"] = BPopupContainer;
