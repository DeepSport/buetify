import { getUseTogglePropsDefinition, useToggle } from '../../../composables/toggle';
import { defineComponent } from 'vue';
export function defineToggle(statusName) {
    return defineComponent({
        name: 'toggle',
        props: getUseTogglePropsDefinition(statusName),
        setup(props, { slots }) {
            const toggle = useToggle(props, statusName);
            return () => slots.default &&
                slots.default({
                    attrs: toggle.attrs.value,
                    listeners: toggle.listeners,
                    isOn: toggle.isOn.value,
                    isOff: toggle.isOff.value,
                    setOn: toggle.setOn,
                    setOff: toggle.setOff,
                    toggle: toggle.toggle
                });
        }
    });
}
export const DefaultToggle = defineToggle('status');
//# sourceMappingURL=DefaultToggle.js.map