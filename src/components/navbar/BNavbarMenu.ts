import 'bulma/sass/components/navbar.sass';
import { SetupContext, h } from 'vue';
import { Classes, mergeClasses } from '../../utils/mergeClasses';

export default function BNavbarMenu(props: { isActive?: boolean }, { attrs, slots }: SetupContext) {
  attrs.class = mergeClasses(attrs.class as Classes, ['navbar-menu', { 'is-active': !!props.isActive }]);
  return h('div', attrs, slots.default && slots.default());
}
