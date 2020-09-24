import "../../../../src/components/form/sass/form.sass";
import { getUseInputPropsDefinition, useInput } from '../../../composables/input/useInput';
import { useToggle } from '../../../composables/toggle';
import { isNumber, isString } from '../../../utils/helpers';
import { constant } from 'fp-ts/lib/function';
import { DEFAULT_INPUT_ICONS } from '../shared/types';
import { defineComponent, shallowRef, h, computed, shallowReactive, watchEffect } from 'vue';
export function getBInputPropsDefinition() {
  return Object.assign(Object.assign({}, getUseInputPropsDefinition()), {
    isLoading: {
      type: Boolean,
      default: false
    },
    hasCounter: {
      type: Boolean,
      default: true
    },
    customInputClass: {
      type: String,
      default: ''
    },
    inputIcons: {
      type: Object,
      required: false,
      default: constant(DEFAULT_INPUT_ICONS)
    }
  });
}

function getIconPosition(leftIcon, rightIcon) {
  if (leftIcon && rightIcon) {
    return 'has-icons-left has-icons-right';
  } else if (rightIcon) {
    return 'has-icons-right';
  } else if (leftIcon) {
    return 'has-icons-left';
  } else {
    return '';
  }
}

function getRightIcon(icons, variant, usePasswordReveal, passwordIsVisible) {
  if (usePasswordReveal) {
    return passwordIsVisible ? icons.passwordVisible : icons.passwordInvisible;
  } else {
    switch (variant) {
      case 'is-danger':
        return icons.isDanger;

      case 'is-info':
        return icons.isInfo;

      case 'is-success':
        return icons.isSuccess;

      case 'is-warning':
        return icons.isWarning;

      default:
        return undefined;
    }
  }
}

function generateLeftIcon(icon, size) {
  return h(icon, {
    class: 'is-left',
    size
  });
}

function generateRightIcon(icon, size, variant, usePasswordReveal, passwordToggle) {
  return h(icon, Object.assign(Object.assign({
    class: ['is-right', {
      'is-clickable': usePasswordReveal
    }],
    variant,
    size
  }, passwordToggle.attrs.value), passwordToggle.listeners));
}

function generateCounter(isFocused, valueLength, maxLength) {
  return h('small', {
    class: ['help counter', {
      'is-invisible': !isFocused
    }]
  }, `${valueLength} / ${maxLength}`);
}

function getAutocomplete(autocomplete, type) {
  if (autocomplete && autocomplete.value) {
    return autocomplete.value;
  } else {
    switch (type) {
      case 'email':
        return 'email';

      case 'password':
        return 'password';

      default:
        return undefined;
    }
  }
}

function generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context) {
  const hasMessage = !!inputData.message.value;
  const type = inputData.type ? inputData.type.value : inputData.usePasswordReveal.value ? 'password' : undefined;
  return h('input', Object.assign(Object.assign({}, context.attrs), {
    ref: inputRef,
    class: ['input', ...getInputClasses(inputData.iconSize.value, inputData.isExpanded.value, isLoading, hasMessage, inputData.icon && inputData.icon.value, rightIcon)],
    modelValue: inputData.modelValue.value,
    'onUpdate:modelValue': inputData['onUpdate:modelValue'],
    type: inputData.type ? inputData.type.value : undefined,
    autocomplete: getAutocomplete(inputData.autocomplete, type),
    maxlength: inputData.maxlength && inputData.maxlength.value,
    placeholder: inputData.placeholder && inputData.placeholder.value,
    onBlur: inputData.onBlur,
    onFocus: inputData.onFocus,
    required: inputData.isRequired.value,
    readonly: inputData.isReadonly.value,
    disabled: inputData.isDisabled.value,
    tabindex: inputData.isDisabled.value ? 0 : -1,
    id: inputData.id.value
  }));
}

function generateTextarea(inputRef, inputData, isLoading, rightIcon, context) {
  const hasMessage = !!inputData.message.value;
  return h('textarea', Object.assign(Object.assign({}, context.attrs), {
    ref: inputRef,
    class: ['textarea', ...getInputClasses(inputData.iconSize.value, inputData.isExpanded.value, isLoading, hasMessage, inputData.icon && inputData.icon.value, rightIcon)],
    modelValue: inputData.modelValue.value,
    'onUpdate:modelValue': inputData['onUpdate:modelValue'],
    maxlength: inputData.maxlength && inputData.maxlength.value,
    placeholder: inputData.placeholder && inputData.placeholder.value,
    onBlur: inputData.onBlur,
    onFocus: inputData.onFocus,
    required: inputData.isRequired.value,
    readonly: inputData.isReadonly.value,
    disabled: inputData.isDisabled.value,
    tabindex: inputData.isDisabled.value ? 0 : -1,
    id: inputData.id.value
  }));
}

function generateInput(inputRef, inputData, isLoading, rightIcon, context) {
  const type = inputData.type && inputData.type.value;
  return type === 'textarea' ? generateTextarea(inputRef, inputData, isLoading, rightIcon, context) : generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context);
}

function getValueLength(modelValue) {
  if (isString(modelValue)) {
    return modelValue.length;
  } else if (isNumber(modelValue)) {
    return modelValue.toString().length;
  }

  return 0;
}

function getInputClasses(size, isExpanded, isLoading, hasMessage, leftIcon, rightIcon) {
  return [getIconPosition(leftIcon, rightIcon), size, {
    'is-expanded': isExpanded,
    'is-loading': isLoading,
    'is-clearfix': !hasMessage
  }];
}

export function defineInput() {
  return defineComponent({
    name: 'b-input',
    props: getBInputPropsDefinition(),

    setup(props, context) {
      watchEffect(() => {
        console.log(props, context.attrs);
      });
      const inputRef = shallowRef(null);
      const inputData = useInput(props, inputRef);
      const passwordToggle = useToggle(shallowReactive({
        isVisible: false,
        hasPopup: false
      }), 'isVisible');
      const rightIcon = computed(() => getRightIcon(props.inputIcons, inputData.messageVariant.value, props.usePasswordReveal, passwordToggle.isOn.value));
      const useCounter = computed(() => (inputData.type === undefined || inputData.modelValue && typeof inputData.modelValue.value !== 'number') && !!inputData.maxlength && props.hasCounter);
      return () => {
        const nodes = [generateInput(inputRef, inputData, props.isLoading, rightIcon.value, context)];

        if (inputData.icon && inputData.icon.value) {
          nodes.push(generateLeftIcon(inputData.icon.value, inputData.iconSize.value));
        }

        if (rightIcon.value) {
          nodes.push(generateRightIcon(rightIcon.value, inputData.iconSize.value, inputData.messageVariant.value, props.usePasswordReveal, passwordToggle));
        }

        if (useCounter.value && inputData.maxlength && inputData.maxlength.value !== undefined) {
          nodes.push(generateCounter(inputData.isFocused.value, getValueLength(inputData.modelValue.value), inputData.maxlength.value));
        }

        return h('div', {
          class: ['control', getInputClasses(props.size, inputData.isExpanded.value, props.isLoading, !!inputData.message.value, inputData.icon && inputData.icon.value, rightIcon.value)]
        }, nodes);
      };
    }

  });
}
export const BInput = defineInput();
//# sourceMappingURL=BInput.js.map