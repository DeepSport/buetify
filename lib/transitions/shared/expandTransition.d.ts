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
export declare function createExpandTransition(transitionClass?: string, x?: boolean): {
    onBeforeEnter(el: HTMLExpandElement): void;
    onEnter(el: HTMLExpandElement): void;
    onAfterEnter: (el: HTMLExpandElement) => void;
    onEnterCancelled: (el: HTMLExpandElement) => void;
    onLeave(el: HTMLExpandElement): void;
    onAfterLeave: (el: HTMLExpandElement) => void;
    onLeaveCancelled: (el: HTMLExpandElement) => void;
};
export {};
