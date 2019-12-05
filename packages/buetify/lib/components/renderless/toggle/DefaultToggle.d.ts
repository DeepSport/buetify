export declare function defineToggle<K extends string>(statusName: K): import("vue").DefineComponent<import("../../../composables/toggle").UseTogglePropsDefinition<K>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<import("../../../composables/toggle").UseTogglePropsDefinition<K>>>, import("vue").ExtractDefaultPropTypes<import("../../../composables/toggle").UseTogglePropsDefinition<K>>>;
export declare const DefaultToggle: import("vue").DefineComponent<import("../../../composables/toggle").UseTogglePropsDefinition<"status">, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hasPopup: boolean;
    status: boolean;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: import("fp-ts/lib/IO").IO<void> | undefined;
    onSetOff?: import("fp-ts/lib/IO").IO<void> | undefined;
}>, {
    hasPopup: boolean;
    status: boolean;
}>;
