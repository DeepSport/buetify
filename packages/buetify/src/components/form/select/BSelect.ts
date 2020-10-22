import '../sass/form.sass';
import './select.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { getUseInputPropsDefinition, Input, useInput, UseInputProps } from '../../../composables/input/useInput';
import { EqProps, getEqPropsDefinition } from '../../../composables/shared';
import { DefaultThemePropsDefinition, useTheme } from '../../../composables/theme';
import { Extractor, extractProp, isBoolean } from '../../../utils/helpers';
import { PropType, VNode, defineComponent, h, shallowRef, SetupContext, Ref, vModelSelect, withDirectives } from 'vue';
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
      default: 'text'
    },
    itemValue: {
      type: [String, Function] as PropType<Extractor<T>>,
      default: 'value'
    },
    itemDisabled: {
      type: [String, Function] as PropType<Extractor<T>>,
      default: 'isDisabled'
    },
    displayCount: {
      type: [String, Number]
    }
  };
}

export type BSelectProps<T> = EqProps<T> &
  UseInputProps<T> & {
    items: T[];
    isMultiple: boolean;
    itemKey?: Extractor<T>;
    itemText: Extractor<T>;
    itemValue: Extractor<T>;
    itemDisabled: Extractor<T>;
    displayCount?: string | number;
  };

function getControlClasses(isExpanded: boolean, hasIcon: boolean) {
  return {
    'is-expanded': isExpanded,
    'has-icons-left': hasIcon
  };
}

function isMultiple<T>(props: BSelectProps<T>, input: Input) {
  return props.isMultiple || (props.isMultiple === undefined && Array.isArray(input.modelValue.value));
}

function isEmpty(val: unknown) {
  return val === null || val === undefined || (Array.isArray(val) && val.length === 0);
}

function getSelectClasses<T>(props: BSelectProps<T>, input: Input): Classes[] {
  return [
    input.size.value,
    input.messageVariant.value,
    {
      'is-fullwidth': input.isFullwidth.value,
      'is-loading': props.isLoading,
      'is-multiple': isMultiple(props, input),
      'is-rounded': props.isRounded,
      'is-empty': isEmpty(input.modelValue.value)
    }
  ];
}

function generatePlaceholder<T>(props: BSelectProps<T>, context: SetupContext): VNode {
  return h(
    'option',
    {
      value: null,
      hidden: true,
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
function generateOptions<T>(props: BSelectProps<T>, context: SetupContext, input: Input) {
  const isSelected = getIsSelected(props, input);
  return props.items.map((item, index) => {
    const isDisabled = extractProp(props.itemDisabled, item);
    return context.slots.option
      ? context.slots.option({ item, index })
      : h(
          'option',
          {
            key: props.itemKey ? ((extractProp(props.itemKey, item) as unknown) as string) : String(index),
            value: extractProp(props.itemValue, item),
            disabled: isBoolean(isDisabled) ? isDisabled : !isDisabled,
            selected: isSelected(item)
          },
          context.slots.default
            ? context.slots.default({ item, index })
            : ((extractProp(props.itemText, item) as unknown) as string)
        );
  });
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
  return withDirectives(
    h(
      'select',
      {
        ...context.attrs,
        ref,
        required: props.isRequired,
        disabled: props.isDisabled,
        // size: props.displayCount || null,
        multiple: isMultiple(props, input),
        class: themeClasses,
        onBlur: input.onBlur,
        onFocus: input.onFocus,
        'onUpdate:modelValue': input.set
      },
      usePlaceholder
        ? [generatePlaceholder(props, context), ...generateOptions(props, context, input)]
        : generateOptions(props, context, input)
    ),
    [[vModelSelect, value || null]]
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
        const nodes = [
          h(
            'span',
            {
              class: ['select', ...getSelectClasses(props as BSelectProps<T>, input as Input)]
            },
            [generateSelect(props as BSelectProps<T>, context, selectRef, input as Input, themeClasses.value)]
          )
        ];

        if (input.icon && input.icon.value) {
          nodes.push(
            h(input.icon.value, {
              class: 'is-left',
              size: input.size.value
            })
          );
        }

        return h('div', { class: ['control', getControlClasses(input.isExpanded.value, !!input.icon)] }, nodes);
      };
    }
  });
}

// eslint-disable-next-line
export const BSelect = defineSelect<any>();
