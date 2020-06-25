import { constVoid, FunctionN, not } from 'fp-ts/lib/function';
import { PropType, ExtractPropTypes, provide, shallowRef, computed, watch, toRef, Ref } from 'vue';
import { AllColorsVariant } from '../../types/ColorVariants';
import { isEmptyString, isString } from '../../utils/helpers';
import { useLabelId, UseLabelIdPropsDefinition } from '../labelId';

export const PROVIDE_FIELD_DATA_INJECTION_SYMBOL = Symbol('use-field-data');

export const ProvideFieldDataPropsDefinition = {
  ...UseLabelIdPropsDefinition,
  variant: {
    type: [String, Object] as PropType<AllColorsVariant>,
    required: false
  },
  message: {
    type: [String, Array, Object] as PropType<
      string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }>
    >,
    required: false
  },
  isExpanded: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type ProvideFieldDataProps = ExtractPropTypes<typeof ProvideFieldDataPropsDefinition>;

export function formatMessage(
  message: string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }> | undefined
): string {
  if (isString(message)) {
    return message;
  } else {
    const messages = [];
    if (Array.isArray(message)) {
      message.forEach(m => {
        if (isString(m)) {
          messages.push(m);
        } else {
          for (const key in m) {
            if (m[key]) {
              messages.push(key);
            }
          }
        }
      });
    } else {
      for (const key in message) {
        if (message[key]) {
          messages.push(key);
        }
      }
    }
    return messages.filter(not(isEmptyString)).join(' <br> ');
  }
}

export interface FieldDataAttrs {
  label: Ref<string>;
  isFullwidth: Ref<boolean>;
  isExpanded: Ref<boolean>;
  message: Ref<string>;
  messageVariant: Ref<undefined | AllColorsVariant>;
  id: Ref<string | undefined>;
  labelId: Ref<string | undefined>;
}

export interface FieldDataListeners {
  onNewMessage: FunctionN<[string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }>], void>;
  onNewVariant: FunctionN<[AllColorsVariant], void>;
}

export interface FieldDataInjection {
  attrs: FieldDataAttrs;
  setters: FieldDataListeners;
}

export const DEFAULT_FIELD_DATA_INJECTION: FieldDataInjection = {
  attrs: {
    label: shallowRef(''),
    isFullwidth: shallowRef(false),
    isExpanded: shallowRef(false),
    message: shallowRef(''),
    messageVariant: shallowRef(),
    id: shallowRef(),
    labelId: shallowRef()
  },
  setters: {
    onNewMessage: constVoid,
    onNewVariant: constVoid
  }
};

export function provideFieldData(props: ProvideFieldDataProps) {
  const label = useLabelId(props, 'field');
  const variant = shallowRef(props.variant);
  watch(toRef(props, 'variant'), newVariant => {
    variant.value = newVariant;
  });
  const message = shallowRef(props.message);
  watch(toRef(props, 'message'), newMessage => {
    message.value = newMessage;
  });
  const formattedMessage = computed(() => formatMessage(message.value));

  const isExpanded = toRef(props, 'isExpanded');

  const attrs = {
    label: toRef(props, 'label'),
    isFullwidth: isExpanded,
    isExpanded: isExpanded,
    message: formattedMessage,
    messageVariant: variant,
    id: label.id,
    labelId: label.labelId
  };

  const setters = {
    onNewMessage: (newMessage: string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }>) => {
      message.value = newMessage;
    },
    onNewVariant: (newVariant: AllColorsVariant) => {
      variant.value = newVariant;
    }
  };

  const injection: FieldDataInjection = {
    attrs,
    setters
  };

  provide(PROVIDE_FIELD_DATA_INJECTION_SYMBOL, injection);

  return injection;
}
