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
    beforeEnter(el: HTMLExpandElement): void;
    enter(el: HTMLExpandElement): void;
    afterEnter: (el: HTMLExpandElement) => void;
    enterCancelled: (el: HTMLExpandElement) => void;
    leave(el: HTMLExpandElement): void;
    afterLeave: (el: HTMLExpandElement) => void;
    leaveCancelled: (el: HTMLExpandElement) => void;
};
export {};
