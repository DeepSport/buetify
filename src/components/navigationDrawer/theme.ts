import Vue from 'vue';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';

export const NavigationDrawerTheme: ThemeColorMap = Vue.observable({
  dark: 'is-black-bis',
  light: 'is-grey-darker'
});
