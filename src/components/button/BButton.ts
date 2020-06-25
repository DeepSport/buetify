import './button.sass';
import { h, SetupContext } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { Classes, mergeClasses } from '../../utils/mergeClasses';

export interface ButtonProps {
  variant?: ColorVariant;
  isRounded?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  isInverted?: boolean;
  isFocused?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  isHovered?: boolean;
  size?: SizeVariant;
  tag?: 'button' | 'a' | 'input';
}

function getButtonClasses(props: ButtonProps): Classes {
  return [
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

export default function BButton(props: ButtonProps, { slots, attrs }: SetupContext) {
  return h(
    props.tag ?? 'button',
    { ...attrs, class: mergeClasses(attrs.class as Classes, getButtonClasses(props)) },
    slots.default ? slots.default() : []
  );
}
