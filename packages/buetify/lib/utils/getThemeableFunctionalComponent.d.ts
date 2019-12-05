import { ThemeInjection, ThemeProps } from '../composables/theme';
import { ThemeColorMap } from '../types/ThemeColorMap';
export interface ThemeableComponentOptions {
    cls: string;
    el?: string;
    themeMap?: ThemeColorMap;
}
export interface ThemeableComponentProps extends Partial<ThemeProps> {
    tag?: string;
}
export declare function isThemeable(props: Partial<ThemeProps>, injection: ThemeInjection): boolean;
export declare function getThemeableFunctionalComponent({ cls, el, themeMap }: ThemeableComponentOptions): import("vue").DefineComponent<{
    tag: {
        type: (FunctionConstructor | StringConstructor)[];
        default: string;
    };
    themeMap: {
        type: import("vue").PropType<ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<ThemeColorMap>;
    };
    isThemeable: {
        type: import("vue").PropType<boolean>;
        required: boolean;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: ThemeColorMap;
    tag: string | Function;
} & {}>, {
    isThemeable: boolean;
    themeMap: ThemeColorMap;
    tag: string | Function;
}>;
