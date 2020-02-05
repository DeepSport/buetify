import { Option } from 'fp-ts/lib/Option';
import { CreateElement, VNode } from 'vue';
export declare function rebuildFunctionalSlots(slots: {
    [key: string]: VNode[] | undefined;
}, h: CreateElement): VNode[];
export declare function rebuildFunctionalSlot(slots: {
    [key: string]: VNode[] | undefined;
}, h: CreateElement, name: string): Option<VNode>;
