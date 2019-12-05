import '../../sass/helpers/animations.sass';
import './tooltip.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType } from 'vue';
export declare type TooltipPosition = 'is-top' | 'is-bottom' | 'is-left' | 'is-right';
declare const _default: import("vue").DefineComponent<{
    isActive: {
        type: PropType<boolean>;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "is-primary";
    };
    label: {
        type: PropType<string>;
        required: true;
    };
    position: {
        type: PropType<TooltipPosition>;
        default: "is-top";
    };
    isAlways: {
        type: PropType<boolean>;
        default: boolean;
    };
    isAnimated: {
        type: PropType<boolean>;
        default: boolean;
    };
    isSquare: {
        type: PropType<boolean>;
        default: boolean;
    };
    isDashed: {
        type: PropType<boolean>;
        default: boolean;
    };
    isMultiline: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: PropType<SizeVariant>;
        default: "is-medium";
    };
    tag: {
        type: PropType<string>;
        default: string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: string;
    variant: ColorVariant;
    size: SizeVariant;
    position: TooltipPosition;
    label: string;
    isAnimated: boolean;
    isAlways: boolean;
    isSquare: boolean;
    isDashed: boolean;
    isMultiline: boolean;
} & {
    isActive?: boolean | undefined;
}>, {
    tag: string;
    variant: ColorVariant;
    size: SizeVariant;
    position: TooltipPosition;
    isAnimated: boolean;
    isAlways: boolean;
    isSquare: boolean;
    isDashed: boolean;
    isMultiline: boolean;
}>;
export default _default;
