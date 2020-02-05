import './bordered-box.sass';
import { ColorVariant } from '../../../types/ColorVariants';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
    variant: string;
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
        variant: {
            type: (new (...args: string[]) => Function) | (() => ColorVariant) | (new (...args: never[]) => never) | import("vue/types/options").Prop<ColorVariant>[];
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
        themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
        isThemeable: boolean;
        variant: string;
        tag: string;
    }>): VNode;
}>;
export default _default;
