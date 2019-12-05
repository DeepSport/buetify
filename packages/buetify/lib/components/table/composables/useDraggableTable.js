import { isNone, isSome, none, some } from 'fp-ts/lib/Option';
import { shallowRef, toRef, computed } from 'vue';
import { constant, constVoid } from 'fp-ts/lib/function';
import { provide, inject } from 'vue';
import { eqBTableRowData } from '../shared';
export const BTableDraggablePropsDefinition = {
  isDraggable: {
    type: Boolean,
    default: false
  },
  dropEffect: {
    type: String,
    default: 'move'
  },
  onDragstart: {
    type: Function,
    default: constant(constVoid)
  },
  onDragenter: {
    type: Function,
    default: constant(constVoid)
  },
  onDragover: {
    type: Function,
    default: constant(constVoid)
  },
  onDragleave: {
    type: Function,
    default: constant(constVoid)
  },
  onDragend: {
    type: Function,
    default: constant(constVoid)
  },
  onDrop: {
    type: Function,
    default: constant(constVoid)
  }
};
const USE_DRAGGABLE_TABLE_INJECTION_SYMBOL = Symbol();
export function useDraggableTable(props) {
  const dropTarget = shallowRef(none);
  const dragIsActive = computed(() => props.isDraggable && isSome(dropTarget.value));

  function getOnDragStartListener(row, index) {
    return e => {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', String(index));
        e.dataTransfer.dropEffect = props.dropEffect;
      }

      dropTarget.value = some(row);
      props.onDragstart(row, e, index);
    };
  }

  function getOnDropListener(row, index) {
    return e => {
      if (row.isDroppable) {
        e.preventDefault();
        props.onDrop(row, e, index);
      }

      dropTarget.value = none;
    };
  }

  function getOnDragEnterListener(row, index) {
    return e => {
      if (row.isDroppable) {
        e.preventDefault();
        dropTarget.value = some(row);
        props.onDragenter(row, e, index);
      }
    };
  }

  function getOnDragOverListener(row, index) {
    return e => {
      if (row.isDroppable) {
        e.preventDefault();
        const target = dropTarget.value;

        if (isNone(target) || isSome(target) && !eqBTableRowData.equals(target.value, row)) {
          dropTarget.value = some(row);
        }

        props.onDragover(row, e, index);
      }
    };
  }

  function getOnDragLeaveListener(row, index) {
    return e => {
      if (row.isDroppable) {
        e.preventDefault();
        const target = dropTarget.value;

        if (isSome(target) && eqBTableRowData.equals(target.value, row)) {
          dropTarget.value = none;
        }

        props.onDragleave(row, e, index);
      }
    };
  }

  function getOnDragEndListener(row, index) {
    return e => {
      props.onDragend(row, e, index);

      if (isSome(dropTarget.value)) {
        dropTarget.value = none;
      }
    };
  }

  function useRowDragListeners(row, index) {
    if (props.isDraggable && !!row.isDraggable) {
      return {
        onDragstart: getOnDragStartListener(row, index),
        onDrop: getOnDropListener(row, index),
        onDragenter: getOnDragEnterListener(row, index),
        onDragleave: getOnDragLeaveListener(row, index),
        onDragover: getOnDragOverListener(row, index),
        onDragend: getOnDragEndListener(row, index)
      };
    } else {
      return {};
    }
  }

  const draggableTable = {
    isDraggable: toRef(props, 'isDraggable'),
    useRowDragListeners,
    isActive: dragIsActive,
    target: dropTarget
  };
  provide(USE_DRAGGABLE_TABLE_INJECTION_SYMBOL, draggableTable);
  return draggableTable;
}

function useDefaultDraggableTable() {
  return {
    isDraggable: shallowRef(false),
    useRowDragListeners: constant({}),
    isActive: shallowRef(false),
    target: shallowRef(none)
  };
}

export function useInjectedDraggableTable() {
  return inject(USE_DRAGGABLE_TABLE_INJECTION_SYMBOL, useDefaultDraggableTable, true);
}
//# sourceMappingURL=useDraggableTable.js.map