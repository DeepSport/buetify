import { makeBy } from 'fp-ts/lib/Array';
import { h } from 'vue';
const hamburgerLines = makeBy(3, () => h('span', {
  'aria-hidden': true
}));
export default function BNavbarBurger(props) {
  return h(props.tag || 'button', {
    class: ['b-navbar-burger', 'navbar-burger', {
      'is-active': !!props.isActive
    }],
    'aria-expanded': !!props.isActive
  }, hamburgerLines);
}
//# sourceMappingURL=BNavbarBurger.js.map