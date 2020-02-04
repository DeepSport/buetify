import './dropdown.sass';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';
import { getThemeClasses, getThemeProps, THEME_INJECTION } from '../../utils/getThemeableFunctionalComponent';
import { mergeVNodeAttrs } from '../../utils/mergeVNodeAttrs';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import { constant } from 'fp-ts/lib/function';
import Vue, { PropType, VNode } from 'vue';
import { DROPDOWN_ITEM_THEME_MAP, DROPDOWN_THEME_MAP } from './DropdownTheme';

export default Vue.extend({
  name: 'BDropdownItem',
  functional: true,
  props: {
    ...getThemeProps(DROPDOWN_THEME_MAP),
    isActiveThemeMap: {
      type: Object as PropType<ThemeColorMap>,
      required: false,
      default: constant(DROPDOWN_ITEM_THEME_MAP)
    },
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
        getThemeClasses(props.isActive ? props.isActiveThemeMap : props.themeMap, injections.theme)
      );
    } else {
      data.class = mergeVNodeClasses(data.class, {
        'is-active': props.isActive
      });
    }
    data.attrs = mergeVNodeAttrs(data.attrs, {
      role: 'menuitem',
      tabindex: '0'
    });
    return h(props.tag, data, children);
  }
});
