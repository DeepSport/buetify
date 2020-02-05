import '../sass/form.sass';
import { exists } from '../../../utils/helpers';
import { constant } from 'fp-ts/lib/function';
import { VNode } from 'vue';
import { InputMixin } from '../../../mixins/input/InputMixin';
import { InputIcons } from '../shared/types';
import { applyMixins, ExtractVue } from '../../../utils/applyMixins';
import { AsyncComponent, Component, PropValidator } from 'vue/types/options';
import { ThemeInjectionMixin } from '../../../mixins/themeInjection/ThemeInjectionMixin';

export interface Data {
  newType: string;
  newAutocomplete: string;
  isPasswordVisible: boolean;
}

export const DEFAULT_INPUT_ICONS: InputIcons = {
  isSuccess: () => import('../../icons/check'),
  isDanger: () => import('../../icons/exclamationCircle'),
  isInfo: () => import('../../icons/infoCircle'),
  isWarning: () => import('../../icons/exclamationTriangle'),
  passwordInvisible: () => import('../../icons/eye'),
  passwordVisible: () => import('../../icons/eyeSlash')
};

const base = applyMixins(InputMixin, ThemeInjectionMixin);

export interface options extends ExtractVue<typeof base> {
  $refs: {
    input: HTMLElement;
  };
}

export default base.extend<options>().extend({
  name: 'BInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    passwordReveal: {
      type: Boolean,
      default: false
    },
    hasCounter: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    focusOnMount: {
      type: Boolean,
      default: false
    },
    inputIcons: {
      type: Object,
      required: false,
      default: constant(DEFAULT_INPUT_ICONS)
    } as PropValidator<InputIcons>
  },
  data(): Data {
    return {
      newType: this.type,
      newAutocomplete: this.autocomplete || 'on',
      isPasswordVisible: false
    };
  },
  computed: {
    hasIcon(): boolean {
      return exists(this.icon);
    },
    displayTextInput(): boolean {
      return this.type === 'textarea';
    },
    rootClasses(): any {
      return [
        this.iconPosition,
        this.size,
        {
          'is-expanded': this.isExpanded,
          'is-loading': this.isLoading,
          'is-clearfix': !this.hasMessage
        }
      ];
    },
    inputClasses(): any {
      return [this.statusType, this.size, { 'is-rounded': this.isRounded }, this.customClass, ...this.themeClasses];
    },
    displayRightIcon(): boolean {
      return (
        (this.passwordReveal && !!this.passwordRevealIcon) ||
        this.isLoading ||
        (!!this.statusType && !!this.statusTypeIcon)
      );
    },
    iconPosition(): string {
      if (this.icon && this.displayRightIcon) {
        return 'has-icons-left has-icons-right';
      } else if (!this.icon && this.displayRightIcon) {
        return 'has-icons-right';
      } else if (this.icon) {
        return 'has-icons-left';
      } else {
        return '';
      }
    },
    statusTypeIcon(): Component<any, any, any, any> | AsyncComponent<any, any, any, any> | undefined {
      switch (this.statusType) {
        case 'is-success':
          return this.inputIcons.isSuccess;
        case 'is-danger':
          return this.inputIcons.isDanger;
        case 'is-info':
          return this.inputIcons.isInfo;
        case 'is-warning':
          return this.inputIcons.isWarning;
        default:
          return undefined;
      }
    },
    hasMessage(): boolean {
      return !!this.statusMessage;
    },
    passwordRevealIcon(): any {
      return !this.isPasswordVisible ? this.inputIcons.passwordInvisible : this.inputIcons.passwordVisible;
    },
    valueLength(): number {
      if (typeof this.newValue === 'string') {
        return this.newValue.length;
      } else if (typeof this.newValue === 'number') {
        return this.newValue.toString().length;
      }
      return 0;
    },
    rightIcon(): Component<any, any, any, any> | AsyncComponent<any, any, any, any> {
      return this.passwordReveal ? this.passwordRevealIcon : this.statusTypeIcon;
    },
    rightIconVariant(): string | undefined {
      return this.passwordReveal ? 'is-primary' : this.statusType;
    },
    displayCounter(): boolean {
      return this.type !== 'number' && !!this.maxLength && this.hasCounter;
    }
  },
  methods: {
    togglePasswordVisibility() {
      if (this.passwordReveal) {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.newType = this.isPasswordVisible ? 'text' : 'password';
        this.focus();
      }
    },
    generateInput(): VNode {
      return this.displayTextInput ? this.generateTextInput() : this.generateNonTextInput();
    },
    generateNonTextInput(): VNode {
      return this.$createElement('input', {
        ref: 'input',
        staticClass: 'input',
        class: this.inputClasses,
        domProps: {
          type: this.newType,
          autocomplete: this.newAutocomplete,
          maxlength: this.maxLength,
          value: this.internalValue,
          placeholder: this.placeholder
        },
        on: {
          blur: this.onBlur,
          focus: this.onFocus,
          input: this.onInput
        },
        attrs: {
          ...this.$attrs,
          readonly: this.isReadonly,
          disabled: this.disabled
        }
      });
    },
    generateTextInput(): VNode {
      return this.$createElement('textarea', {
        ref: 'input',
        staticClass: 'textarea',
        class: this.inputClasses,
        domProps: {
          value: this.internalValue,
          maxlength: this.maxLength,
          placeholder: this.placeholder
        },
        on: {
          blur: this.onBlur,
          focus: this.onFocus,
          input: this.onInput
        },
        attrs: {
          ...this.$attrs,
          readonly: this.isReadonly,
          disabled: this.disabled
        }
      });
    },
    generateIcon(): VNode {
      return this.$createElement(this.icon, {
        staticClass: 'is-left',
        props: { size: this.iconSize }
      });
    },
    generateRightIcon(): VNode {
      return this.$createElement(this.rightIcon, {
        staticClass: 'is-right',
        class: { 'is-clickable': this.passwordReveal },
        props: {
          variant: this.rightIconVariant,
          size: this.iconSize
        },
        on: {
          click: this.togglePasswordVisibility
        }
      });
    },
    generateCounter(): VNode {
      return this.$createElement(
        'small',
        {
          staticClass: 'help counter',
          class: { 'is-invisible': !this.isFocused }
        },
        `${this.valueLength} / ${this.maxLength}`
      );
    }
  },
  mounted() {
    if (this.focusOnMount) {
      this.focus();
    }
  },
  render(): VNode {
    const nodes: VNode[] = [this.generateInput()];
    if (this.hasIcon) {
      nodes.push(this.generateIcon());
    }
    if (this.displayRightIcon) {
      nodes.push(this.generateRightIcon());
    }
    if (this.displayCounter) {
      nodes.push(this.generateCounter());
    }
    return this.$createElement(
      'div',
      {
        class: this.rootClasses,
        staticClass: 'control'
      },
      nodes
    );
  }
});
