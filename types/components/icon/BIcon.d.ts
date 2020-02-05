import './icon.sass';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { ColorVariantFlags } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    variant: "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | ColorVariantFlags;
    icon: any;
    size: SizeVariant;
    tag: TimerHandler;
    iconClass: unknown;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        variant: PropValidator<"is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | ColorVariantFlags>;
        icon: {
            type: (ObjectConstructor | FunctionConstructor)[];
        };
        size: PropValidator<SizeVariant>;
        tag: {
            type: (FunctionConstructor | StringConstructor)[];
            default: string;
        };
        iconClass: any;
        themeMap: PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
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
    render(h: import("vue").CreateElement, context: import("vue").RenderContext<{
        variant: "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | ColorVariantFlags;
        icon: any;
        size: SizeVariant;
        tag: TimerHandler;
        iconClass: unknown;
        themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
        isThemeable: boolean;
    }>): VNode;
}>;
export default _default;
