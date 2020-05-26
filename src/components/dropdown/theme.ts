import { shallowReactive } from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const DropdownThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-grey-dark',
  light: ''
});
