import 'bulma/sass/components/navbar.sass';
import { h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
export default function BNavbarMenu(props, {
  attrs,
  slots
}) {
  attrs.class = mergeClasses(attrs.class, ['navbar-menu', {
    'is-active': !!props.isActive
  }]);
  return h('div', attrs, slots.default && slots.default());
}
//# sourceMappingURL=BNavbarMenu.js.map