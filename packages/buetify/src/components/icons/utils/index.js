"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.useIconComponent = exports.useFontAwesomeIconComponent = exports.classList = void 0;
var fontawesome_svg_core_1 = require("@fortawesome/fontawesome-svg-core");
var vue_1 = require("vue");
// import { IconDefinition } from '@fortawesome/fontawesome-common-types';
var helpers_1 = require("../../../utils/helpers");
var mergeClasses_1 = require("../../../utils/mergeClasses");
var icon_1 = require("../../icon");
var BIcon_1 = require("../../icon/BIcon");
//replace iconDefinition with actual definition from fontawesome. causing some typescript issues at the moment
function objectWithKey(key, value) {
    var _a;
    return (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value) ? (_a = {}, _a[key] = value, _a) : {};
}
// eslint-disable-next-line
function classList(props) {
    var _a;
    var classes = (_a = {
            'fa-spin': props.spin,
            'fa-pulse': props.pulse,
            'fa-fw': props.fixedWidth,
            'fa-border': props.border,
            'fa-li': props.listItem,
            'fa-inverse': props.inverse,
            'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
            'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both'
        },
        _a["fa-" + props.size] = props.size !== undefined,
        _a["fa-rotate-" + props.rotation] = props.rotation !== undefined,
        _a["fa-pull-" + props.pull] = props.pull !== undefined,
        _a['fa-swap-opacity'] = props.swapOpacity,
        _a);
    return Object.keys(classes)
        .map(function (key) { return (classes[key] ? key : null); })
        .filter(function (key) { return key; });
}
exports.classList = classList;
function styleToObject(style) {
    return style
        .split(';')
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s; })
        .reduce(function (acc, pair) {
        var i = pair.indexOf(':');
        var prop = helpers_1.camelize(pair.slice(0, i));
        var value = pair.slice(i + 1).trim();
        acc[prop] = value;
        return acc;
    }, {}); // eslint-disable-line
}
function classToObject(cls) {
    return cls.split(/\s+/).reduce(function (acc, c) {
        acc[c] = true;
        return acc;
    }, {}); // eslint-disable-line
}
// eslint-disable-next-line
function normalizeIconArgs(icon) {
    if (icon === null) {
        return null;
    }
    if (typeof icon === 'object' && icon.prefix && icon.iconName) {
        return icon;
    }
    if (Array.isArray(icon) && icon.length === 2) {
        return { prefix: icon[0], iconName: icon[1] };
    }
    if (typeof icon === 'string') {
        return { prefix: 'fas', iconName: icon };
    }
}
// eslint-disable-next-line
function convert(element, attrs) {
    if (attrs === void 0) { attrs = {}; }
    if (typeof element === 'string') {
        return vue_1.h(element);
    }
    var mixins = Object.keys(element.attributes || {}).reduce(function (acc, key) {
        var val = element.attributes[key];
        switch (key) {
            case 'class':
                acc['class'] = classToObject(val);
                break;
            case 'style':
                acc['style'] = styleToObject(val);
                break;
            default:
                acc[key] = val;
        }
        return acc;
    }, { "class": {}, style: {} } // eslint-disable-line
    );
    var _a = attrs["class"], dClass = _a === void 0 ? {} : _a, _b = attrs.style, dStyle = _b === void 0 ? {} : _b, remainingData = __rest(attrs, ["class", "style"]);
    var _c = mixins["class"], mClass = _c === void 0 ? {} : _c, _d = mixins.style, mStyle = _d === void 0 ? {} : _d, mRemainingData = __rest(mixins, ["class", "style"]);
    return vue_1.h(element.tag, __assign(__assign(__assign(__assign({}, attrs), { "class": mergeClasses_1.mergeClasses(mClass, dClass), style: __assign(__assign({}, mStyle), dStyle) }), mRemainingData), remainingData), (element.children || []).map(convert));
}
// eslint-disable-next-line
function useFontAwesomeIconComponent(iconArgs) {
    return function FontAwesomeIcon(_, _a) {
        var attrs = _a.attrs;
        var _b = attrs, maskArgs = _b.mask, symbol = _b.symbol, title = _b.title; // eslint-disable-line
        var icon = normalizeIconArgs(iconArgs);
        var classes = objectWithKey('classes', classList(attrs));
        var transform = objectWithKey('transform', typeof attrs.transform === 'string' ? fontawesome_svg_core_1.parse.transform(attrs.transform) : attrs.transform);
        var mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
        var abstract = fontawesome_svg_core_1.icon(icon, __assign(__assign(__assign(__assign({}, classes), transform), mask), { symbol: symbol, title: title })).abstract;
        return convert(abstract[0], attrs);
    };
}
exports.useFontAwesomeIconComponent = useFontAwesomeIconComponent;
// eslint-disable-next-line
function useIconComponent(name, iconDefinition) {
    var icon = useFontAwesomeIconComponent(iconDefinition);
    return vue_1.defineComponent({
        props: __assign(__assign({}, BIcon_1.BIconPropsDefinition), { iconClass: {
                type: String
            } }),
        setup: function (props) {
            return function () { return vue_1.h(icon_1.BIcon, props, function () { return vue_1.h(icon, { "class": props.iconClass }); }); };
        }
    });
}
exports.useIconComponent = useIconComponent;
