import { isSome } from 'fp-ts/lib/Option';
import { inject, h, defineComponent } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, DEFAULT_THEME_INJECTION, getThemeClasses, useThemePropsDefinition, THEME_INJECTION_SYMBOL } from '../composables/theme';
import { mergeClasses } from './mergeClasses';
export function isThemeable(props, injection) {
  return !!props.isThemeable && !!props.themeMap && isSome(injection.currentTheme.value);
}
export function getThemeableFunctionalComponent({
  cls,
  el = 'div',
  themeMap = DEFAULT_THEME_COLOR_MAP
}) {
  return defineComponent({
    props: { ...useThemePropsDefinition(themeMap, true),
      tag: {
        type: [String, Function],
        default: el
      }
    },

    setup(props, {
      slots
    }) {
      const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
      return () => h(props.tag, {
        class: isThemeable(props, themeInjection) ? mergeClasses(getThemeClasses(props.themeMap, themeInjection), cls) : cls
      }, slots.default && slots.default());
    }

  });
}
//# sourceMappingURL=getThemeableFunctionalComponent.js.map