import './menu.sass';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { MenuThemeMap } from './theme';

export default getThemeableFunctionalComponent({ cls: 'menu', el: 'aside', themeMap: MenuThemeMap});
