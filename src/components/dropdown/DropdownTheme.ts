import {
  getThemeInjectionMixin,
  ThemeColorMap
} from "../../mixins/themeInjection/ThemeInjectionMixin";
export const DROPDOWN_THEME_MAP = {
  dark: "is-grey-dark",
  light: ""
};

export const DROPDOWN_ITEM_THEME_MAP: ThemeColorMap = {
  dark: "has-background-orange",
  light: "has-background-link"
};

export const DROPDOWN_THEME_MIXIN = getThemeInjectionMixin(DROPDOWN_THEME_MAP);
