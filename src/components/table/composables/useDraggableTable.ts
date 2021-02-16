import { isNone, isSome, none, Option, some } from 'fp-ts/lib/Option';
import { ExtractPropTypes, shallowRef, toRef, computed } from 'vue';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { PropType, Ref, provide, inject } from 'vue';
import { BTableRow, eqBTableRowData } from '../shared';

type DropEffect = 'none' | 'copy' | 'link' | 'move';

type DragHandler = FunctionN<[DragEvent], void>;

type OnDragEffect = FunctionN<[BTableRow, DragEvent, number], void>;

export const BTableDraggablePropsDefinition = {
  isDraggable: {
    type: Boolean,
    default: false
  },
  dropEffect: {
    type: String as PropType<DropEffect>,
    default: 'move' as const
  },
  onDragstart: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragenter: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragover: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragleave: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragend: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDrop: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  }
};

export interface BTableDraggableProps extends ExtractPropTypes<typeof BTableDraggablePropsDefinition> {}

export interface UseDraggableTable {
  isDraggable: Ref<boolean>;
  isActive: Ref<boolean>;
  target: Ref<Option<BTableRow>>;
  useRowDragListeners: FunctionN<[BTableRow, number], Record<string, DragHandler>>;
}

const USE_DRAGGABLE_TABLE_INJECTION_SYMBOL = Symbol();

export function useDraggableTable(props: BTableDraggableProps): UseDraggableTable {
  const dropTarget = shallowRef(none as Option<BTableRow>);

  const dragIsActive = computed(() => props.isDraggable && isSome(dropTarget.value));

  function getOnDragStartListener(row: BTableRow, index: number): DragHandler {
    return (e: DragEvent) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', String(index));
        e.dataTransfer.dropEffect = props.dropEffect;
      }
      dropTarget.value = some(row);
      props.onDragstart(row, e, index);
    };
  }

  function getOnDropListener(row: BTableRow, index: number): DragHandler {
    return (e: DragEvent) => {
      if (row.isDroppable) {
        e.preventDefault();
        props.onDrop(row, e, index);
      }
      dropTarget.value = none;
    };
  }

  function getOnDragEnterListener(row: BTableRow, index: number): DragHandler {
    return (e: DragEvent) => {
      if (row.isDroppable) {
        e.preventDefault();
        dropTarget.value = some(row);
        props.onDragenter(row, e, index);
      }
    };
  }

  function getOnDragOverListener(row: BTableRow, index: number): DragHandler {
    return (e: DragEvent) => {
      if (row.isDroppable) {
        e.preventDefault();
        const target = dropTarget.value;
        if (isNone(target) || (isSome(target) && !eqBTableRowData.equals(target.value, row))) {
          dropTarget.value = some(row);
        }
        props.onDragover(row, e, index);
      }
    };
  }

  function getOnDragLeaveListener(row: BTableRow, index: number): DragHandler {
    return (e: DragEvent) => {
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

  function getOnDragEndListener(row: BTableRow, index: number): DragHandler {
    return e => {
      props.onDragend(row, e, index);
      if (isSome(dropTarget.value)) {
        dropTarget.value = none;
      }
    };
  }

  function useRowDragListeners(row: BTableRow, index: number): { [key: string]: DragHandler } {
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

  const draggableTable: UseDraggableTable = {
    isDraggable: toRef(props, 'isDraggable'),
    useRowDragListeners,
    isActive: dragIsActive,
    target: dropTarget
  };

  provide(USE_DRAGGABLE_TABLE_INJECTION_SYMBOL, draggableTable);

  return draggableTable;
}

function useDefaultDraggableTable(): UseDraggableTable {
  return {
    isDraggable: shallowRef(false),
    useRowDragListeners: constant({}),
    isActive: shallowRef(false),
    target: shallowRef(none)
  };
}

export function useInjectedDraggableTable(): UseDraggableTable {
  return inject(USE_DRAGGABLE_TABLE_INJECTION_SYMBOL, useDefaultDraggableTable, true);
}
