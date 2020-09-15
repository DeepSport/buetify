import './dropdown.sass';
import { useTheme, useThemePropsDefinition } from '../../composables/theme';
import { h, defineComponent, PropType } from 'vue';
import { DropdownThemeMap } from './theme';

export default defineComponent({
  name: 'b-dropdown-link-item',
  props: {
    ...useThemePropsDefinition(DropdownThemeMap, true),
    isActive: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    href: {
      type: String as PropType<string>,
      required: true
    },
    tag: {
      type: String as PropType<string>,
      default: 'li'
    }
  },
  setup(props, { attrs, slots }) {
    const { themeClasses } = useTheme(props);
    return () => {
      return h(
        props.tag ?? 'li',
        {
          role: 'menuitem'
        },
        [
          h(
            'a',
            {
              ...attrs,
              class: ['dropdown-item dropdown-link', ...themeClasses.value, { 'is-active': props.isActive }]
            },
            slots.default && slots.default()
          )
        ]
      );
    };
  }
});
