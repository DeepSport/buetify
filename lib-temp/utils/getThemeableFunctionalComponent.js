import { isSome } from 'fp-ts/lib/Option';
import { inject, h } from 'vue';
import { DEFAULT_THEME_INJECTION, getThemeClasses, THEME_INJECTION_SYMBOL } from '../composables/theme';
import { DEFAULT_THEME_COLOR_MAP } from '../mixins/themeInjection/ThemeInjectionMixin';
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
        const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
        const themeProps = {
            themeMap: props.themeMap ?? themeMap,
            tag: props.tag ?? el,
            isThemeable: props.isThemeable ?? true
        };
        return h(props.tag ?? el, { ...context.attrs, class: mergeClasses(getThemeClassesFromContext(themeProps, themeInjection, context), cls) }, context.slots.default ? context.slots.default() : []);
    };
}
//# sourceMappingURL=getThemeableFunctionalComponent.js.map