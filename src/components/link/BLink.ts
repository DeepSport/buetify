import './link.sass';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { getThemeClassesFromContext, THEME_INJECTION } from '../../utils/getThemeableFunctionalComponent';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import { constant } from 'fp-ts/lib/function';
import Vue, { PropType, VNode } from 'vue';
import { LinkTheme } from './theme';

export default Vue.extend({
  name: 'BLink',
  functional: true,
  props: {
    themeMap: {
      type: Object as PropType<ThemeColorMap>,
      required: false,
      default: constant(LinkTheme)
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
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('b-link', data.staticClass);
    data.class = mergeVNodeClasses(getThemeClassesFromContext({ props, data, injections }), {
      'is-disabled': props.isDisabled
    });
    data.on = props.isDisabled ? undefined : data.on;
    return h(props.tag, data, props.text ? [props.text] : children);
  }
});
