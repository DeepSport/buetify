import './divider.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
    text: string;
    tag: string;
}, {
    name: string;
    functional: boolean;
    props: {
        themeMap: import("vue/types/options").PropValidator<import("../../../types/ThemeColorMap").ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
        text: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
    };
    inject: {
        theme: {
            default: undefined;
        };
    };
    render(h: import("vue").CreateElement, { props, data, injections }: import("vue").RenderContext<{
        themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
        isThemeable: boolean;
        text: string;
        tag: string;
    }>): VNode;
}>;
export default _default;
