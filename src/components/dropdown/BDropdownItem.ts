import './dropdown.sass';
import { getThemeClasses, getThemeProps, THEME_INJECTION } from '../../utils/getThemeableFunctionalComponent';
import { mergeVNodeAttrs } from '../../utils/mergeVNodeAttrs';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';
import { DropdownTheme } from './theme';

export default Vue.extend({
  name: 'BDropdownItem',
  functional: true,
  props: {
    ...getThemeProps(DropdownTheme),
    isActive: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,

      default: 'li'
    }
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('dropdown-item has-cursor-pointer', data.staticClass);
    if (props.isThemeable && injections.theme) {
      data.class = mergeVNodeClasses(
        data.class,
        props.isActive ? { 'is-active': true } : getThemeClasses(props.themeMap, injections.theme)
      );
    } else {
    }
    data.attrs = mergeVNodeAttrs(data.attrs, {
      role: 'menuitem',
      tabindex: '0'
    });
    return h(props.tag, data, children);
  }
});
