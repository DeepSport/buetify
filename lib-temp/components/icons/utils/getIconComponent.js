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
import { parse as faParse, icon as faIcon } from '@fortawesome/fontawesome-svg-core';
import { h } from 'vue';
// @ts-ignore
import { objectWithKey, classList } from '@fortawesome/vue-fontawesome/src/utils';
import { camelize } from '../../../utils/helpers';
import { mergeClasses } from '../../../utils/mergeClasses';
import { BIcon } from '../../icon';
export function getIconComponent(name, iconDefinition) {
    const icon = getFontAwesomeIconComponent(iconDefinition);
    return (_, { attrs }) => h(BIcon, Object.assign(Object.assign({}, attrs), { icon }));
}
export function getFontAwesomeIconComponent(icon) {
    return (_, { attrs }) => h(FontAwesomeIcon, Object.assign(Object.assign({}, attrs), { icon }));
}
// Until Vue Font Awesome support v3
export function FontAwesomeIcon(props, { attrs }) {
    const { icon: iconArgs, mask: maskArgs, symbol, title } = props;
    const icon = normalizeIconArgs(iconArgs);
    const classes = objectWithKey('classes', classList(props));
    const transform = objectWithKey('transform', typeof props.transform === 'string' ? faParse.transform(props.transform) : props.transform);
    const mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
    const renderedIcon = faIcon(icon, Object.assign(Object.assign(Object.assign(Object.assign({}, classes), transform), mask), { symbol, title }));
    const { abstract } = renderedIcon;
    return convert(abstract[0], {}, attrs);
}
function convert(element, props = {}, data = {}) {
    const children = (element.children || []).map(h);
    const mixins = Object.keys(element.attributes || {}).reduce((acc, key) => {
        const val = element.attributes[key];
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
    }, { class: {}, style: {} });
    const { class: dClass = {}, style: dStyle = {} } = data, remainingData = __rest(data, ["class", "style"]);
    const { class: mClass = {}, style: mStyle = {} } = mixins, mRemainingData = __rest(mixins, ["class", "style"]);
    if (typeof element === 'string') {
        return element;
    }
    else {
        return h(element.tag, Object.assign(Object.assign(Object.assign({ class: mergeClasses(mClass, dClass), style: Object.assign(Object.assign({}, mStyle), dStyle) }, mRemainingData), remainingData), props), children);
    }
}
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
function styleToObject(style) {
    return style
        .split(';')
        .map(s => s.trim())
        .filter(s => s)
        .reduce((acc, pair) => {
        const i = pair.indexOf(':');
        const prop = camelize(pair.slice(0, i));
        const value = pair.slice(i + 1).trim();
        acc[prop] = value;
        return acc;
    }, {});
}
function classToObject(cls) {
    return cls.split(/\s+/).reduce((acc, c) => {
        acc[c] = true;
        return acc;
    }, {});
}
//# sourceMappingURL=getIconComponent.js.map