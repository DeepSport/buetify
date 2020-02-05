import './link.sass';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { getThemeClassesFromContext, THEME_INJECTION } from '../../utils/getThemeableFunctionalComponent';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import { constant } from 'fp-ts/lib/function';
import Vue, { PropType, VNode } from 'vue';

const LINK_THEME_MAP: ThemeColorMap = {
  dark: 'is-warning',
  light: ''
};

export default Vue.extend({
  name: 'BLink',
  functional: true,
  props: {
    themeMap: {
      type: Object as PropType<ThemeColorMap>,
      required: false,
      default: constant(LINK_THEME_MAP)
    },
    isThemeable: {
      type: Boolean,
      required: false,
      default: true
    },
    text: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: false,
      default: '#'
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('b-link', data.staticClass);
    data.class = getThemeClassesFromContext({ props, data, injections });
    return h(props.tag, data, props.text ? [props.text] : children);
  }
});
