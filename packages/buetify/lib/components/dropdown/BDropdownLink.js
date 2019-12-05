import { useTheme, useThemePropsDefinition } from '../../composables/theme';
import { h, defineComponent } from 'vue';
import { DropdownThemeMap } from './theme';
export default defineComponent({
  name: 'b-dropdown-link-item',
  props: { ...useThemePropsDefinition(DropdownThemeMap, true),
    isActive: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'li'
    }
  },

  setup(props, {
    attrs,
    slots
  }) {
    const {
      themeClasses
    } = useTheme(props);
    return () => {
      return h(props.tag ?? 'li', {
        role: 'menuitem'
      }, [h('a', { ...attrs,
        class: ['dropdown-item dropdown-link', ...themeClasses.value, {
          'is-active': props.isActive
        }]
      }, slots.default && slots.default())]);
    };
  }

});
//# sourceMappingURL=BDropdownLink.js.map