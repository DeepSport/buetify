import { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
export declare const PaginationMixin: import("vue/types/vue").OptionsVue<import("vue").default & {
    internalLazyValue: unknown;
    internalValue: unknown;
} & Record<"value", any>, unknown, {
    next(e?: MouseEvent | undefined): void;
    previous(e?: MouseEvent | undefined): void;
    first(): void;
    last(): void;
    updateCurrent(current: number): void;
    renderDefaultScopedSlot(): VNode;
}, {
    newCurrent: number;
    after: number;
    paginatedItems: readonly unknown[];
    nextPage: number;
    hasNext: boolean;
    previousPage: number;
    hasPrevious: boolean;
    numberOfItems: number;
    numberOfPages: number;
}, {
    items: unknown[] | undefined;
    total: number;
    itemsPerPage: number;
    mapper: Function;
}, {
    name: string;
    props: {
        items: PropValidator<unknown[] | undefined>;
        total: {
            type: NumberConstructor;
            required: false;
        };
        itemsPerPage: {
            type: () => number;
            required: false;
            default: number;
        };
        mapper: {
            type: FunctionConstructor;
            required: false;
        };
    };
    computed: {
        newCurrent(): number;
        after(): number;
        paginatedItems(): readonly unknown[];
        nextPage(): number;
        hasNext(): boolean;
        previousPage(): number;
        hasPrevious(): boolean;
        numberOfItems(): number;
        numberOfPages(): number;
    };
    methods: {
        next(e?: MouseEvent | undefined): void;
        previous(e?: MouseEvent | undefined): void;
        first(): void;
        last(): void;
        updateCurrent(current: number): void;
        renderDefaultScopedSlot(): VNode;
    };
}>;
