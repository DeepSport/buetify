import "../../../src/components/dropdown/dropdown.sass";
import { useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
import { DropdownThemeMap } from './theme';
export default function BDropdownItem(props, {
  attrs,
  slots
}) {
  var _a, _b, _c;

  const {
    themeClasses
  } = useTheme({
    isThemeable: (_a = props.isThemeable) !== null && _a !== void 0 ? _a : true,
    themeMap: (_b = props.themeMap) !== null && _b !== void 0 ? _b : DropdownThemeMap
  });
  attrs.class = mergeClasses(attrs.class, ['dropdown-item dropdown-link', ...themeClasses.value, {
    'is-active': !!props.isActive
  }]);
  return h((_c = props.tag) !== null && _c !== void 0 ? _c : 'li', {
    role: 'menuitem'
  }, [h('a', attrs, slots.default ? slots.default() : undefined)]);
}
//# sourceMappingURL=BDropdownLink.js.map