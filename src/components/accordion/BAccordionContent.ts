import './accordion.sass';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';

export const ACCORDION_CONTENT_THEME_MAP = {
  dark: 'is-black-ter', //'is-grey-dark',
  light: ''
};

export default getThemeableFunctionalComponent(
  'card-content',
  'BAccordionContent',
  'section',
  ACCORDION_CONTENT_THEME_MAP
);
