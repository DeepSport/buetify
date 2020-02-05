import './dropdown.sass';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';
import Vue, { PropType, VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isActiveThemeMap: ThemeColorMap;
    isActive: boolean;
    tag: string;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        isActiveThemeMap: {
            type: PropType<ThemeColorMap>;
            required: false;
            default: import("fp-ts/lib/function").Lazy<ThemeColorMap>;
        };
        isActive: {
            type: BooleanConstructor;
            default: boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
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
    render(h: import("vue").CreateElement, { data, props, injections, children }: import("vue").RenderContext<{
        isActiveThemeMap: ThemeColorMap;
        isActive: boolean;
        tag: string;
        themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
        isThemeable: boolean;
    }>): VNode;
}>;
export default _default;
