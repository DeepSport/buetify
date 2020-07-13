import 'bulma/sass/components/navbar.sass';
import { replicate } from 'fp-ts/lib/Array';
import { h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
const hamburgerLines = replicate(3, h('span', { 'aria-hidden': true }));
export default function BNavbarBurger(props, { attrs }) {
    attrs.class = mergeClasses(attrs.class, ['navbar-burger', { 'is-active': !!props.isActive }]);
    return h(props.tag || 'button', Object.assign(Object.assign({}, attrs), { 'aria-expanded': !!props.isActive }), hamburgerLines);
}
//# sourceMappingURL=BNavbarBurger.js.map