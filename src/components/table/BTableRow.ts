import { ColorVariant } from '../../types/ColorVariants';
import BCheckbox from '../form/checkbox/BCheckbox';
import { getObjectValueByPath, isString } from '../../utils/helpers';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { BTableColumn, BTableRow } from './shared';
import Vue, { PropType, VNode } from 'vue';

export default Vue.extend({
  name: 'BTableRow',
  functional: true,
  props: {
    columns: {
      type: Array as PropType<BTableColumn[]>,
      required: true
    },
    row: {
      type: Object as PropType<BTableRow>,
      required: true
    },
    checkboxVariant: {
      type: String as PropType<ColorVariant>,
      default: 'is-primary'
    }
  },
  render(h, { props, slots, listeners, data }): VNode {
    data.class = mergeVNodeClasses(data.class, [
      {
        'is-selected': props.row.isSelected,
        'is-checked': props.row.isChecked
      },
      props.row.classes
    ]);
    const computedSlots = slots();
    const columns: VNode[] = props.columns.map((column: BTableColumn) => {
      const children = [];
      const value = isString(column.value)
        ? getObjectValueByPath(props.row.data, column.value)
        : column.value(props.row);
      const slotName = column.slotName || column.label;
      const scopedSlot = data.scopedSlots && data.scopedSlots[slotName];
      const scopedRowSlot = data.scopedSlots && data.scopedSlots.row;
      const regularSlot = computedSlots[slotName];

      if (scopedSlot) {
        children.push(scopedSlot({ row: props.row, column, value }));
      } else if (scopedRowSlot) {
        children.push(scopedRowSlot({ row: props.row, column, value }));
      } else if (regularSlot) {
        children.push(regularSlot);
      } else {
        children.push(value == null ? value : String(value));
      }

      const textClass =
        column.position === 'is-left'
          ? 'has-text-left'
          : column.position === 'is-centered'
          ? 'has-text-centered'
          : 'has-text-right';

      return h(
        'td',
        {
          class: [textClass, { 'is-sticky-left': column.isSticky }],
          attrs: { 'data-label': column.label }
        },
        children
      );
    });
    if (props.row.isCheckable) {
      columns.unshift(
        h('td', { staticClass: 'checkbox-cell' }, [
          h(BCheckbox, {
            props: {
              inputValue: props.row.isChecked,
              variant: props.checkboxVariant
            },
            on: listeners.input ? { change: listeners.input } : undefined
          })
        ])
      );
    }
    return h('tr', data, columns);
  }
});
