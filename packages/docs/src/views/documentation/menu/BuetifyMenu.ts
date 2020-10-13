import BMenu from 'buetify/lib/components/menu/BMenu';
import BMenuGroup from 'buetify/lib/components/menu/BMenuGroup';
import BMenuLabel from 'buetify/lib/components/menu/BMenuLabel';
import BMenuListItem from 'buetify/lib/components/menu/BMenuListItem';
import { constant } from 'fp-ts/lib/function';
import { defineComponent, PropType, h, computed } from 'vue';
import { useLink } from 'vue-router';
import {
	BuetifyMenuNavigationGroup,
	BuetifyMenuNavigationItem,
	BuetifyMenuNavigationLink
} from '../shared/BuetifyMenu';
import { menu } from '../menu';

const BuetifyMenuGroup = defineComponent({
	name: 'buetify-menu-navigation-group',
	props: {
		group: {
			type: Object as PropType<BuetifyMenuNavigationGroup>,
			required: true
		},
		level: {
			type: Number,
			required: true
		}
	},
	setup(props) {
		return () =>
			h(
				BMenuGroup,
				{ isExpanded: true },
				{
					'menu-label': () => h(BMenuLabel, () => props.group.label),
					default: () =>
						props.group.items.map(item =>
							// eslint-disable-next-line
							h(BuetifyMenuItem, { key: item.label, item, level: props.level + 1 })
						)
				}
			);
	}
});

const BuetifyMenuLink = defineComponent({
	name: 'buetify-menu-navigation-link',
	props: {
		link: {
			type: Object as PropType<BuetifyMenuNavigationLink>,
			required: true
		},
		level: {
			type: Number,
			required: true
		}
	},
	setup(props) {
		const link = useLink({
			to: computed(() => props.link.fullPath)
		});
		return () =>
			h(BMenuListItem, () =>
				h(
					'a',
					{
						href: link.href.value,
						class: [
							'margin-bottom-size-9',
							{
								'has-text-weight-semibold': props.level < 2,
								'is-active': link.isActive.value
							}
						],
						onClick: link.navigate
					},
					props.link.label
				)
			);
	}
});

function BuetifyMenuItem(props: { item: BuetifyMenuNavigationItem; level?: number }) {
	const level = props.level ?? 0;
	return props.item._tag === 'group'
		? level
			? h(BMenuListItem, () => h(BuetifyMenuGroup, { group: props.item, level } as any)) //eslint-disable-line
			: h(BuetifyMenuGroup, { group: props.item, level })
		: h(BuetifyMenuLink, { link: props.item, level });
}

const groups = constant(menu.map(item => h(BuetifyMenuItem, { item })));

const staticMenu = h(
	BMenu,
	{ tag: 'div', class: 'is-light padding-top-size-3 padding-bottom-size-3 padding-left-size-2 padding-right-size-2' },
	groups
);

export default function BuetifyMenu() {
	return staticMenu;
}
