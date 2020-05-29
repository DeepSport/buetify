import { getItem, setItem } from 'fp-ts-local-storage';
import { constant, constVoid } from 'fp-ts/lib/function';
import { getOrElse, none, some } from 'fp-ts/lib/Option';
import { provide, shallowRef, watch } from 'vue';
export const DEFAULT_THEME_INJECTION = {
    currentTheme: shallowRef(none),
    isThemeable: shallowRef(false),
    setTheme: constVoid
};
export const THEME_INJECTION_SYMBOL = Symbol('theme');
let persistentTheme = getOrElse(constant('dark'))(getItem('theme')());
export const ProvideThemePropDefinitions = {
    isThemeable: {
        type: Boolean,
        default: true
    },
    persistTheme: {
        type: Boolean,
        default: true
    }
};
export function provideTheme(props) {
    const isThemeable = shallowRef(props.isThemeable);
    watch(props, newProps => {
        isThemeable.value = newProps.isThemeable;
    });
    const currentTheme = shallowRef(some(persistentTheme));
    function setTheme(newTheme) {
        currentTheme.value = some(newTheme);
        if (props.persistTheme) {
            setItem('theme', newTheme)();
        }
    }
    const injection = {
        isThemeable,
        currentTheme,
        setTheme
    };
    provide(THEME_INJECTION_SYMBOL, injection);
    return {
        setTheme,
        currentTheme,
        isThemeable
    };
}
//# sourceMappingURL=provideTheme.js.map