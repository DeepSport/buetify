import { shallowReactive } from 'vue';
import { ThemeColorMap } from '../../types/ThemeColorMap';

export const NavigationDrawerThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-black-bis',
  light: 'is-grey-darker'
});
