import './select.sass';
import { Extractor, ExtractPropMixin } from '../../../mixins/extractProp/ExtractPropMixin';
import { PropValidator } from 'vue/types/options';
import { ScopedSlotChildren } from 'vue/types/vnode';
import { InputMixin } from '../../../mixins/input/InputMixin';
import { EqMixin } from '../../../mixins/eq/EqMixin';
import { ThemeInjectionMixin } from '../../../mixins/themeInjection/ThemeInjectionMixin';
import { applyMixins } from '../../../utils/applyMixins';
import { exists, isBoolean, isObject, isPrimitive } from '../../../utils/helpers';
import { PropType, VNode } from 'vue';

export interface SelectItem<T> {
  value: T;
  text: string;
  isDisabled: boolean;
  isSelected: boolean;
}

export default applyMixins(EqMixin, InputMixin, ThemeInjectionMixin, ExtractPropMixin).extend({
  name: 'BSelect',
  inheritAttrs: false,
  props: {
    placeholder: String,
    items: {
      type: Array as PropType<unknown[]>,
      required: true
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: [String, Function]
    } as PropValidator<Extractor<any, any>>,
    itemText: {
      type: [String, Function],
      default: 'text'
    } as PropValidator<Extractor<any, any>>,
    itemValue: {
      type: [String, Function],
      default: 'value'
    } as PropValidator<Extractor<any, any>>,
    itemDisabled: {
      type: [String, Function],
      default: 'isDisabled'
    } as PropValidator<Extractor<any, any>>,
    displayCount: {
      type: [String, Number]
    }
  },
  computed: {
    displayPlaceholder(): boolean {
      return this.newValue === null && (exists(this.placeholder) || exists(this.$slots.placeholder));
    },
    newItems(): ReadonlyArray<{
      value: any;
      isDisabled: boolean;
      isSelected: boolean;
      text: string;
      key: string;
    }> {
      return Object.freeze(
        this.items.map((item, index) => {
          const primitive = isPrimitive(item);
          const disabledValue = this.extractProp(this.itemDisabled, item);
          return {
            key: primitive ? item : this.itemKey ? this.extractProp(this.itemKey, item) : String(index),
            value: primitive ? item : this.extractProp(this.itemValue, item),
            isDisabled: primitive ? false : isBoolean(disabledValue) ? disabledValue : !disabledValue,
            isSelected: this.isSelected(item),
            text: primitive ? item : this.extractProp(this.itemText, item)
          };
        })
      );
    },
    internalIsMultiple(): boolean {
      return this.isMultiple === true || (this.isMultiple === undefined && Array.isArray(this.newValue));
    },
    controlClasses(): object {
      return {
        'is-expanded': this.isExpanded,
        'has-icons-left': !!this.icon
      };
    },
    selectClasses(): any {
      return [
        this.size,
        this.statusType,
        {
          'is-fullwidth': this.isExpanded,
          'is-loading': this.isLoading,
          'is-multiple': this.internalIsMultiple,
          'is-rounded': this.isRounded,
          'is-empty': this.newValue === null
        }
      ];
    }
  },
  methods: {
    generateSelect(): VNode {
      return this.$createElement(
        'select',
        {
          attrs: this.$attrs,
          class: this.themeClasses,
          ref: 'select',
          domProps: {
            value: this.internalValue,
            size: this.displayCount,
            multiple: this.internalIsMultiple
          },
          on: {
            blur: this.onBlur,
            focus: this.onFocus,
            input: this.onInput
          }
        },
        this.displayPlaceholder ? [this.generatePlaceholder()] : this.generateOptions()
      );
    },
    generateOptions(): VNode[] | ScopedSlotChildren[] {
      return this.$scopedSlots.default
        ? this.newItems.map(this.$scopedSlots.default)
        : this.newItems.map(item =>
            this.$createElement(
              'option',
              {
                key: item.key,
                domProps: {
                  value: item.value,
                  selected: item.isSelected,
                  disabled: item.isDisabled
                }
              },
              item.text
            )
          );
    },
    generatePlaceholder(): VNode | VNode[] {
      return (
        this.$slots.placeholder ||
        this.$createElement(
          'option',
          {
            domProps: {
              value: this.internalValue,
              disabled: true
            }
          },
          this.placeholder
        )
      );
    },
    isSelected(item: unknown): boolean {
      const input = this.newValue;
      if (this.internalIsMultiple) {
        if (!Array.isArray(input)) return false;
        return input.some(otherItem => this.valueComparator(item, otherItem));
      }
      return this.valueComparator(input, item);
    },
    onBlur(event: MouseEvent) {
      this.$emit('blur', event);
      this.validate();
    },
    onFocus(event: Event) {
      this.$emit('focus', event);
    }
  },
  render(): VNode {
    return this.$createElement('div', { staticClass: 'control', class: this.controlClasses }, [
      this.$createElement('span', { staticClass: 'select', class: this.selectClasses }, [this.generateSelect()])
    ]);
  }
});
