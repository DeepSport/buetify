import '../sass/form.sass';
import { applyMixins } from '../../../utils/applyMixins';
import { AllColorsVariant } from '../../../types/ColorVariants';
import { not } from 'fp-ts/lib/function';
import { PropType, VNode } from 'vue';
import { ThemeInjectionMixin } from '../../../mixins/themeInjection/ThemeInjectionMixin';
import { isEmptyString, isString } from '../../../utils/helpers';

export type FieldPosition = 'is-left' | 'is-centered' | 'is-right';

export default applyMixins(ThemeInjectionMixin).extend({
  name: 'BField',
  inheritAttrs: false,
  components: {
    BFieldBody: () => import('./BFieldBody')
  },
  props: {
    variant: {
      type: [String, Object] as PropType<AllColorsVariant | { [K in AllColorsVariant]: boolean }>,
      required: false
    },
    label: String,
    id: String,
    message: {
      type: [String, Array, Object] as PropType<
        string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }>
      >,
      required: false
    },
    isGrouped: {
      type: Boolean,
      default: false
    },
    isGroupedMultiline: {
      type: Boolean,
      default: false
    },
    position: {
      type: String as PropType<FieldPosition>,
      default: 'is-left'
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    hasAddons: {
      type: Boolean,
      default: true
    },
    customLabelClass: String
  },
  data(): Data {
    return {
      newVariant: this.variant,
      newMessage: this.message,
      fieldLabelSize: ''
    };
  },
  computed: {
    computedId(): string {
      return this.id || `field-${this._uid}`;
    },
    fieldId(): string {
      return `label-for-${this.computedId}`;
    },
    rootClasses(): { [K: string]: boolean } {
      return {
        ...this.positionClasses,
        'is-expanded': this.isExpanded,
        'is-grouped-multiline': this.isGroupedMultiline,
        'is-horizontal': this.isHorizontal
      };
    },
    /**
     * Correct Bulma class for the side of the addon or group.
     *
     * This is not kept like the others (is-small, etc.),
     * because since 'has-addons' is set automatically it
     * doesn't make sense to teach users what has-addons are exactly.
     */
    positionClasses(): { [K: string]: boolean } {
      return {
        'is-grouped-centered': this.isGrouped && this.position === 'is-centered',
        'is-grouped-right': this.isGrouped && this.position === 'is-right',
        'has-addons-centered': !this.isGrouped && this.position === 'is-centered',
        'has-addons-right': !this.isGrouped && this.position === 'is-right'
      };
    },
    /**
     * Formatted message in case it's an array
     * (each element is separated by <br> tag)
     */
    formattedMessage(): string {
      if (isString(this.newMessage)) {
        return this.newMessage;
      } else {
        const messages = [];
        if (Array.isArray(this.newMessage)) {
          this.newMessage.forEach(message => {
            if (isString(message)) {
              messages.push(message);
            } else {
              for (const key in message) {
                if (message[key]) {
                  messages.push(key);
                }
              }
            }
          });
        } else {
          for (const key in this.newMessage) {
            if (this.newMessage[key]) {
              messages.push(key);
            }
          }
        }
        return messages.filter(not(isEmptyString)).join(' <br> ');
      }
    },
    attrs(): object {
      return {
        isFullwidth: this.isExpanded,
        isExpanded: this.isExpanded,
        message: this.formattedMessage,
        messageVariant: this.newVariant,
        id: this.computedId,
        ...(this.label ? { 'aria-labelledby': this.fieldId } : {})
      };
    },
    listeners(): object {
      return {
        'new-message': this.setMessage,
        'new-variant': this.setVariant
      };
    },
    showHelpMessage(): boolean {
      return !!this.newMessage && !this.isHorizontal;
    },
    fieldRole(): string {
      return this.isGrouped ? 'group' : '';
    }
  },
  watch: {
    variant(value: AllColorsVariant | { [K in AllColorsVariant]: boolean }) {
      this.newVariant = value;
    },
    message(value: string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }>) {
      this.newMessage = value;
    }
  },
  methods: {
    /**
     * Field has has-addons if there are more than one slot
     * (element / component) in the Field.
     * Or is-grouped when prop is set.
     * Is a method to be called when component re-render.
     */
    fieldType(): string {
      if (this.isGrouped) return 'is-grouped';

      let renderedNode = 0;
      if (this.$scopedSlots.default) {
        const nodes = this.$scopedSlots.default({
          attrs: this.attrs,
          listeners: this.listeners
        });
        renderedNode = nodes ? nodes.reduce((i, node) => (node.tag ? i + 1 : i), 0) : 0;
      }
      if (renderedNode > 1 && this.hasAddons && !this.isHorizontal) {
        return 'has-addons';
      } else {
        return '';
      }
    },
    setMessage(message: string): void {
      this.newMessage = message;
    },
    setVariant(variant: AllColorsVariant): void {
      this.newVariant = variant;
    },
    generateLabel(): VNode[] {
      if (this.isHorizontal && !!this.label) {
        return [this.generateHorizontalLabel()];
      } else if (!this.isHorizontal && !!this.label) {
        return [this.generateInnerLabel()];
      } else {
        return [];
      }
    },
    generateHorizontalLabel(): VNode {
      return this.$createElement(
        'div',
        {
          staticClass: 'field-label',
          class: this.fieldLabelSize
        },
        [this.generateInnerLabel()]
      );
    },
    generateInnerLabel(): VNode {
      return this.$createElement(
        'label',
        {
          class: [this.customLabelClass, ...this.themeClasses],
          staticClass: 'label',
          domProps: {
            id: this.fieldId,
            for: this.computedId
          }
        },
        this.label
      );
    },
    generateBody(): VNode[] {
      if (this.isHorizontal) {
        return [this.generateFieldBody()];
      } else {
        const scopedSlot = this.$scopedSlots.default!({
          attrs: this.attrs,
          listeners: this.listeners
        });
        return scopedSlot ? scopedSlot : [];
      }
    },
    generateFieldBody(): VNode {
      return this.$createElement(
        'b-field-body',
        {
          staticClass: this.isExpanded ? 'is-expanded' : '',
          props: {
            message: this.newMessage ? this.formattedMessage : '',
            variant: this.newVariant
          },
          attrs: {
            role: this.fieldRole
          }
        },
        this.$scopedSlots.default!({
          attrs: this.attrs,
          listeners: this.listeners
        })
      );
    },
    generateHelpMessage(): VNode {
      return this.$createElement('p', {
        staticClass: 'help',
        class: this.newVariant,
        domProps: {
          'aria-hidden': !this.showHelpMessage,
          innerHTML: this.formattedMessage
        },
        directives: [{ name: 'show', value: this.showHelpMessage }]
      });
    }
  },
  mounted() {
    if (this.isHorizontal) {
      // Bulma docs: .is-normal for any .input or .button
      const elements = this.$el.querySelectorAll('.input, .select, .button, .textarea');
      if (elements.length > 0) {
        this.fieldLabelSize = 'is-normal';
      }
    }
  },
  render(): VNode {
    return this.$createElement(
      'div',
      {
        staticClass: 'field',
        class: [this.rootClasses, this.fieldType(), { 'is-marginless': this.newMessage && !this.isHorizontal }],
        domProps: { role: this.fieldRole }
      },
      [...this.generateLabel(), ...this.generateBody(), this.generateHelpMessage()]
    );
  }
});

interface Data {
  newVariant: AllColorsVariant | { [K in AllColorsVariant]: boolean };
  newMessage: string | { [K: string]: boolean } | Array<string | { [K: string]: boolean }>;
  fieldLabelSize: string;
}
