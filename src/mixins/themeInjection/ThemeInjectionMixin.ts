import {
  getThemeClasses,
  getThemeProps
} from "../../utils/getThemeableFunctionalComponent";
import { ThemeInjection } from "../../types/AppInjection";
import { Theme } from "../../types/Theme";
import { constant, constVoid } from "fp-ts/lib/function";
import { isSome, none } from "fp-ts/lib/Option";
import Vue, { PropType } from "vue";
export type ThemeColorMap = { [K in Theme]: string | string[] };

export const DEFAULT_THEME_COLOR_MAP: ThemeColorMap = {
  dark: "is-black-ter",
  light: ""
};

interface options extends Vue {
  theme: ThemeInjection;
}

const DEFAULT_THEME_INJECTION: ThemeInjection = {
  currentTheme: none,
  isThemeable: false,
  setTheme: constVoid
};

export function getThemeInjectionMixin(
  themeMap: ThemeColorMap = DEFAULT_THEME_COLOR_MAP
) {
  return Vue.extend<options>().extend({
    props: {
      ...getThemeProps(themeMap)
    },
    inject: {
      theme: {
        default: constant(DEFAULT_THEME_INJECTION)
      }
    },
    computed: {
      themeClasses(): string[] {
        return getThemeClasses(this.themeMap, this.theme);
      }
    },
    methods: {
      setTheme(theme: Theme): void {
        this.theme.setTheme(theme);
      },
      toggleTheme(): void {
        if (isSome(this.theme.currentTheme)) {
          if (this.theme.currentTheme.value === "light") {
            this.setTheme("dark");
          } else {
            this.setTheme("light");
          }
        }
      }
    }
  });
}

export const ThemeInjectionMixin = getThemeInjectionMixin();
