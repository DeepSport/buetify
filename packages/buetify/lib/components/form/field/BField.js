import "../../../../src/components/form/sass/tools.sass";
import { constant } from 'fp-ts/lib/function';
import { provideFieldData, ProvideFieldDataPropsDefinition } from '../../../composables/fieldData';
import { DefaultThemePropsDefinition } from '../../../composables/theme';
import { h, defineComponent, computed, shallowRef, watch } from 'vue';

function useRootClasses(props) {
  return {
    'is-expanded': props.isExpanded,
    'is-horizontal': props.isHorizontal
  };
}

function useFieldType(isGrouped, hasAddons) {
  return isGrouped ? 'is-grouped' : hasAddons ? 'has-addons' : '';
}

function useInnerFieldClasses(props, fieldType) {
  const isGrouped = props.isGrouped;
  const position = props.position;
  return [fieldType, {
    'flex-grow-1': props.isExpanded,
    'is-grouped-multiline': props.isGroupedMultiline,
    'is-horizontal': props.isHorizontal,
    'is-grouped-centered': isGrouped && position === 'is-centered',
    'is-grouped-right': isGrouped && position === 'is-right',
    'has-addons-centered': !isGrouped && position === 'is-centered',
    'has-addons-right': !isGrouped && position === 'is-right'
  }];
}

export const BFieldPropsDefinition = { ...DefaultThemePropsDefinition,
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
  return h('div', {
    class: ['field-label', size]
  }, [generateInnerLabel(fieldData, customClass)]);
}

function generateLabel(isHorizontal, fieldData, customClass, size) {
  const label = fieldData.label.value;

  if (isHorizontal && !!label) {
    return [generateHorizontalLabel(fieldData, customClass, size)];
  } else if (!isHorizontal && !!label) {
    return [generateInnerLabel(fieldData, customClass)];
  } else {
    return [];
  }
}

function generateHelpMessage(isHorizontal, fieldDataAttrs) {
  return !isHorizontal && !!fieldDataAttrs.message.value ? h('p', {
    class: ['help', fieldDataAttrs.messageVariant.value],
    innerHTML: fieldDataAttrs.message.value
  }) : undefined;
}

function generateBody(props, fieldData, role, hasInnerField, fieldType, slots) {
  if (props.isHorizontal) {
    return [h(BFieldBody, // eslint-disable-line
    {
      class: {
        'is-expanded': fieldData.isExpanded.value
      },
      message: fieldData.message.value,
      variant: fieldData.messageVariant.value,
      role
    }, slots.default)];
  } else if (hasInnerField) {
    return [h('div', {
      class: 'field-body'
    }, [h(BField, // eslint-disable-line
    {
      hasAddons: false,
      variant: fieldData.messageVariant.value,
      class: useInnerFieldClasses(props, fieldType)
    }, slots.default)])];
  } else {
    return slots.default ? slots.default() : [];
  }
}

const BField = defineComponent({
  name: 'b-field',
  props: BFieldPropsDefinition,

  setup(props, {
    slots
  }) {
    const field = shallowRef(null);
    const fieldData = provideFieldData(props);
    const role = computed(() => props.isGrouped ? 'group' : '');
    const size = shallowRef('');
    watch(field, newVal => {
      if (props.isHorizontal && newVal) {
        // Bulma docs: .is-normal for any .input or .button
        const elements = newVal.querySelectorAll('.input, .select, .button, .textarea');

        if (elements.length > 0) {
          size.value = 'is-normal';
        }
      }
    });
    return () => {
      const hasAddons = !!(props.hasAddons && !props.isHorizontal && slots.default && slots.default().length > 1);
      const hasInnerField = props.isGrouped || props.isGroupedMultiline || hasAddons;
      const nodes = [...generateLabel(props.isHorizontal, fieldData.attrs, props.customLabelClass, size.value), ...generateBody(props, fieldData.attrs, role.value, hasInnerField, useFieldType(props.isGrouped, hasAddons), slots), generateHelpMessage(props.isHorizontal, fieldData.attrs)];
      return h('div', {
        ref: field,
        class: ['field', useRootClasses(props)],
        role: role.value
      }, nodes);
    };
  }

}); // eslint-disable-next-line

function BFieldBody(props, {
  attrs,
  slots
}) {
  const nodes = slots.default ? slots.default() : [];
  return h(props.tag ?? 'div', {
    class: 'field-body'
  }, nodes.map(element => element.el ? element : h(BField, props, constant(element))));
}

export default BField;
//# sourceMappingURL=BField.js.map