import './button.sass';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import {
  getThemeClassesFromContext,
  getThemeProps,
  THEME_INJECTION
} from '../../utils/getThemeableFunctionalComponent';
import { mergeVNodeAttrs } from '../../utils/mergeVNodeAttrs';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';

const BUTTON_THEME_MAP = {
  dark: 'is-orange',
  light: ''
};

export default Vue.extend({
  name: 'BButton',
  functional: true,
  props: {
    ...getThemeProps(BUTTON_THEME_MAP),
    variant: {
      type: String,
      default: 'is-primary'
    } as PropValidator<ColorVariant>,
    isRounded: Boolean,
    isLoading: Boolean,
    isOutlined: Boolean,
    isInverted: Boolean,
    isFocused: Boolean,
    isActive: Boolean,
    isDisabled: Boolean,
    isHovered: Boolean,
    size: {
      type: String,
      required: false
    } as PropValidator<SizeVariant>,
    tag: {
      type: String,
      default: 'button',
      validator: value => ['button', 'a', 'input'].includes(value)
    }
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('button', data.staticClass);
    data.class = mergeVNodeClasses(
      data.class,
      mergeVNodeClasses(getButtonClasses(props), getThemeClassesFromContext({ data, props, injections }))
    );
    data.attrs = mergeVNodeAttrs(data.attrs, {
      disabled: props.isDisabled,
      'aria-disabled': props.isDisabled
    });
    return h(props.tag, data, children);
  }
});

interface ButtonProps {
  variant: ColorVariant;
  isRounded: boolean;
  isLoading: boolean;
  isOutlined: boolean;
  isInverted: boolean;
  isFocused: boolean;
  isActive: boolean;
  isDisabled: boolean;
  isHovered: boolean;
  size?: SizeVariant;
}

function getButtonClasses(props: ButtonProps) {
  return [
    props.variant,
    props.size ? props.size : '',
    {
      'is-rounded': props.isRounded,
      'is-loading': props.isLoading,
      'is-outlined': props.isOutlined,
      'is-inverted': props.isInverted,
      'is-focused': props.isFocused,
      'is-active': props.isActive,
      'is-disabled': props.isDisabled,
      'is-hovered': props.isHovered
    }
  ];
}
