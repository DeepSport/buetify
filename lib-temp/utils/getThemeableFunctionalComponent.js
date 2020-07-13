import { isSome } from 'fp-ts/lib/Option';
import { inject, h } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, DEFAULT_THEME_INJECTION, getThemeClasses, THEME_INJECTION_SYMBOL } from '../composables/theme';
import { mergeClasses } from './mergeClasses';
export function isThemeable(props, injection) {
    return !!props.isThemeable && !!props.themeMap && isSome(injection.currentTheme.value);
}
export function getThemeClassesFromContext(props, injection, context) {
    if (isThemeable(props, injection)) {
        return mergeClasses(context.attrs.class, getThemeClasses(props.themeMap, injection));
    }
    else {
        return context.attrs.class;
    }
}
export function getThemeableFunctionalComponent({ cls, el = 'div', themeMap = DEFAULT_THEME_COLOR_MAP }) {
    return (props, context) => {
        var _a, _b, _c, _d;
        const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
        const themeProps = {
            themeMap: (_a = props.themeMap) !== null && _a !== void 0 ? _a : themeMap,
            tag: (_b = props.tag) !== null && _b !== void 0 ? _b : el,
            isThemeable: (_c = props.isThemeable) !== null && _c !== void 0 ? _c : true
        };
        return h((_d = props.tag) !== null && _d !== void 0 ? _d : el, Object.assign(Object.assign({}, context.attrs), { class: mergeClasses(getThemeClassesFromContext(themeProps, themeInjection, context), cls) }), context.slots.default ? context.slots.default() : []);
    };
}
//# sourceMappingURL=getThemeableFunctionalComponent.js.map