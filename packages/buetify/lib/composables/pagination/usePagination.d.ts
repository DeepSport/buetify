import { PropType, ExtractPropTypes } from 'vue';
export declare const DEFAULT_ITEMS_PER_PAGE: import("vue").Ref<number>;
export declare const UsePaginationPropsDefinition: {
    modelValue: {
        type: PropType<number>;
        default: number;
    };
    total: {
        type: PropType<number>;
        required: boolean;
    };
    perPage: {
        type: PropType<number>;
        default: () => number;
        validator: (value: number) => boolean;
    };
    items: {
        type: PropType<unknown[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
    };
};
export declare type UsePaginationProps = ExtractPropTypes<typeof UsePaginationPropsDefinition>;
export declare function usePagination<T>(props: UsePaginationProps): {
    paginatedItems: import("vue").ComputedRef<T[]>;
    current: import("vue").ComputedRef<number>;
    numberOfPages: import("vue").ComputedRef<number>;
    after: import("vue").ComputedRef<number>;
    nextPage: import("vue").ComputedRef<number>;
    hasNext: import("vue").ComputedRef<boolean>;
    previousPage: import("vue").ComputedRef<number>;
    hasPrevious: import("vue").ComputedRef<boolean>;
    next: (e: Event) => void;
    previous: (e: Event) => void;
    first: () => void;
    last: () => void;
    set: (num: number) => void;
};
export declare type Pagination = ReturnType<typeof usePagination>;
export declare function extractPaginationState(pagination: Pagination): {
    paginatedItems: unknown[];
    current: number;
    numberOfPages: number;
    after: number;
    nextPage: number;
    hasNext: boolean;
    previousPage: number;
    hasPrevious: boolean;
    next: (e: Event) => void;
    previous: (e: Event) => void;
    first: () => void;
    last: () => void;
    set: (num: number) => void;
};
export declare type ExtractedPaginationState = ReturnType<typeof extractPaginationState>;
