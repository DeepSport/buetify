import '../sass/form.sass';
import { show } from 'fp-ts';
import { FieldDataAttrs, provideFieldData, ProvideFieldDataPropsDefinition } from '../../../composables/fieldData';
import { DefaultThemePropsDefinition } from '../../../composables/theme';
import { applyMixins } from '../../../utils/applyMixins';
import { AllColorsVariant } from '../../../types/ColorVariants';
import { not } from 'fp-ts/lib/function';
import {
  Directive,
  withDirectives,
  h,
  PropType,
  VNode,
  defineComponent,
  defineAsyncComponent,
  Ref,
  computed,
  ExtractPropTypes,
  shallowRef,
  watch,
  Slots
} from 'vue';
import { ThemeInjectionMixin } from '../../../mixins/themeInjection/ThemeInjectionMixin';
import { isEmptyString, isString } from '../../../utils/helpers';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';

const BFieldBody = defineAsyncComponent(() => import('./BFieldBody'));

export type FieldPosition = 'is-left' | 'is-centered' | 'is-right';

function getFieldClasses(props: BFieldProps): Ref<Classes> {
  return computed(() => {
    const isGrouped = props.isGrouped;
    const position = props.position;
    return {
      'is-expanded': props.isExpanded,
      'is-grouped-multiline': props.isGroupedMultiline,
      'is-horizontal': props.isHorizontal,
      'is-grouped-centered': isGrouped && position === 'is-centered',
      'is-grouped-right': isGrouped && position === 'is-right',
      'has-addons-centered': !isGrouped && position === 'is-centered',
      'has-addons-right': !isGrouped && position === 'is-right'
    };
  });
}

export const BFieldPropsDefinition = {
  ...DefaultThemePropsDefinition,
  ...ProvideFieldDataPropsDefinition,
  isGrouped: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isGroupedMultiline: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<FieldPosition>,
    default: 'is-left'
  },
  isHorizontal: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  hasAddons: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  customLabelClass: String
};

export type BFieldProps = ExtractPropTypes<typeof BFieldPropsDefinition>;

function generateInnerLabel(fieldData: FieldDataAttrs, customClass: string, themeClasses: Classes): VNode {
  return h(
    'label',
    {
      class: mergeClasses(['label', customClass], themeClasses),
      id: fieldData.labelId.value,
      for: fieldData.id.value
    },
    fieldData.label.value
  );
}

function generateHorizontalLabel(
  fieldData: FieldDataAttrs,
  customClass: string,
  themeClasses: Classes,
  size: string
): VNode {
  return h('div', { class: ['field-label', size] }, [generateInnerLabel(fieldData, customClass, themeClasses)]);
}

function generateLabel(
  isHorizontal: boolean,
  fieldData: FieldDataAttrs,
  customClass: string,
  themeClasses: Classes,
  size: string
): VNode[] {
  const label = fieldData.label.value;
  if (isHorizontal && !!label) {
    return [generateHorizontalLabel(fieldData, customClass, themeClasses, size)];
  } else if (isHorizontal && !!label) {
    return [generateInnerLabel(fieldData, customClass, themeClasses)];
  } else {
    return [];
  }
}

function generateHelpMessage(isHorizontal: boolean, fieldDataAttrs: FieldDataAttrs, vShow: Directive): VNode {
  const showHelpMessage = !isHorizontal && !!fieldDataAttrs.message.value;
  return withDirectives(
    h('p', {
      class: ['help', fieldDataAttrs.messageVariant.value],
      'aria-hidden': showHelpMessage,
      innerHTML: fieldDataAttrs.message.value
    }),
    [[vShow, showHelpMessage]]
  );
}

function generateFieldBody(fieldData: FieldDataAttrs, role: string, slots: Slots): VNode {
  return h(BFieldBody, {
    class: { 'is-expanded': fieldData.isExpanded.value },
    message: fieldData.message.value,
    variant: fieldData.messageVariant.value,
    slots,
    role
  });
}

function generateBody(isHorizontal: boolean, fieldData: FieldDataAttrs, role: string, slots: Slots): VNode[] {
  if (isHorizontal) {
    return [generateFieldBody(fieldData, role, slots)];
  } else {
    return slots.default!();
  }
}

function getFieldType(isGrouped: boolean, hasAddons: boolean, isHorizontal: boolean, slots: Slots): string {
  return isGrouped
    ? 'is-grouped'
    : hasAddons && !isHorizontal && slots.default!().filter(n => !!n.el).length > 1
    ? 'has-addons'
    : '';
}

export const BField = defineComponent({
  name: 'b-field',
  props: BFieldPropsDefinition,
  setup(props, { slots }) {
    const field = shallowRef((null as unknown) as HTMLElement);
    const fieldData = provideFieldData(props);
    const classes = getFieldClasses(props);
    const showHelpMessage = computed(() => !!fieldData.attrs.message.value && !props.isHorizontal);
    const role = computed(() => (props.isGrouped ? 'group' : ''));
    const size = shallowRef('');
    watch(field, newVal => {
      if (props.isHorizontal) {
        // Bulma docs: .is-normal for any .input or .button
        const elements = newVal.querySelectorAll('.input, .select, .button, .textarea');
        if (elements.length > 0) {
          size.value = 'is-normal';
        }
      }
    });
    return () => {
      return h(
        'div',
        {
          staticClass: 'field',
          class: [classes.value, getFieldType(props.isGrouped, props.hasAddons, props.isHorizontal, slots)],
          role: role.value
        },
        [generateLabel(props.isHorizontal, fieldData.attrs, props.customLabelClass,), ...this.generateBody(), this.generateHelpMessage()]
      );
    };
  }
});

export default applyMixins(ThemeInjectionMixin).extend({
  name: 'BField',
  inheritAttrs: false,
  components: {
    BFieldBody: defineAsyncComponent(() => import('./BFieldBody'))
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
    }
    /**
     * Correct Bulma class for the side of the addon or group.
     *
     * This is not kept like the others (is-small, etc.),
     * because since 'has-addons' is set automatically it
     * doesn't make sense to teach users what has-addons are exactly.
     */
    /**
     * Formatted message in case it's an array
     * (each element is separated by <br> tag)
     */
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
  render(): VNode {
    return this.$createElement(
      'div',
      {
        staticClass: 'field',
        class: [this.rootClasses, this.fieldType()],
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
