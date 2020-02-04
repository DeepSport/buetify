import "./menu.sass";
import { ThemeColorMap } from "../../mixins/themeInjection/ThemeInjectionMixin";
import { getThemeableFunctionalComponent } from "../../utils/getThemeableFunctionalComponent";

const MENU_THEME_MAP: ThemeColorMap = {
  dark: "is-black-bis",
  light: "is-grey-darker"
};

export default getThemeableFunctionalComponent(
  "menu",
  "BMenu",
  "aside",
  MENU_THEME_MAP
);
