import { isSome } from 'fp-ts/lib/Option';
import { inject, h, defineComponent } from 'vue';
import {
  DEFAULT_THEME_COLOR_MAP,
  DEFAULT_THEME_INJECTION,
  getThemeClasses,
  useThemePropsDefinition,
  THEME_INJECTION_SYMBOL,
  ThemeInjection,
  ThemeProps
} from '../composables/theme';
import { ThemeColorMap } from '../types/ThemeColorMap';
import { mergeClasses } from './mergeClasses';

export interface ThemeableComponentOptions {
  cls: string;
  el?: string;
  themeMap?: ThemeColorMap;
}

export interface ThemeableComponentProps extends Partial<ThemeProps> {
  tag?: string;
}

export function isThemeable(props: Partial<ThemeProps>, injection: ThemeInjection): boolean {
  return !!props.isThemeable && !!props.themeMap && isSome(injection.currentTheme.value);
}

export function getThemeableFunctionalComponent({
  cls,
  el = 'div',
  themeMap = DEFAULT_THEME_COLOR_MAP
}: ThemeableComponentOptions) {
  return defineComponent({
    props: {
      ...useThemePropsDefinition(themeMap, true),
      tag: {
        type: [String, Function],
        default: el
      }
    },
    setup(props, { slots }) {
      const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
      return () =>
        h(
          props.tag as string,
          {
            class: isThemeable(props, themeInjection)
              ? mergeClasses(getThemeClasses(props.themeMap, themeInjection), cls)
              : cls
          },
          slots.default && slots.default()
        );
    }
  });
}
