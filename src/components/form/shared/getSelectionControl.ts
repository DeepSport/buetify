import { applyMixins } from '../../../utils/applyMixins';
import { isEnterEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { getLabelIdMixin } from '../../../mixins/labelId/LabelIdMixin';
import { SelectableMixin } from '../../../mixins/selectable/SelectableMixin';
import { ColorVariant } from '../../../types/ColorVariants';
import { SizeVariant } from '../../../types/SizeVariants';
import { PropType, VNode } from 'vue';

export function getSelectionControl(role: string, type: string, name: string, staticClass: string) {
  return applyMixins(getLabelIdMixin(role), SelectableMixin).extend({
    name,
    props: {
      variant: {
        type: String as PropType<ColorVariant>,
        default: 'is-primary'
      },
      size: {
        type: String as PropType<SizeVariant>
      },
      isRequired: Boolean
    },
    computed: {
      customInputAttrs(): object {
        return {};
      },
      inputAttrs(): object {
        return {
          ...this.customInputAttrs,
          role,
          type,
          id: this.computedId,
          'aria-checked': this.isActive,
          'aria-disabled': this.isDisabled,
          'aria-labelledby': this.labelId,
          tabindex: -1,
          readonly: this.isReadonly,
          disabled: this.disabled,
          required: this.isRequired,
          'true-value': this.trueValue,
          'false-value': this.falseValue
        };
      },
      customInputDomProps(): object {
        return {};
      },
      inputDomProps(): object {
        return {
          ...this.customInputDomProps,
          checked: this.isActive,
          value: this.value
        };
      }
    },
    methods: {
      onKeydown(e: KeyboardEvent): void {
        e.preventDefault();
        if (isEnterEvent(e) || isSpaceEvent(e)) {
          this.onChange();
        }
      },
      onLabelClick(e: MouseEvent): void {
        e.preventDefault();
        this.onChange();
      },
      generateSelectionControl(): VNode {
        return this.generateLabel();
      },
      generateLabel(): VNode {
        return this.$createElement(
          'label',
          {
            staticClass,
            class: [this.size, { 'is-disabled': this.isDisabled }],
            ref: 'label',
            attrs: {
              id: this.labelId,
              for: this.computedId,
              disabled: this.disabled,
              tabindex: this.disabled ? -1 : 0
            },
            on: {
              keydown: this.onKeydown,
              blur: this.onBlur,
              click: this.onLabelClick
            }
          },
          [this.generateInput(), this.generateCheck(), this.generateLabelText()]
        );
      },
      generateInput(): VNode {
        return this.$createElement('input', {
          attrs: this.inputAttrs,
          domProps: this.inputDomProps,
          on: {
            blur: this.onBlur,
            change: this.onChange,
            focus: this.onFocus
          }
        });
      },
      generateCheck(): VNode {
        return this.$createElement('span', {
          staticClass: 'check',
          class: this.variant
        });
      },
      generateLabelText(): VNode {
        return this.$createElement(
          'span',
          {
            staticClass: 'control-label'
          },
          this.$slots.default || this.label
        );
      }
    },
    render(): VNode {
      return this.generateSelectionControl();
    }
  });
}
