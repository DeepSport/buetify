import 'bulma/sass/elements/button.sass';
import { PropType } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
export interface ButtonProps {
    variant: ColorVariant;
    isRounded: boolean;
    isLoading: boolean;
    isOutlined: boolean;
    isInverted: boolean;
    isFocused: boolean;
    isActive: boolean;
    isDisabled: boolean;
    isHovered: boolean;
    isSelected: boolean;
    isFullwidth: boolean;
    size: SizeVariant;
    tag: 'button' | 'a' | 'input';
}
declare const _default: import("vue").DefineComponent<{
    tag: {
        type: PropType<"button" | "input" | "a">;
        default: "button";
        validator: (val: string) => boolean;
    };
    size: {
        type: PropType<SizeVariant>;
        default: SizeVariant;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: ColorVariant;
    };
    isRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isOutlined: {
        type: PropType<boolean>;
        default: boolean;
    };
    isInverted: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    isDisabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    isHovered: {
        type: PropType<boolean>;
        default: boolean;
    };
    isSelected: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullwidth: {
        type: PropType<boolean>;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: "button" | "input" | "a";
    variant: ColorVariant;
    size: SizeVariant;
    isActive: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isOutlined: boolean;
    isInverted: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isHovered: boolean;
    isSelected: boolean;
    isFullwidth: boolean;
} & {}>, {
    tag: "button" | "input" | "a";
    variant: ColorVariant;
    size: SizeVariant;
    isActive: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isOutlined: boolean;
    isInverted: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    isHovered: boolean;
    isSelected: boolean;
    isFullwidth: boolean;
}>;
export default _default;
