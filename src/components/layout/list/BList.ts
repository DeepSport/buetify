import { isEmpty } from 'fp-ts/lib/Array';
import { h, SetupContext, Component } from 'vue';

export interface BListProps {
	tag?: string | Component;
	items: unknown[];
}

export default function BList(props: BListProps, { attrs, slots }: SetupContext) {
	if (isEmpty(props.items)) {
		return h(props.tag ?? ('div' as any), attrs, slots.empty && slots.empty());
	} else {
		const length = props.items.length;
		return h(
			props.tag ?? ('div' as any),
			attrs,
			props.items.map((item, index) =>
				slots.default!({
					item,
					index,
					length,
					isLast: index === length - 1
				})
			)
		);
	}
}
