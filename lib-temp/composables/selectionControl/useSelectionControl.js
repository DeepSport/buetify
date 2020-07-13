import { computed, toRef } from 'vue';
import { isEnterEvent, isSpaceEvent } from '../../utils/eventHelpers';
import { toggleListItem } from '../../utils/helpers';
import { useDisable, UseDisablePropsDefinition } from '../disable';
import { useFocus, UseFocusPropsDefinition } from '../focus';
import { useLabelId, UseLabelIdPropsDefinition } from '../labelId';
import { getUseModelPropsDefinition, useModel } from '../model';
import { getEqPropsDefinition } from '../shared';
export function getUseSelectablePropsDefinition() {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ trueValue: {
            type: null,
            default: true
        }, falseValue: {
            type: null,
            default: false
        }, indeterminateValue: {
            type: null
        }, isMultiple: {
            type: Boolean,
            default: false
        }, variant: {
            type: String,
            default: 'is-primary'
        }, size: {
            type: String,
            default: ''
        }, isRequired: {
            type: Boolean,
            default: false
        } }, getEqPropsDefinition()), getUseModelPropsDefinition()), UseDisablePropsDefinition), UseLabelIdPropsDefinition), UseFocusPropsDefinition);
}
function getIsActive(value, trueValue, isMultiple, eq) {
    if (isMultiple) {
        if (!Array.isArray(value))
            return false;
        return trueValue !== undefined && value.some(item => eq.equals(item, trueValue));
    }
    if (!Array.isArray(value) && trueValue !== undefined) {
        return value !== undefined && eq.equals(value, trueValue);
    }
    return false;
}
function getOnChange(value, trueValue, falseValue, isDisabled, isMultiple, eq) {
    return function onChange() {
        if (isDisabled.value)
            return;
        if (trueValue.value === undefined)
            return;
        const currentValue = value.value;
        const tValue = trueValue.value;
        if (isMultiple.value) {
            if (!Array.isArray(currentValue)) {
                value.value = [];
            }
            else {
                value.value = toggleListItem(eq.value)(tValue, currentValue);
            }
        }
        else if (!Array.isArray(currentValue)) {
            if (currentValue === undefined || (currentValue !== undefined && !eq.value.equals(currentValue, tValue))) {
                value.value = trueValue.value;
            }
            else {
                value.value = falseValue.value;
            }
        }
    };
}
function getInputAttrs(role, type, id, labelId, isActive, isDisabled, isReadonly, isRequired, value, trueValue, falseValue) {
    return {
        role,
        type,
        id,
        value,
        checked: isActive,
        'aria-checked': isActive,
        'aria-disabled': isDisabled,
        'aria-labelledby': labelId,
        tabindex: -1,
        readonly: isReadonly,
        disabled: isDisabled,
        required: isRequired,
        'true-value': JSON.stringify(trueValue),
        'false-value': JSON.stringify(falseValue)
    };
}
export function useSelectionControl(props, ref, role, type) {
    const { modelValue } = useModel(props);
    const focus = useFocus(props, ref);
    const label = useLabelId(props, role);
    const isActive = computed(() => getIsActive(modelValue.value, props.trueValue, isMultiple.value, props.eq));
    const isDisabled = computed(() => useDisable(props).value || (type === 'radio' && isActive.value));
    const isMultiple = computed(() => props.isMultiple || Array.isArray(modelValue.value));
    const onChange = getOnChange(modelValue, toRef(props, 'trueValue'), toRef(props, 'falseValue'), isDisabled, isMultiple, toRef(props, 'eq'));
    const attrs = computed(() => getInputAttrs(role, type, label.id.value, label.labelId.value, isActive.value, isDisabled.value, props.isReadonly, props.isRequired, modelValue.value, props.trueValue, props.falseValue));
    function onKeydown(e) {
        if (isEnterEvent(e) || isSpaceEvent(e)) {
            onChange();
        }
    }
    function onClick(e) {
        e.preventDefault();
        onChange();
    }
    return Object.assign(Object.assign({ modelValue }, focus), { isDisabled,
        isMultiple,
        isActive,
        attrs,
        onChange,
        onKeydown,
        onClick,
        label });
}
//# sourceMappingURL=useSelectionControl.js.map