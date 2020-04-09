import Vue from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const MenuTheme: ThemeColorMap = Vue.observable({
  dark: 'is-black-bis',
  light: 'is-grey-darker'
});

export const MenuListItemTheme: ThemeColorMap = Vue.observable({
  dark: 'is-link',
  light: 'is-link'
});
