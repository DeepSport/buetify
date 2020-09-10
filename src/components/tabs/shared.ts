import { none, Option } from 'fp-ts/lib/Option';
import { PropType, ExtractPropTypes, Component, Ref, shallowRef } from 'vue';

export const TABS_SYMBOL = Symbol('tabs');

export const TAB_ITEM_NAME = 'b-tab-item';

export interface BTabItemData {
	props: BTabItemProps;
}

export interface TabInjection {
	activeLabel: Ref<Option<string>>;
}

export const DEFAULT_TAB_INJECTION: TabInjection = {
	activeLabel: shallowRef(none)
};

export const BTabItemPropsDefinition = {
	label: {
		type: String as PropType<string>,
		required: true as const
	},
	icon: {
		type: Function as PropType<Component>
	},
	isDisabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	isVisible: {
		type: Boolean as PropType<boolean>,
		default: true
	}
};

export type BTabItemProps = ExtractPropTypes<typeof BTabItemPropsDefinition>;
