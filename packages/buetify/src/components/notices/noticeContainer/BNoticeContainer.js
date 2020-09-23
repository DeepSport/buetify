"use strict";
exports.__esModule = true;
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var transition_1 = require("../../../composables/transition");
var vue_1 = require("vue");
var helpers_1 = require("../../../utils/helpers");
var BNoticeContainer = vue_1.defineComponent({
    name: 'b-notice-container',
    data: function () { return ({
        id: 0,
        notice: Option_1.none
    }); },
    computed: {
        rootZIndex: function () {
            return Option_1.isNone(this.notice) ? -1 : 1;
        },
        extractedNotice: function () {
            return pipeable_1.pipe(this.notice, Option_1.getOrElse(function_1.constant({ transition: { name: 'fade' }, render: helpers_1.constEmptyArray })));
        }
    },
    methods: {
        addNotice: function (options) {
            var _this = this;
            var notice = { render: options.render, transition: transition_1.formatTransition(options.transition) };
            this.notice = Option_1.some(notice);
            return function () {
                _this.notice = Option_1.none;
            };
        },
        showNotice: function (params) {
            var _this = this;
            if (params.shouldQueue && !Option_1.isNone(this.notice)) {
                setTimeout(function () { return _this.showNotice(params); }, 250);
                return function_1.constVoid;
            }
            var removeNotice = this.addNotice(params);
            if (params.duration === 0) {
                return removeNotice;
            }
            else {
                setTimeout(removeNotice, params.duration);
                return function_1.constVoid;
            }
        },
        generateNotice: function () {
            return vue_1.h(vue_1.Transition, this.extractedNotice.transition, this.extractedNotice.render);
        }
    },
    render: function () {
        return vue_1.h('div', { style: { 'z-index': this.rootZIndex } }, [this.generateNotice()]);
    }
});
exports["default"] = BNoticeContainer;
