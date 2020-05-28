import 'bulma/sass/components/navbar.sass';
import { replicate } from 'fp-ts/lib/Array';
import { h, SetupContext } from 'vue';
import { Classes, mergeClasses } from '../../utils/mergeClasses';

export interface BNavbarBurgerProps {
  tag?: string;
  isActive?: boolean;
}

const hamburgerLines = replicate(3, h('span', { 'aria-hidden': true }));

export default function BNavbarBurger(props: BNavbarBurgerProps, { attrs }: SetupContext) {
  attrs.class = mergeClasses(attrs.class as Classes, ['navbar-burger', { 'is-active': !!props.isActive }]);

  return h(
    props.tag || 'button',
    {
      ...attrs,
      'aria-expanded': !!props.isActive
    },
    hamburgerLines
  );
}
