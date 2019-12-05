import { useTheme, useThemePropsDefinition } from '../../composables/theme';
import { h, defineComponent } from 'vue';
import { DropdownThemeMap } from './theme';
export default defineComponent({
  name: 'b-dropdown-item',
  props: { ...useThemePropsDefinition(DropdownThemeMap, true),
    isActive: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'li'
    }
  },

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = useTheme(props);
    return () => {
      return h(props.tag ?? 'li', {
        role: 'menuitem',
        tabindex: 0,
        class: ['dropdown-item', ...themeClasses.value, {
          'is-active': props.isActive
        }]
      }, slots.default && slots.default());
    };
  }

});
//# sourceMappingURL=BDropdownItem.js.map