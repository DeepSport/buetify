import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { BCheckbox } from '../form/checkbox/BCheckbox';
import { getObjectValueByPath, isString } from '../../utils/helpers';
import { BTableColumn, BTableRow } from './shared';
import { h, SetupContext, VNode } from 'vue';

interface BTableRowProps {
  columns: BTableColumn[];
  row: BTableRow;
  checkboxVariant?: ColorVariant;
  onInput?: FunctionN<[boolean], void>;
}

export default function BTableRow(props: BTableRowProps, { attrs, slots }: SetupContext) {
  attrs.class = mergeClasses(attrs.class as Classes, [
    {
      'is-selected': props.row.isSelected,
      'is-checked': props.row.isChecked,
      'is-draggable': props.row.isDraggable,
      'is-droppable': props.row.isDroppable
    },
    props.row.classes
  ]);
  attrs.draggable = props.row.isDraggable;

  const columns: VNode[] = props.columns.map((column: BTableColumn) => {
    const children = [];
    const value = isString(column.value) ? getObjectValueByPath(props.row.data, column.value) : column.value(props.row);
    const slotName = column.slotName || column.label;
    const columnSlot = slots[slotName];
    const rowSlot = slots.row;

    if (columnSlot) {
      children.push(columnSlot({ row: props.row, column, value }));
    } else if (rowSlot) {
      children.push(rowSlot({ row: props.row, column, value }));
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
        'data-label': column.label
      },
      children
    );
  });

  if (props.row.isCheckable) {
    columns.unshift(
      h('td', { staticClass: 'checkbox-cell' }, [
        h(BCheckbox, {
          value: props.row.isChecked,
          variant: props.checkboxVariant || 'is-primary',
          onInput: props.onInput
        })
      ])
    );
  }

  return h('tr', attrs, columns);
}
