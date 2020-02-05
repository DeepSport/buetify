import './button.sass';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    variant: ColorVariant;
    isRounded: boolean;
    isLoading: boolean;
    isOutlined: boolean;
    isInverted: boolean;
    isFocused: boolean;
    isActive: boolean;
    isDisabled: boolean;
    isHovered: boolean;
    size: SizeVariant;
    tag: string;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        variant: PropValidator<ColorVariant>;
        isRounded: BooleanConstructor;
        isLoading: BooleanConstructor;
        isOutlined: BooleanConstructor;
        isInverted: BooleanConstructor;
        isFocused: BooleanConstructor;
        isActive: BooleanConstructor;
        isDisabled: BooleanConstructor;
        isHovered: BooleanConstructor;
        size: PropValidator<SizeVariant>;
        tag: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
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
    render(h: import("vue").CreateElement, { data, props, injections, children }: import("vue").RenderContext<{
        variant: ColorVariant;
        isRounded: boolean;
        isLoading: boolean;
        isOutlined: boolean;
        isInverted: boolean;
        isFocused: boolean;
        isActive: boolean;
        isDisabled: boolean;
        isHovered: boolean;
        size: SizeVariant;
        tag: string;
        themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
        isThemeable: boolean;
    }>): VNode;
}>;
export default _default;
