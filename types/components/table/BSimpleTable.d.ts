import './table.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    tableClasses: any;
    isLoading: boolean;
    isScrollable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        tableClasses: {
            type: (ObjectConstructor | ArrayConstructor)[];
            required: false;
            default: import("fp-ts/lib/function").Lazy<never[]>;
        };
        isLoading: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        isScrollable: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        themeMap: import("vue/types/options").PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    };
    inject: {
        theme: {
            default: undefined;
        };
    };
    render(h: import("vue").CreateElement, { props, data, children, injections }: import("vue").RenderContext<{
        tableClasses: any;
        isLoading: boolean;
        isScrollable: boolean;
        themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
        isThemeable: boolean;
    }>): VNode;
}>;
export default _default;
