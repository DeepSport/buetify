import { SetupContext } from '@vue/runtime-core';
import { isSome } from 'fp-ts/lib/Option';
import { inject, h } from 'vue';
import {
  DEFAULT_THEME_COLOR_MAP,
  DEFAULT_THEME_INJECTION,
  getThemeClasses,
  THEME_INJECTION_SYMBOL,
  ThemeInjection,
  ThemeProps
} from '../composables/theme';
import { ThemeColorMap } from '../types/ThemeColorMap';
import { Classes, mergeClasses } from './mergeClasses';

interface ThemeableComponentOptions {
  cls: string;
  el?: string;
  themeMap?: ThemeColorMap;
}

interface ThemeableComponentProps extends Partial<ThemeProps> {
  tag?: string;
}

export function isThemeable(props: Partial<ThemeProps>, injection: ThemeInjection): boolean {
  return !!props.isThemeable && !!props.themeMap && isSome(injection.currentTheme.value);
}

export function getThemeClassesFromContext(
  props: ThemeProps,
  injection: ThemeInjection,
  context: SetupContext
): Classes {
  if (isThemeable(props, injection)) {
    return mergeClasses(context.attrs.class as Classes, getThemeClasses(props.themeMap, injection));
  } else {
    return context.attrs.class as Classes;
  }
}

export function getThemeableFunctionalComponent({
  cls,
  el = 'div',
  themeMap = DEFAULT_THEME_COLOR_MAP
}: ThemeableComponentOptions) {
  return (props: ThemeableComponentProps, context: SetupContext) => {
    const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION);
    const themeProps = {
      themeMap: props.themeMap ?? themeMap,
      tag: props.tag ?? el,
      isThemeable: props.isThemeable ?? true
    };
    return h(
      props.tag ?? el,
      { ...context.attrs, class: mergeClasses(getThemeClassesFromContext(themeProps, themeInjection, context), cls) },
      context.slots.default ? context.slots.default() : []
    );
  };
}
