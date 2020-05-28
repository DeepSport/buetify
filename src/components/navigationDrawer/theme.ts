import { shallowReactive} from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const NavigationDrawerThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-black-bis',
  light: 'is-grey-darker'
});
