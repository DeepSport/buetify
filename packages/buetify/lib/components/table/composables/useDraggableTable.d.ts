import { Option } from 'fp-ts/lib/Option';
import { ExtractPropTypes } from 'vue';
import { FunctionN } from 'fp-ts/lib/function';
import { PropType, Ref } from 'vue';
import { BTableRow } from '../shared';
declare type DropEffect = 'none' | 'copy' | 'link' | 'move';
declare type DragHandler = FunctionN<[DragEvent], void>;
declare type OnDragEffect = FunctionN<[BTableRow, DragEvent, number], void>;
export declare const BTableDraggablePropsDefinition: {
    isDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropEffect: {
        type: PropType<DropEffect>;
        default: "move";
    };
    onDragstart: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragenter: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragover: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragleave: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragend: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDrop: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
};
export interface BTableDraggableProps extends ExtractPropTypes<typeof BTableDraggablePropsDefinition> {
}
export interface UseDraggableTable {
    isDraggable: Ref<boolean>;
    isActive: Ref<boolean>;
    target: Ref<Option<BTableRow>>;
    useRowDragListeners: FunctionN<[BTableRow, number], Record<string, DragHandler>>;
}
export declare function useDraggableTable(props: BTableDraggableProps): UseDraggableTable;
export declare function useInjectedDraggableTable(): UseDraggableTable;
export {};
