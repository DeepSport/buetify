import './tooltip.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isActive: boolean;
    variant: ColorVariant;
    label: string;
    position: TooltipPosition;
    isAlways: boolean;
    isAnimated: boolean;
    isSquare: boolean;
    isDashed: boolean;
    isMultilined: boolean;
    size: SizeVariant;
    tag: string;
}, {
    name: string;
    functional: boolean;
    props: {
        isActive: {
            type: BooleanConstructor;
            default: boolean;
        };
        variant: PropValidator<ColorVariant>;
        label: StringConstructor;
        position: PropValidator<TooltipPosition>;
        isAlways: BooleanConstructor;
        isAnimated: {
            type: BooleanConstructor;
            default: boolean;
        };
        isSquare: BooleanConstructor;
        isDashed: BooleanConstructor;
        isMultilined: BooleanConstructor;
        size: PropValidator<SizeVariant>;
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { data, props, children }: import("vue").RenderContext<{
        isActive: boolean;
        variant: ColorVariant;
        label: string;
        position: TooltipPosition;
        isAlways: boolean;
        isAnimated: boolean;
        isSquare: boolean;
        isDashed: boolean;
        isMultilined: boolean;
        size: SizeVariant;
        tag: string;
    }>): VNode;
}>;
export default _default;
export declare type TooltipPosition = 'is-top' | 'is-bottom' | 'is-left' | 'is-right';
