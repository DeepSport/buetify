import "../../../../src/components/form/sass/form.sass";
import { getUseInputPropsDefinition, useInput } from '../../../composables/input/useInput';
import { DefaultThemePropsDefinition, useTheme } from '../../../composables/theme/useTheme';
import { isNumber, isString } from '../../../utils/helpers';
import { constant } from 'fp-ts/lib/function';
import { DEFAULT_INPUT_ICONS } from '../shared/types';
import { defineComponent, shallowRef, h, computed } from 'vue';
export function getBInputPropsDefinition() {
  return { ...getUseInputPropsDefinition(),
    ...DefaultThemePropsDefinition,
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
  };
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
  console.log(usePasswordReveal);
  return h(icon, {
    class: ['is-right', {
      'is-clickable': usePasswordReveal
    }],
    variant,
    size,
    ...passwordToggle.attrs.value,
    ...passwordToggle.listeners
  });
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

function generateNonTextInput(inputRef, inputData, isLoading, context, themeClasses) {
  const hasMessage = !!inputData.message.value;
  const type = inputData.type ? inputData.type.value : inputData.usePasswordReveal.value ? 'password' : undefined;
  return h('input', { ...context.attrs,
    ref: inputRef,
    class: ['input', inputData.messageVariant.value, inputData.size.value, {
      'is-rounded': inputData.isRounded.value,
      // 'is-expanded': inputData.isExpanded.value,
      'is-loading': isLoading,
      'is-clearfix': !hasMessage
    }, ...themeClasses],
    value: inputData.modelValue.value,
    onInput: inputData.onNativeInput,
    type: inputData.type ? inputData.type.value : undefined,
    autocomplete: getAutocomplete(inputData.autocomplete, type),
    maxlength: inputData.maxlength && inputData.maxlength.value,
    placeholder: inputData.placeholder && inputData.placeholder.value,
    onBlur: inputData.onBlur,
    onFocus: inputData.onFocus,
    required: inputData.isRequired.value,
    readonly: inputData.isReadonly.value,
    disabled: inputData.isDisabled.value,
    tabindex: inputData.isDisabled.value ? -1 : 0,
    id: inputData.id.value
  });
}

function generateTextarea(inputRef, inputData, isLoading, context, themeClasses) {
  const hasMessage = !!inputData.message.value;
  return h('textarea', { ...context.attrs,
    ref: inputRef,
    class: ['textarea', inputData.messageVariant.value, inputData.size.value, {
      'is-rounded': inputData.isRounded.value,
      'is-expanded': inputData.isExpanded.value,
      'is-loading': isLoading,
      'is-clearfix': !hasMessage
    }, ...themeClasses],
    value: inputData.modelValue.value,
    onInput: inputData.onNativeInput,
    maxlength: inputData.maxlength && inputData.maxlength.value,
    placeholder: inputData.placeholder && inputData.placeholder.value,
    onBlur: inputData.onBlur,
    onFocus: inputData.onFocus,
    required: inputData.isRequired.value,
    readonly: inputData.isReadonly.value,
    disabled: inputData.isDisabled.value,
    tabindex: inputData.isDisabled.value ? -1 : 0,
    id: inputData.id.value
  });
}

function generateInput(inputRef, inputData, isLoading, context, themeClasses) {
  const type = inputData.type && inputData.type.value;
  return type === 'textarea' ? generateTextarea(inputRef, inputData, isLoading, context, themeClasses) : generateNonTextInput(inputRef, inputData, isLoading, context, themeClasses);
}

function getValueLength(modelValue) {
  if (isString(modelValue)) {
    return modelValue.length;
  } else if (isNumber(modelValue)) {
    return modelValue.toString().length;
  }

  return 0;
}

export function defineInput() {
  return defineComponent({
    name: 'b-input',
    inheritAttrs: false,
    props: getBInputPropsDefinition(),

    setup(props, context) {
      const inputRef = shallowRef(null);
      const inputData = useInput(props, inputRef);
      const rightIcon = computed(() => getRightIcon(props.inputIcons, inputData.messageVariant.value, inputData.usePasswordReveal.value, inputData.passwordToggle.isOn.value));
      const useCounter = computed(() => (inputData.type === undefined || inputData.modelValue && typeof inputData.modelValue.value !== 'number') && !!inputData.maxlength && props.hasCounter);
      const {
        themeClasses
      } = useTheme(props);
      return () => {
        const nodes = [generateInput(inputRef, inputData, props.isLoading, context, themeClasses.value)];

        if (inputData.icon && inputData.icon.value) {
          nodes.push(generateLeftIcon(inputData.icon.value, inputData.iconSize.value));
        }

        if (rightIcon.value) {
          nodes.push(generateRightIcon(rightIcon.value, inputData.iconSize.value, inputData.messageVariant.value, inputData.usePasswordReveal.value, inputData.passwordToggle));
        }

        if (useCounter.value && inputData.maxlength && inputData.maxlength.value !== undefined) {
          nodes.push(generateCounter(inputData.isFocused.value, getValueLength(inputData.modelValue.value), inputData.maxlength.value));
        }

        return h('div', {
          class: ['control', inputData.size.value, getIconPosition(inputData.icon?.value, rightIcon.value), {
            'is-expanded': inputData.isExpanded.value,
            'is-loading': props.isLoading,
            'is-clearfix': !inputData.message.value
          }]
        }, nodes);
      };
    }

  });
} // eslint-disable-next-line

export const BInput = defineInput();
//# sourceMappingURL=BInput.js.map