import { h, defineComponent, computed } from 'vue';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BTooltip from '../tooltip/BTooltip';
import { isBoolean, isString } from '../../utils/helpers';
import { useInjectedSortableTable } from './composables/useSortableTable';

function formatWidth(width, suffix = 'px') {
  return isString(width) ? width : `${width}${suffix}`;
}

function useSortType(sortType, column) {
  return column === undefined || isBoolean(column.sort) || column.sort === undefined ? sortType : column.sort.sortType ?? sortType;
}

export default defineComponent({
  name: 'b-table-column',
  props: {
    column: {
      type: Object,
      required: true
    }
  },

  setup(props, {
    slots
  }) {
    const {
      sortByMap,
      isMultiple,
      sortType,
      updateSortColumn,
      updateSortDirection
    } = useInjectedSortableTable();
    const isSortable = computed(() => !!props.column.sort);
    const isSortColumn = computed(() => sortByMap.value.has(props.column.label));
    const sortColumn = computed(() => sortByMap.value.get(props.column.label));

    function updateColumn(e) {
      e && e.stopPropagation();
      updateSortColumn(props.column.label);
    }

    function onClick() {
      if (isSortColumn.value) {
        updateSortDirection(props.column.label);
      } else {
        updateColumn();
      }
    }

    return () => {
      const slot = slots[`header.${props.column.label}`] || slots.header;
      const children = [];

      if (slot) {
        children.push(slot(props.column));
      } else {
        children.push(isString(props.column.detail) ? h(BTooltip, {
          label: props.column.detail,
          position: 'is-left'
        }, () => props.column.label) : props.column.label);
      }

      if (isSortColumn.value) {
        const type = useSortType(sortType.value, sortColumn.value);
        const icon = slots['sort-icon'] ? slots['sort-icon']({
          sortType: type
        }) : h(VerticalExpansionIcon, {
          isExpanded: useSortType(sortType.value, sortColumn.value) === 'Ascending'
        });

        if (isMultiple.value && sortColumn.value) {
          children.push(icon, sortColumn.value.sortIndex + 1, h('button', {
            class: 'delete is-small b-column-delete',
            onClick: updateColumn
          }));
        } else {
          children.push(icon);
        }
      }

      return h('th', {
        class: {
          'is-sortable': isSortable.value,
          'is-sticky-left': !!props.column.isSticky
        },
        onClick: isSortable.value ? onClick : undefined,
        style: props.column.width !== undefined ? {
          'min-width': formatWidth(props.column.width)
        } : undefined
      }, [h('div', {
        class: ['th-wrap', props.column.position]
      }, children)]);
    };
  }

});
//# sourceMappingURL=BTableColumn.js.map