import { isSome } from 'fp-ts/lib/Option';
import { inject, computed } from 'vue';
import { constant } from 'fp-ts/lib/function';
import { DEFAULT_THEME_INJECTION, THEME_INJECTION_SYMBOL } from './provideTheme';
export const DEFAULT_THEME_COLOR_MAP = {
  dark: 'is-black-ter',
  light: ''
};
export function useThemePropsDefinition(themeMap, defaultIsThemeable = true) {
  return {
    themeMap: {
      type: Object,
      required: false,
      default: constant(themeMap)
    },
    isThemeable: {
      type: Boolean,
      required: false,
      default: defaultIsThemeable
    }
  };
}
export const DefaultThemePropsDefinition = useThemePropsDefinition(DEFAULT_THEME_COLOR_MAP, true);
export function getThemeClasses(themeMap, themeInjection) {
  if (themeInjection.isThemeable.value && isSome(themeInjection.currentTheme.value)) {
    const classes = themeMap[themeInjection.currentTheme.value.value];
    return Array.isArray(classes) ? classes : [classes];
  } else {
    return [];
  }
}
export function useTheme(props) {
  const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
  const themeClasses = computed(() => props ? getThemeClasses(props.themeMap, themeInjection) : []);
  return {
    currentTheme: themeInjection.currentTheme,
    setTheme: themeInjection.setTheme,
    toggleTheme: () => {
      if (isSome(themeInjection.currentTheme.value)) {
        if (themeInjection.currentTheme.value.value === 'light') {
          themeInjection.setTheme('dark');
        } else {
          themeInjection.setTheme('light');
        }
      }
    },
    themeClasses
  };
}
//# sourceMappingURL=useTheme.js.map