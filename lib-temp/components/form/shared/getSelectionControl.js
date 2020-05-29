import { getUseSelectablePropsDefinition, useSelectionControl } from '../../../composables/selectionControl/useSelectionControl';
import { defineComponent, shallowRef, h } from 'vue';
function generateCheck(variant) {
    return h('span', { class: [variant, 'check'] });
}
function generateInput(selectionControl) {
    return h('input', {
        ...selectionControl.attrs.value,
        onBlur: selectionControl.onBlur,
        onChange: selectionControl.onChange,
        onFocus: selectionControl.onFocus
    });
}
function generateLabelText(selectionControl, slots) {
    return h('span', {
        class: 'control-label'
    }, slots.default ? slots.default() : selectionControl.label.labelId.value);
}
export function getSelectionControl(role, type, name, staticClass) {
    return () => defineComponent({
        name,
        props: getUseSelectablePropsDefinition(),
        setup(props, { slots }) {
            const label = shallowRef(null);
            const selection = useSelectionControl(props, label, role, type);
            return () => {
                return h('label', {
                    class: [staticClass, props.size, { 'is-disabled': selection.isDisabled.value }],
                    ref: label,
                    id: selection.label.labelId.value,
                    for: selection.label.id.value,
                    disabled: selection.isDisabled.value,
                    tabindex: selection.isDisabled.value ? -1 : 0,
                    onKeydown: selection.onKeydown,
                    onBlur: selection.onBlur,
                    onClick: selection.onClick
                }, [generateInput(selection), generateCheck(props.variant), generateLabelText(selection, slots)]);
            };
        }
    });
}
//# sourceMappingURL=getSelectionControl.js.map