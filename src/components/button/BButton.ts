import './button.sass';
import { h, PropType, defineComponent } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { Classes } from '../../utils/mergeClasses';

export interface ButtonProps {
	variant: ColorVariant;
	isRounded: boolean;
	isLoading: boolean;
	isOutlined: boolean;
	isInverted: boolean;
	isFocused: boolean;
	isActive: boolean;
	isDisabled: boolean;
	isHovered: boolean;
	size: SizeVariant;
	tag: 'button' | 'a' | 'input';
}

function getButtonClasses(props: ButtonProps): Classes {
  return [
    'button',
    props.variant,
    props.size ? props.size : '',
    {
      'is-rounded': !!props.isRounded,
      'is-loading': !!props.isLoading,
      'is-outlined': !!props.isOutlined,
      'is-inverted': !!props.isInverted,
      'is-focused': !!props.isFocused,
      'is-active': !!props.isActive,
      'is-disabled': !!props.isDisabled,
      'is-hovered': !!props.isHovered
    }
  ];
}

export default defineComponent({
	name: 'b-button',
	props: {
		tag: {
			type: String as PropType<'button' | 'a' | 'input'>,
			default: 'button' as const,
			validator: (val: string) => ['button', 'a', 'input'].includes(val)
		},
		size: {
			type: String as PropType<SizeVariant>,
			default: '' as SizeVariant
		},
		variant: {
			type: String as PropType<ColorVariant>,
			default: '' as ColorVariant
		},
		isRounded: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isLoading: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isOutlined: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isInverted: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isFocused: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isActive: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isDisabled: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		isHovered: {
			type: Boolean as PropType<boolean>,
			default: false
		}
	},

	setup(props, { slots, attrs }) {
		return () =>
			h(
				props.tag,
				{
					...attrs,
					class: getButtonClasses(props),
					...(props.isDisabled ? { disabled: true } : {})
				},
				slots.default && slots.default!()
			);
	}
});
