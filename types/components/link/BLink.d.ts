import './link.sass';
import { ThemeColorMap } from '../../mixins/themeInjection/ThemeInjectionMixin';
import Vue, { PropType, VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    themeMap: ThemeColorMap;
    isThemeable: boolean;
    text: string;
    href: string;
    tag: string;
}, {
    name: string;
    functional: boolean;
    props: {
        themeMap: {
            type: PropType<ThemeColorMap>;
            required: false;
            default: import("fp-ts/lib/function").Lazy<ThemeColorMap>;
        };
        isThemeable: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        text: {
            type: StringConstructor;
            required: false;
        };
        href: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
    };
    inject: {
        theme: {
            default: undefined;
        };
    };
    render(h: import("vue").CreateElement, { data, props, injections, children }: import("vue").RenderContext<{
        themeMap: ThemeColorMap;
        isThemeable: boolean;
        text: string;
        href: string;
        tag: string;
    }>): VNode;
}>;
export default _default;
