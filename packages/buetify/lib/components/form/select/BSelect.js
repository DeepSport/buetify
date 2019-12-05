import "../../../../src/components/form/sass/form.sass";
import "../../../../src/components/form/select/select.sass";
import { getUseInputPropsDefinition, useInput } from '../../../composables/input/useInput';
import { getEqPropsDefinition } from '../../../composables/shared';
import { DefaultThemePropsDefinition, useTheme } from '../../../composables/theme';
import { extractProp, isBoolean } from '../../../utils/helpers';
import { defineComponent, h, shallowRef, vModelSelect, withDirectives } from 'vue';
export function getBSelectPropsDefinition(eq) {
  return { ...getEqPropsDefinition(eq),
    ...getUseInputPropsDefinition(),
    ...DefaultThemePropsDefinition,
    items: {
      type: Array,
      required: true
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: [String, Function]
    },
    itemText: {
      type: [String, Function],
      default: 'text'
    },
    itemValue: {
      type: [String, Function],
      default: 'value'
    },
    itemDisabled: {
      type: [String, Function],
      default: 'isDisabled'
    },
    displayCount: {
      type: [String, Number]
    }
  };
}

function getControlClasses(isExpanded, hasIcon) {
  return {
    'is-expanded': isExpanded,
    'has-icons-left': hasIcon
  };
}

function isMultiple(props, input) {
  return props.isMultiple || props.isMultiple === undefined && Array.isArray(input.modelValue.value);
}

function isEmpty(val) {
  return val === null || val === undefined || Array.isArray(val) && val.length === 0;
}

function getSelectClasses(props, input) {
  return [input.size.value, input.messageVariant.value, {
    'is-fullwidth': input.isFullwidth.value,
    'is-loading': props.isLoading,
    'is-multiple': isMultiple(props, input),
    'is-rounded': props.isRounded,
    'is-empty': isEmpty(input.modelValue.value)
  }];
}

function generatePlaceholder(props, context) {
  return h('option', {
    value: '',
    disabled: true,
    selected: true
  }, context.slots.placeholder ? context.slots.placeholder() : props.placeholder);
}

function getIsSelected(props, input) {
  return val => {
    const equals = props.eq.equals;
    const value = input.modelValue.value;

    if (value === null || value === undefined) {
      return false;
    } else if (isMultiple(props, input)) {
      return Array.isArray(value) ? value.some(v => equals(v, val)) : false;
    } else {
      return equals(val, value);
    }
  };
}

function generateOptions(props, context, input) {
  const isSelected = getIsSelected(props, input);
  return props.items.map((item, index) => {
    const isDisabled = extractProp(props.itemDisabled, item);
    return context.slots.option ? context.slots.option({
      item,
      index
    }) : h('option', {
      key: props.itemKey ? extractProp(props.itemKey, item) : String(index),
      value: extractProp(props.itemValue, item),
      disabled: isBoolean(isDisabled) ? isDisabled : !isDisabled,
      selected: isSelected(item)
    }, context.slots.default ? context.slots.default({
      item,
      index
    }) : extractProp(props.itemText, item));
  });
}

function generateSelect(props, context, ref, input, themeClasses) {
  const value = input.modelValue.value;
  const usePlaceholder = isEmpty(value) && (!!props.placeholder || !!context.slots.placeholder);
  return withDirectives(h('select', { ...context.attrs,
    ref,
    required: props.isRequired,
    disabled: props.isDisabled,
    size: props.displayCount,
    multiple: isMultiple(props, input),
    class: themeClasses,
    onBlur: input.onBlur,
    onFocus: input.onFocus,
    'onUpdate:modelValue': input.set
  }, usePlaceholder ? [generatePlaceholder(props, context), ...generateOptions(props, context, input)] : generateOptions(props, context, input)), [[vModelSelect, value]]);
}

export function defineSelect(eq) {
  return defineComponent({
    name: 'b-select',
    props: getBSelectPropsDefinition(eq),

    setup(props, context) {
      const selectRef = shallowRef(null);
      const input = useInput(props, selectRef);
      const {
        themeClasses
      } = useTheme(props);
      return () => {
        const nodes = [h('span', {
          class: ['select', ...getSelectClasses(props, input)]
        }, [generateSelect(props, context, selectRef, input, themeClasses.value)])];

        if (input.icon && input.icon.value) {
          nodes.push(h(input.icon.value, {
            class: 'is-left',
            size: input.size.value
          }));
        }

        return h('div', {
          class: ['control', getControlClasses(input.isExpanded.value, !!input.icon)]
        }, nodes);
      };
    }

  });
} // eslint-disable-next-line

export const BSelect = defineSelect();
//# sourceMappingURL=BSelect.js.map