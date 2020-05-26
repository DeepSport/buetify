import '../sass/form.sass';
import { FieldDataAttrs, provideFieldData, ProvideFieldDataPropsDefinition } from '../../../composables/fieldData';
import { DefaultThemePropsDefinition } from '../../../composables/theme';
import {
  resolveDirective,
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
import { Classes } from '../../../utils/mergeClasses';

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
  customLabelClass: {
    type: String as PropType<string>,
    default: ''
  }
};

export type BFieldProps = ExtractPropTypes<typeof BFieldPropsDefinition>;

function generateInnerLabel(fieldData: FieldDataAttrs, customClass: string): VNode {
  return h(
    'label',
    {
      class: ['label', customClass],
      id: fieldData.labelId.value,
      for: fieldData.id.value
    },
    fieldData.label.value
  );
}

function generateHorizontalLabel(fieldData: FieldDataAttrs, customClass: string, size: string): VNode {
  return h('div', { class: ['field-label', size] }, [generateInnerLabel(fieldData, customClass)]);
}

function generateLabel(isHorizontal: boolean, fieldData: FieldDataAttrs, customClass: string, size: string): VNode[] {
  const label = fieldData.label.value;
  if (isHorizontal && !!label) {
    return [generateHorizontalLabel(fieldData, customClass, size)];
  } else if (isHorizontal && !!label) {
    return [generateInnerLabel(fieldData, customClass)];
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

export default defineComponent({
  name: 'b-field',
  props: BFieldPropsDefinition,
  setup(props, { slots }) {
    const vShow = resolveDirective('show') as Directive;
    const field = shallowRef((null as unknown) as HTMLElement);
    const fieldData = provideFieldData(props);
    const classes = getFieldClasses(props);
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
          ref: field,
          class: ['field', classes.value, getFieldType(props.isGrouped, props.hasAddons, props.isHorizontal, slots)],
          role: role.value
        },
        [
          generateLabel(props.isHorizontal, fieldData.attrs, props.customLabelClass, size.value),
          ...generateBody(props.isHorizontal, fieldData.attrs, role.value, slots),
          generateHelpMessage(props.isHorizontal, fieldData.attrs, vShow)
        ]
      );
    };
  }
});
