import BMenu from 'buetify/lib/components/menu/BMenu';
import BMenuGroup from 'buetify/lib/components/menu/BMenuGroup';
import BMenuLabel from 'buetify/lib/components/menu/BMenuLabel';
import BMenuListItem from 'buetify/lib/components/menu/BMenuListItem';
import { constant } from 'fp-ts/lib/function';
import { defineComponent, PropType, h, computed } from 'vue';
import { RouterLink, useLink } from 'vue-router';
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
		isNested: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return () =>
			h(
				BMenuGroup,
				{ isExpanded: true },
				{
					'menu-label': () => (props.isNested ? props.group.label
						: h(BMenuLabel, () => props.group.label)),
					default: () =>
						props.group.items.map(item => h(BuetifyMenuItem, { key: item.label, item, isNested: true })) // eslint-disable-line
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
						class: {
							'is-active': link.isActive.value
						},
						onClick: link.navigate
					},
					props.link.label
				)
			);
	}
});

function BuetifyMenuItem(props: { item: BuetifyMenuNavigationItem; isNested?: boolean }) {
	return props.item._tag === 'group'
		? props.isNested
			? h(BMenuListItem, () => h(BuetifyMenuGroup, { group: props.item, isNested: props.isNested } as any)) //eslint-disable-line
			: h(BuetifyMenuGroup, { group: props.item })
		: h(BuetifyMenuLink, { link: props.item });
}

const groups = constant(menu.map(item => h(BuetifyMenuItem, { item })));

const staticMenu = h(
	BMenu,
	{ class: 'is-light padding-top-size-3 padding-bottom-size-3 padding-left-size-2 padding-right-size-2' },
	groups
);

export default function BuetifyMenu() {
	return staticMenu;
}
