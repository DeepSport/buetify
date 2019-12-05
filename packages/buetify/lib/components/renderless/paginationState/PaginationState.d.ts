export declare const PaginationState: import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<number>;
        default: number;
    };
    total: {
        type: import("vue").PropType<number>;
        required: boolean;
    };
    perPage: {
        type: import("vue").PropType<number>;
        default: () => number;
        validator: (value: number) => boolean;
    };
    items: {
        type: import("vue").PropType<unknown[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    'onUpdate:modelValue': {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    items: unknown[];
    perPage: number;
} & {
    total?: number | undefined;
}>, {
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    items: unknown[];
    perPage: number;
}>;
