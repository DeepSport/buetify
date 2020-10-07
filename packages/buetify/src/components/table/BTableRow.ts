import { FunctionN } from 'fp-ts/lib/function';
import { exists } from 'fp-ts/Option';
import { pipe } from 'fp-ts/pipeable';
import { BCheckbox } from '../form/checkbox/BCheckbox';
import { isString } from '../../utils/helpers';
import { useInjectedCheckableTable } from './composables/useCheckableTable';
import { useInjectedDraggableTable } from './composables/useDraggableTable';
import { useInjectedSelectableTable } from './composables/useSelectableTable';
import { BTableColumn, BTableRow, eqBTableRowData } from './shared';
import { h, VNode, defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: 'b-table-row',
  props: {
    columns: {
      type: Array as PropType<BTableColumn[]>,
      required: true as const
    },
    index: {
      type: Number as PropType<number>,
      required: true as const
    },
    row: {
      type: Object as PropType<BTableRow>,
      required: true as const
    },
    onRowClick: {
      type: Function as PropType<FunctionN<[BTableRow, MouseEvent], void>>
    }
  },
  setup(props, { slots }) {
    const { checkedRowIds, variant, toggleRow, isCheckable } = useInjectedCheckableTable();
    const { selectedRowIds, toggleRowSelection, isSelectable } = useInjectedSelectableTable();
    const draggable = useInjectedDraggableTable();
    const isChecked = computed(() => checkedRowIds.value.has(props.row.id));
    const isSelected = computed(() => selectedRowIds.value.has(props.row.id));

    const classes = computed(() => {
      const isActive = draggable.isActive.value;
      const isDroppable = props.row.isDroppable ?? !!props.row.isDraggable;
      return [
        {
          'is-selected': isSelected.value,
          'is-checked': isChecked.value,
          'is-draggable': draggable.isDraggable.value && !!props.row.isDraggable,
          'is-droppable': isActive && isDroppable,
          'is-undroppable': isActive && !isDroppable,
          'is-drop-target':
            isActive &&
            pipe(
              draggable.target.value,
              exists(t => eqBTableRowData.equals(t, props.row))
            )
        },
        props.row.classes
      ];
    });

    const dragListeners = computed(() => draggable.useRowDragListeners(props.row, props.index));

    function toggleCheck() {
      toggleRow(props.row);
    }

    function onClick(e: MouseEvent){
      if (props.onRowClick) {
        props.onRowClick(props.row, e);
      }
      if (props.row.isSelectable ?? isSelectable.value) {
        e.stopPropagation();
        toggleRowSelection(props.row);
      }
    }

    return () => {
      const columns: VNode[] = props.columns.map((column: BTableColumn) => {
        const children: Array<VNode | VNode[] | string> = [];
        const value = column.value
          ? isString(column.value)
            ? props.row[column.value]
            : column.value(props.row)
          : undefined;

        const columnSlot = slots[column.slotName || column.label];

        if (columnSlot) {
          children.push(columnSlot({ row: props.row, column, value }));
        } else if (value !== null) {
          children.push(String(value));
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

      if (isCheckable.value) {
        columns.unshift(
          h('td', { class: 'checkbox-cell' }, [
            h(BCheckbox, {
              modelValue: isChecked.value,
              variant: variant.value,
              isDisabled: !!props.row.isCheckable,
              'onUpdate:modelValue': toggleCheck
            })
          ])
        );
      }

      return h(
        'tr',
        {
          class: classes.value,
          onClick,
          draggable: draggable.isDraggable.value && !!props.row.isDraggable,
          ...dragListeners.value
        },
        columns
      );
    };
  }
});
