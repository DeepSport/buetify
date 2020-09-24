export declare const PaginationState: (new () => import("vue").ComponentPublicInstance<{
    total: number;
} & {
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    perPage?: number | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    total: number;
} & {
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    perPage?: number | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    total: number;
    perPage: number;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        modelValue: {
            type: import("vue").PropType<number>;
            default: number;
        };
        total: {
            type: import("vue").PropType<number>;
            required: true;
        };
        perPage: {
            type: import("vue").PropType<number>;
            default: number;
        };
        'onUpdate:modelValue': {
            type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
            default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    total: number;
    perPage: number;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, {}, {}, {}, Record<string, any>, Readonly<{
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    total: number;
    perPage: number;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    total: number;
    perPage: number;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
