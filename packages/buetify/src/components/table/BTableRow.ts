import { FunctionN } from 'fp-ts/lib/function';
import { BCheckbox } from '../form/checkbox/BCheckbox';
import { getObjectValueByPath, isString } from '../../utils/helpers';
import { useInjectedCheckableTable } from './composables/useCheckableTable';
import { useInjectedSelectableTable } from './composables/useSelectableTable';
import { BTableColumn, BTableRow } from './shared';
import { h, VNode, defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: 'b-table-row',
  props: {
    columns: {
      type: Array as PropType<BTableColumn[]>,
      required: true
    },
    row: {
      type: Object as PropType<BTableRow>,
      required: true
    },
    onRowClick: {
      type: Function as PropType<FunctionN<[BTableRow, MouseEvent], void>>,
      required: false
    }
  },
  setup(props, { slots }) {
    const { checkedRowIds, variant, toggleRow } = useInjectedCheckableTable();
    const { selectedRowIds, toggleRowSelection } = useInjectedSelectableTable();
    const isChecked = computed(() => checkedRowIds.value.has(props.row.id));
    const isSelected = computed(() => selectedRowIds.value.has(props.row.id));
    const classes = computed(() => {
      return [
        {
          'is-selected': isSelected.value,
          'is-checked': isChecked.value,
          'is-draggable': props.row.isDraggable,
          'is-droppable': props.row.isDroppable
        },
        props.row.classes
      ];
    });

    return () => {
      const columns: VNode[] = props.columns.map((column: BTableColumn) => {
        const children = [];
        const value = isString(column.value)
          ? getObjectValueByPath(props.row.data, column.value)
          : column.value && column.value(props.row);
        const columnSlot = slots[column.slotName || column.label];

        if (columnSlot) {
          children.push(columnSlot({ row: props.row, column, value }));
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
          h('td', { class: 'checkbox-cell' }, [
            h(BCheckbox, {
              modelValue: isChecked.value,
              variant: variant.value,
              'onUpdate:modelValue': toggleRow
            })
          ])
        );
      }

      return h(
        'tr',
        {
          class: classes.value,
          onClick: (e: MouseEvent) => {
            if (props.onRowClick) {
              props.onRowClick(props.row, e);
            }
            if (props.row.isSelectable) {
              e.stopPropagation();
              toggleRowSelection(props.row);
            }
          },
          draggable: props.row.isDraggable
        },
        columns
      );
    };
  }
});
