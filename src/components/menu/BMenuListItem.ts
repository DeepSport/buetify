import './menu.sass';
import { getThemeInjectionMixin, ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';

const MENU_LIST_ITEM_THEME_MAP: ThemeColorMap = {
  dark: 'is-primary',
  light: ''
};

export default getThemeableFunctionalComponent(
  'menu-list-item',
  'BMenuListItem',
  'unknown',
  MENU_LIST_ITEM_THEME_MAP,
  'li'
);
