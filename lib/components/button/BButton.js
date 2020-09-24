import "../../../src/components/button/button.sass";
import { h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';

function getButtonClasses(props) {
  return ['button', props.variant, props.size ? props.size : '', {
    'is-rounded': !!props.isRounded,
    'is-loading': !!props.isLoading,
    'is-outlined': !!props.isOutlined,
    'is-inverted': !!props.isInverted,
    'is-focused': !!props.isFocused,
    'is-active': !!props.isActive,
    'is-disabled': !!props.isDisabled,
    'is-hovered': !!props.isHovered
  }];
}

export default function BButton(props, {
  slots,
  attrs
}) {
  var _a;

  return h((_a = props.tag) !== null && _a !== void 0 ? _a : 'button', Object.assign(Object.assign({}, attrs), {
    class: mergeClasses(attrs.class, getButtonClasses(props))
  }), slots.default ? slots.default() : []);
}
//# sourceMappingURL=BButton.js.map