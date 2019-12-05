import { BaseTransitionProps } from 'vue';
interface HTMLExpandElement extends HTMLElement {
    _parent?: (Node & ParentNode & HTMLElement) | null;
    _initialStyle: {
        transition: string;
        visibility: string | null;
        overflow: string | null;
        height?: string | null;
        width?: string | null;
    };
}
export declare function createExpandTransition(expandedParentClass?: string, x?: boolean): BaseTransitionProps<HTMLExpandElement>;
export {};
