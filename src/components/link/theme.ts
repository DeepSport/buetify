import Vue from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const LinkTheme: ThemeColorMap = Vue.observable({
  dark: 'is-warning',
  light: 'is-link'
});
