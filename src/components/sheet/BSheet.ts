import './sheet.sass';
import Vue, { VNode } from 'vue';
import { DEFAULT_THEME_COLOR_MAP } from '../../mixins/themeInjection/ThemeInjectionMixin';
import {
  getThemeClassesFromContext,
  getThemeProps,
  THEME_INJECTION
} from '../../utils/getThemeableFunctionalComponent';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import BButton from '../button/BButton';

export default Vue.extend({
  name: 'BSheet',
  functional: true,
  props: {
    ...getThemeProps(DEFAULT_THEME_COLOR_MAP),
    tag: { type: String, required: false, default: 'main' },
    isLoading: { type: Boolean, default: false }
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('b-sheet', data.staticClass);
    data.class = [getThemeClassesFromContext({ data, props, injections }), { 'is-loading': props.isLoading }];
    // @ts-ignore
    return h(
      props.tag,
      data,
      props.isLoading
        ? [
            h(BButton, {
              staticClass: 'is-borderless is-fullwidth',
              props: {
                size: 'is-large',
                variant: 'is-link',
                isOutlined: true,
                isLoading: true
              }
            })
          ]
        : children
    );
  }
});
