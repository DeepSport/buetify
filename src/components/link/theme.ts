import { shallowReactive} from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const LinkThemeMap: ThemeColorMap = shallowReactive({
  dark: 'is-warning',
  light: 'is-link'
});
