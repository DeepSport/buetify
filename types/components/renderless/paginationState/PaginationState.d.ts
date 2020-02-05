import { VNode } from 'vue';
export declare const PaginationState: import("vue/types/vue").OptionsVue<{
    next(e?: MouseEvent | undefined): void;
    previous(e?: MouseEvent | undefined): void;
    first(): void;
    last(): void;
    updateCurrent(current: number): void;
    renderDefaultScopedSlot(): VNode;
} & {
    newCurrent: number;
    after: number;
    paginatedItems: readonly unknown[];
    nextPage: number;
    hasNext: boolean;
    previousPage: number;
    hasPrevious: boolean;
    numberOfItems: number;
    numberOfPages: number;
} & {
    items: unknown[] | undefined;
    total: number;
    itemsPerPage: number;
    mapper: Function;
} & import("vue").default & {
    internalLazyValue: unknown;
    internalValue: unknown;
} & Record<"value", any>, unknown, unknown, unknown, Record<never, any>, {
    name: string;
    render(): VNode;
}>;
