import './menu.sass';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { MenuListItemTheme } from './theme';

export default getThemeableFunctionalComponent('menu-list-item', 'BMenuListItem', 'unknown', MenuListItemTheme, 'li');
