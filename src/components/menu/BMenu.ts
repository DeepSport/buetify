import './menu.sass';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { MenuTheme } from './theme';

export default getThemeableFunctionalComponent('menu', 'BMenu', 'aside', MenuTheme);
