import './select.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { getUseInputPropsDefinition, useInput } from '../../../composables/input/useInput';
import { getEqPropsDefinition } from '../../../composables/shared';
import { Extractor, ExtractPropMixin } from '../../../mixins/extractProp/ExtractPropMixin';
import { PropValidator } from 'vue/types/options';
import { ScopedSlotChildren } from 'vue/types/vnode';
import { InputMixin } from '../../../mixins/input/InputMixin';
import { EqMixin } from '../../../mixins/eq/EqMixin';
import { ThemeInjectionMixin } from '../../../mixins/themeInjection/ThemeInjectionMixin';
import { applyMixins } from '../../../utils/applyMixins';
import { exists, isBoolean } from '../../../utils/helpers';
import { PropType, VNode, defineComponent, h } from 'vue';

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
    items: {
      type: Array as PropType<T[]>,
      required: true as const
    },
    isMultiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    itemKey: {
      type: [String, Function] as PropType<Extractor<T>>,
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
  }
}

function getControlClasses(isExpanded: boolean, hasIcon: boolean) {
  return {
    'is-expanded': isExpanded,
    'has-icons-left': hasIcon
  };
}

export function defineSelect<T>(eq?: Eq<T>)  {
  return defineComponent({
    name: 'b-select',
    props: getBSelectPropsDefinition<T>(eq),
    setup(props) {
      const input = useInput(props);
      return () => {
        return h('div', { class: ['control', getControlClasses(input.isExpanded.value, !!input.icon.value)] }, [
          this.$createElement('span', { staticClass: 'select', class: this.selectClasses }, [this.generateSelect()])
        ]);

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
            const disabledValue = this.extractProp(this.itemDisabled, item);
            return {
              key: this.itemKey ? this.extractProp(this.itemKey, item) : String(index),
              value: this.extractProp(this.itemValue, item),
              isDisabled: isBoolean(disabledValue) ? disabledValue : !disabledValue,
              isSelected: this.isSelected(item),
              text: this.extractProp(this.itemText, item)
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
          this.displayPlaceholder ? [this.generatePlaceholder(), ...this.generateOptions()] : this.generateOptions()
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
                value: '',
                disabled: true,
                selected: true
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
    }
  })
}
