import { getItem, setItem } from 'fp-ts-local-storage';
import { constant, constVoid } from 'fp-ts/lib/function';
import { getOrElse, none, Option, some } from 'fp-ts/lib/Option';
import { provide, shallowRef, Ref, watch, ExtractPropTypes, PropType } from 'vue';

export type Theme = 'dark' | 'light';

export interface ThemeInjection {
  isThemeable: Ref<boolean>;
  currentTheme: Ref<Option<Theme>>; // allows for easier defaults in injected component
  setTheme: (theme: Theme) => void;
}

export const DEFAULT_THEME_INJECTION: ThemeInjection = {
  currentTheme: shallowRef(none),
  isThemeable: shallowRef(false),
  setTheme: constVoid
};

export const THEME_INJECTION_SYMBOL = Symbol('theme');

let persistentTheme = getOrElse<Theme>(constant<Theme>('dark'))(getItem('theme')() as Option<Theme>);

export const ProvideThemePropDefinitions = {
  isThemeable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  persistTheme: {
    type: Boolean as PropType<boolean>,
    default: true
  }
};

export type ProvideThemeProps = ExtractPropTypes<typeof ProvideThemePropDefinitions>;

export function provideTheme(props: ProvideThemeProps) {
  const isThemeable = shallowRef(props.isThemeable);
  watch(props, newProps => {
    isThemeable.value = newProps.isThemeable;
  });
  const currentTheme = shallowRef(some(persistentTheme));
  function setTheme(newTheme: Theme) {
    currentTheme.value = some(newTheme);
    if (props.persistTheme) {
      setItem('theme', newTheme)();
    }
  }
  const injection: ThemeInjection = {
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
