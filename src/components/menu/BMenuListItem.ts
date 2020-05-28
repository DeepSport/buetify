import './menu.sass';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { MenuListItemTheme } from './theme';

export default getThemeableFunctionalComponent({ cls: 'menu-list-item', el: 'li', themeMap: MenuListItemTheme});
