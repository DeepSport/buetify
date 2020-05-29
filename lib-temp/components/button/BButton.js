import './button.sass';
import { h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
function getButtonClasses(props) {
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
export default function BButton(props, { slots, attrs }) {
    return h(props.tag ?? 'button', { ...attrs, class: mergeClasses(attrs.class, getButtonClasses(props)) }, slots.default ? slots.default() : []);
}
//# sourceMappingURL=BButton.js.map