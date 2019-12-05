import { findFirst, isEmpty, isNonEmpty, reverse, snoc, sortBy as sortBy_ } from 'fp-ts/lib/Array';
import { fromCompare } from 'fp-ts/lib/Ord';
import { alt, isNone, isSome, none } from 'fp-ts/Option';
import { toRef, computed, watch, shallowRef, provide, inject } from 'vue';
import { constFalse, constVoid, pipe } from 'fp-ts/lib/function';
import { useProxy } from '../../../composables/proxy/useProxy';
import { constEmptyArray, isBoolean } from '../../../utils/helpers';
import { toggleBTableColumn } from '../shared';
export const BTableSortingPropsDefinition = {
  rows: {
    type: Array,
    required: true
  },
  sortBy: {
    type: [Object, Array]
  },
  'onUpdate:sortBy': {
    type: Function
  },
  sortType: {
    type: String,
    default: 'Descending'
  },
  'onUpdate:sortType': {
    type: Function
  }
};

function useSortType(sortType, columnSortType, invert) {
  if (invert) {
    return (columnSortType ?? sortType) === 'Ascending' ? 'Descending' : 'Ascending';
  } else {
    return columnSortType ?? sortType;
  }
}

function useSortColumn(sortType, column, invert) {
  return { ...column,
    sort: isBoolean(column.sort) ? column.sort : column.sort === undefined ? undefined : { ...column.sort,
      sortType: useSortType(sortType, column.sort?.sortType, invert)
    }
  };
}

const USE_SORTABLE_TABLE_INJECTION_SYMBOL = Symbol();

function toMap(columns) {
  return new Map(columns.map((c, sortIndex) => [c.label, { ...c,
    sortIndex
  }]));
}

export function useSortableTable(props, rows, columns) {
  const initialSortType = props.sortType;
  const {
    value: sortType
  } = useProxy(toRef(props, 'sortType'), toRef(props, 'onUpdate:sortType'));
  /*
    fp-ts sorts in ascending order so we need to reverse the ords if the initial sort type is 'Descending'
    Future sortType changes just reverse the array so we don't need to readjust the ords
   */

  const isMultiple = computed(() => Array.isArray(props.sortBy));
  const internalSortBy = shallowRef(Array.isArray(props.sortBy) ? props.sortBy : props.sortBy ? [props.sortBy] : []);
  watch(() => props.sortBy, newVal => {
    internalSortBy.value = Array.isArray(newVal) ? newVal : newVal ? [newVal] : [];
  });
  const sortBy = computed({
    get() {
      return internalSortBy.value;
    },

    set(columns) {
      internalSortBy.value = columns;

      if (!props['onUpdate:sortBy']) {
        return;
      }

      if (Array.isArray(props.sortBy)) {
        props['onUpdate:sortBy'](columns);
      } else if (isNonEmpty(columns)) {
        props['onUpdate:sortBy'](columns[0]);
      }
    }

  });
  const sortByMap = computed(() => toMap(sortBy.value));
  const ords = computed(() => {
    const ords = [];
    sortBy.value.forEach(c => {
      const sort = c.sort;

      if (sort && !isBoolean(sort)) {
        ords.push(sort.sortType === 'Ascending' || sort.sortType === undefined && initialSortType === 'Ascending' ? sort.ord : fromCompare((x, y) => {
          return sort.ord.compare(x, y) * -1;
        }));
      }
    });
    return ords;
  });

  function sort() {
    if (!isEmpty(ords.value) && !isEmpty(rows.value)) {
      rows.value = sortBy_(ords.value)(rows.value);
    }
  }

  watch(sortType, () => {
    if (Array.isArray(sortBy.value) && sortBy.value.length > 1) {
      sort();
    } else {
      rows.value = reverse(rows.value);
    }
  });
  watch(() => [props.rows, sortBy.value], sort, {
    immediate: true
  });
  const sortableColumns = computed(() => columns.value.filter(column => !!column.sort));

  function updateSortColumn(label) {
    const column = pipe(sortBy.value, findFirst(c => c.label === label), alt(() => pipe(sortableColumns.value, findFirst(c => c.label === label))));
    if (isNone(column)) return;

    if (isMultiple.value) {
      sortBy.value = toggleBTableColumn(useSortColumn(sortType.value, column.value, false), sortBy.value);
    } else {
      sortBy.value = [column.value];
    }
  }

  function updateSortDirection(columnLabel) {
    const column = columnLabel ? pipe(sortBy.value, findFirst(c => c.label === columnLabel), alt(() => pipe(sortableColumns.value, findFirst(c => c.label === columnLabel)))) : none;

    if (isMultiple.value && columnLabel && isSome(column)) {
      const index = sortBy.value.findIndex(c => c.label === columnLabel);
      const newColumn = useSortColumn(sortType.value, column.value, true);

      if (index > -1) {
        const newVal = sortBy.value.slice();
        newVal.splice(index, 1, newColumn);
        sortBy.value = newVal;
      } else {
        sortBy.value = snoc(sortBy.value, newColumn);
      }
    } else {
      sortType.value = sortType.value === 'Ascending' ? 'Descending' : 'Ascending';
    }
  }

  const sortableTable = {
    sortBy,
    sortType,
    isMultiple,
    sortByMap,
    updateSortDirection,
    updateSortColumn,
    sortableColumns,
    hasSortableColumns: computed(() => isNonEmpty(sortableColumns.value))
  };
  provide(USE_SORTABLE_TABLE_INJECTION_SYMBOL, sortableTable);
  return sortableTable;
}

function useDefaultSortableTable() {
  return {
    sortBy: shallowRef([]),
    sortType: shallowRef('Ascending'),
    updateSortColumn: constVoid,
    updateSortDirection: constVoid,
    sortableColumns: computed(constEmptyArray),
    hasSortableColumns: computed(constFalse),
    isMultiple: computed(constFalse),
    sortByMap: computed(() => new Map())
  };
}

export function useInjectedSortableTable() {
  return inject(USE_SORTABLE_TABLE_INJECTION_SYMBOL, useDefaultSortableTable, true);
}
//# sourceMappingURL=useSortableTable.js.map