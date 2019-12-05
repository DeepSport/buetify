declare const _default: import("vue").DefineComponent<{
    label: {
        type: import("vue").PropType<string>;
        required: true;
    };
    icon: {
        type: import("vue").PropType<import("vue").Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    isDisabled: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    isVisible: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isVisible: boolean;
    isDisabled: boolean;
    label: string;
} & {
    icon?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
}>, {
    isVisible: boolean;
    isDisabled: boolean;
}>;
export default _default;
