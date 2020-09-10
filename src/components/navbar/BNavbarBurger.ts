import 'bulma/sass/components/navbar.sass';
import { makeBy } from 'fp-ts/lib/Array';
import { h, SetupContext } from 'vue';

export interface BNavbarBurgerProps {
	tag?: string;
	isActive?: boolean;
}

const hamburgerLines = makeBy(3, () => h('span', { 'aria-hidden': true }));

export default function BNavbarBurger(props: BNavbarBurgerProps, { attrs }: SetupContext) {
	return h(
		props.tag || 'button',
		{
			...attrs,
			class: ['navbar-burger', { 'is-active': !!props.isActive }],
			'aria-expanded': !!props.isActive
		},
		hamburgerLines
	);
}
