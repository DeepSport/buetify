import './tag.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { h, PropType, defineComponent } from 'vue';

export default defineComponent({
	name: 'b-tag',
	props: {
		tag: {
			type: String,
			default: 'span'
		},
		isAttached: {
			type: Boolean,
			default: false
		},
		isClosable: {
			type: Boolean,
			default: false
		},
		variant: {
			type: String as PropType<ColorVariant>,
			default: 'is-primary' as const
		},
		size: {
			type: String as PropType<SizeVariant>,
			default: '' as const
		},
		isRounded: {
			type: Boolean,
			default: false
		},
		isDisabled: {
			type: Boolean,
			default: false
		},
		hasEllipsis: {
			type: Boolean,
			default: false
		},
		isTabable: {
			type: Boolean,
			default: false
		},
		onClose: {
			type: Function as PropType<FunctionN<[MouseEvent], void>>,
			required: false
		}
	},
	setup(props, { slots }) {
		return () => {
			if (props.isClosable) {
				return h(
					props.tag,
					{
						class: 'tags has-addons'
					},
					[
						h(
							'span',
							{
								class: ['tag', props.variant, props.size, { 'is-rounded': props.isRounded }]
							},
							[
								h(
									'span',
									{ class: { 'has-ellipsis': props.hasEllipsis } },
									slots.default && slots.default()
								)
							]
						),
						h('button', {
							class: [
								'tag is-delete has-cursor-pointer',
								props.size,
								{ 'is-rounded': props.isRounded }
							],
							tabindex: props.isTabable ? 0 : false,
							disabled: props.isDisabled,
							onClick: props.isDisabled ? undefined : props.onClose
						})
					]
				);
			} else {
				return h(
					props.tag,
					{
						class: ['tag', props.variant, props.size, { 'is-rounded': props.isRounded }]
					},
					h('span', { class: { 'has-ellipsis': props.hasEllipsis } }, slots.default && slots.default())
				);
			}
		};
	}
});
