import { shallowReactive } from 'vue';
import { ThemeColorMap } from '../../types/ThemeColorMap';

export const MenuThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-black-bis',
  light: 'is-grey-darker'
});

export const MenuListItemThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-link',
  light: 'is-link'
});
