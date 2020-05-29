import '../sass/form.sass';
import { provideFieldData, ProvideFieldDataPropsDefinition } from '../../../composables/fieldData';
import { DefaultThemePropsDefinition } from '../../../composables/theme';
import { resolveDirective, withDirectives, h, defineComponent, defineAsyncComponent, computed, shallowRef, watch } from 'vue';
const BFieldBody = defineAsyncComponent(() => import('./BFieldBody'));
function getFieldClasses(props) {
    return computed(() => {
        const isGrouped = props.isGrouped;
        const position = props.position;
        return {
            'is-expanded': props.isExpanded,
            'is-grouped-multiline': props.isGroupedMultiline,
            'is-horizontal': props.isHorizontal,
            'is-grouped-centered': isGrouped && position === 'is-centered',
            'is-grouped-right': isGrouped && position === 'is-right',
            'has-addons-centered': !isGrouped && position === 'is-centered',
            'has-addons-right': !isGrouped && position === 'is-right'
        };
    });
}
export const BFieldPropsDefinition = {
    ...DefaultThemePropsDefinition,
    ...ProvideFieldDataPropsDefinition,
    isGrouped: {
        type: Boolean,
        default: false
    },
    isGroupedMultiline: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        default: 'is-left'
    },
    isHorizontal: {
        type: Boolean,
        default: false
    },
    hasAddons: {
        type: Boolean,
        default: true
    },
    customLabelClass: {
        type: String,
        default: ''
    }
};
function generateInnerLabel(fieldData, customClass) {
    return h('label', {
        class: ['label', customClass],
        id: fieldData.labelId.value,
        for: fieldData.id.value
    }, fieldData.label.value);
}
function generateHorizontalLabel(fieldData, customClass, size) {
    return h('div', { class: ['field-label', size] }, [generateInnerLabel(fieldData, customClass)]);
}
function generateLabel(isHorizontal, fieldData, customClass, size) {
    const label = fieldData.label.value;
    if (isHorizontal && !!label) {
        return [generateHorizontalLabel(fieldData, customClass, size)];
    }
    else if (isHorizontal && !!label) {
        return [generateInnerLabel(fieldData, customClass)];
    }
    else {
        return [];
    }
}
function generateHelpMessage(isHorizontal, fieldDataAttrs, vShow) {
    const showHelpMessage = !isHorizontal && !!fieldDataAttrs.message.value;
    return withDirectives(h('p', {
        class: ['help', fieldDataAttrs.messageVariant.value],
        'aria-hidden': showHelpMessage,
        innerHTML: fieldDataAttrs.message.value
    }), [[vShow, showHelpMessage]]);
}
function generateFieldBody(fieldData, role, slots) {
    return h(BFieldBody, {
        class: { 'is-expanded': fieldData.isExpanded.value },
        message: fieldData.message.value,
        variant: fieldData.messageVariant.value,
        slots,
        role
    });
}
function generateBody(isHorizontal, fieldData, role, slots) {
    if (isHorizontal) {
        return [generateFieldBody(fieldData, role, slots)];
    }
    else {
        return slots.default();
    }
}
function getFieldType(isGrouped, hasAddons, isHorizontal, slots) {
    return isGrouped
        ? 'is-grouped'
        : hasAddons && !isHorizontal && slots.default().filter(n => !!n.el).length > 1
            ? 'has-addons'
            : '';
}
export default defineComponent({
    name: 'b-field',
    props: BFieldPropsDefinition,
    setup(props, { slots }) {
        const vShow = resolveDirective('show');
        const field = shallowRef(null);
        const fieldData = provideFieldData(props);
        const classes = getFieldClasses(props);
        const role = computed(() => (props.isGrouped ? 'group' : ''));
        const size = shallowRef('');
        watch(field, newVal => {
            if (props.isHorizontal) {
                // Bulma docs: .is-normal for any .input or .button
                const elements = newVal.querySelectorAll('.input, .select, .button, .textarea');
                if (elements.length > 0) {
                    size.value = 'is-normal';
                }
            }
        });
        return () => {
            return h('div', {
                ref: field,
                class: ['field', classes.value, getFieldType(props.isGrouped, props.hasAddons, props.isHorizontal, slots)],
                role: role.value
            }, [
                generateLabel(props.isHorizontal, fieldData.attrs, props.customLabelClass, size.value),
                ...generateBody(props.isHorizontal, fieldData.attrs, role.value, slots),
                generateHelpMessage(props.isHorizontal, fieldData.attrs, vShow)
            ]);
        };
    }
});
//# sourceMappingURL=BField.js.map