import { shallowReactive } from 'vue';
import { ThemeColorMap } from '../../types/ThemeColorMap';

export const LinkThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-warning',
  light: 'is-link'
});
