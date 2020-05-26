import './menu.sass';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { MenuTheme } from './theme';

export default getThemeableFunctionalComponent({ cls: 'menu', el: 'aside', themeMap: MenuTheme});
