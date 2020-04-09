import Vue from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const DropdownTheme: ThemeColorMap = Vue.observable({
  dark: 'is-grey-dark',
  light: ''
});
