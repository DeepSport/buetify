import './select.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { getUseInputPropsDefinition, Input, useInput, UseInputProps } from '../../../composables/input/useInput';
import { EqProps, getEqPropsDefinition } from '../../../composables/shared';
import { DefaultThemePropsDefinition, useTheme } from '../../../composables/theme';
import { Extractor, extractProp, isBoolean } from '../../../utils/helpers';
import { PropType, VNode, defineComponent, h, shallowRef, SetupContext, Ref } from 'vue';
import { Classes } from '../../../utils/mergeClasses';

export interface SelectItem<T> {
  value: T;
  text: string;
  isDisabled: boolean;
  isSelected: boolean;
}

export function getBSelectPropsDefinition<T>(eq?: Eq<T>) {
  return {
    ...getEqPropsDefinition<T>(eq),
    ...getUseInputPropsDefinition<T>(),
    ...DefaultThemePropsDefinition,
    items: {
      type: Array as PropType<T[]>,
      required: true as const
    },
    isMultiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    itemKey: {
      type: [String, Function] as PropType<Extractor<T>>
    },
    itemText: {
      type: [String, Function] as PropType<Extractor<T>>,
      default: 'text' as any
    },
    itemValue: {
      type: [String, Function] as PropType<Extractor<T>>,
      default: 'value' as any
    },
    itemDisabled: {
      type: [String, Function] as PropType<Extractor<T>>,
      default: 'isDisabled' as any
    },
    displayCount: {
      type: [String, Number]
    }
  };
}

export type BSelectProps<T> = EqProps<T> & UseInputProps<T>  &{
  items: T[];
  isMultiple: boolean;
  itemKey?: Extractor<T>;
  itemText: Extractor<T>;
  itemValue: Extractor<T>;
  itemDisabled: Extractor<T>;
  displayCount?: string | number;
}

function getControlClasses(isExpanded: boolean, hasIcon: boolean) {
  return {
    'is-expanded': isExpanded,
    'has-icons-left': hasIcon
  };
}

function getSelectClasses<T>(props: BSelectProps<T>, input: Input): Classes[] {
  return [
    input.size.value,
    props.variant,
    {
      'is-fullwidth': input.isFullwidth.value,
      'is-loading': props.isLoading,
      'is-multiple': isMultiple(props, input),
      'is-rounded': props.isRounded,
      'is-empty': isEmpty(input.modelValue.value)
    }
  ];
}

function isEmpty(val: any) {
  return val === null || val === undefined || (Array.isArray(val) && val.length === 0);
}

function generatePlaceholder<T>(props: BSelectProps<T>, context: SetupContext): VNode {
  return h(
    'option',
    {
      value: '',
      disabled: true,
      selected: true
    },
    context.slots.placeholder ? context.slots.placeholder() : props.placeholder
  );
}

function getIsSelected<T>(props: BSelectProps<T>, input: Input) {
  return (val: T) => {
    const equals = props.eq.equals;
    const value = input.modelValue.value;
    if (value === null || value === undefined) {
      return false;
    } else if (isMultiple(props, input)) {
      return Array.isArray(value) ? value.some(v => equals(v, val)) : false;
    } else {
      return equals(val, value as T);
    }
  };
}
function generateOptions<T>(props: BSelectProps<T>, context: SetupContext, input: Input): VNode[] {
  const isSelected = getIsSelected(props, input);
  return props.items.map((item, index) => {
    const isDisabled = extractProp(props.itemDisabled, item);
    return h(
      'option',
      {
        key: props.itemKey ? (extractProp(props.itemKey, item) as any) : String(index),
        value: extractProp(props.itemValue, item),
        disabled: isBoolean(isDisabled) ? isDisabled : !!isDisabled,
        selected: isSelected(item)
      },
      context.slots.default ? context.slots.default({ item, index }) : (extractProp(props.itemText, item) as any)
    );
  });
}

function isMultiple<T>(props: BSelectProps<T>, input: Input) {
  return props.isMultiple || (props.isMultiple === undefined && Array.isArray(input.modelValue.value));
}

function generateSelect<T>(
  props: BSelectProps<T>,
  context: SetupContext,
  ref: Ref<HTMLElement>,
  input: Input,
  themeClasses: Classes
): VNode {
  const value = input.modelValue.value;
  const usePlaceholder = isEmpty(value) && (!!props.placeholder || !!context.slots.placeholder);
  return h(
    'select',
    {
      ...context.attrs,
      ref,
      value,
      size: props.displayCount,
      multiple: isMultiple(props, input),
      class: themeClasses,
      onBlur: input.onBlur,
      onFocus: input.onFocus,
      'onUpdate:modelValue': input['onUpdate:modelValue']
    },
    usePlaceholder
      ? [generatePlaceholder(props, context), ...generateOptions(props, context, input)]
      : generateOptions(props, context, input)
  );
}

export function defineSelect<T>(eq?: Eq<T>) {
  return defineComponent({
    name: 'b-select',
    props: getBSelectPropsDefinition<T>(eq),
    setup(props, context) {
      const selectRef = shallowRef((null as unknown) as HTMLElement);
      const input = useInput(props as UseInputProps<T>, selectRef);
      const { themeClasses } = useTheme(props);
      return () => {
        return h('div', { class: ['control', getControlClasses(input.isExpanded.value, !!input.icon)] }, [
          h(
            'span',
            {
              class: ['select', ...getSelectClasses(props as BSelectProps<T>, input as Input)]
            },
            [generateSelect(props as BSelectProps<T>, context, selectRef, input as Input, themeClasses.value)]
          )
        ]);
      };
    }
  });
}

export const BSelect = defineSelect<any>();
