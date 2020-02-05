import './tag.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isAttached: boolean;
    isClosable: boolean;
    variant: ColorVariant;
    size: SizeVariant;
    isRounded: boolean;
    isDisabled: boolean;
    hasEllipsis: boolean;
    isTabable: boolean;
    tag: string;
}, {
    name: string;
    functional: boolean;
    props: {
        isAttached: BooleanConstructor;
        isClosable: BooleanConstructor;
        variant: {
            type: (new (...args: string[]) => Function) | (() => ColorVariant) | (new (...args: never[]) => never) | import("vue/types/options").Prop<ColorVariant>[];
        };
        size: {
            type: (new (...args: string[]) => Function) | (() => SizeVariant) | (new (...args: never[]) => never) | import("vue/types/options").Prop<SizeVariant>[];
            required: false;
        };
        isRounded: BooleanConstructor;
        isDisabled: BooleanConstructor;
        hasEllipsis: BooleanConstructor;
        isTabable: {
            type: BooleanConstructor;
            default: boolean;
        };
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { data, props, children }: import("vue").RenderContext<{
        isAttached: boolean;
        isClosable: boolean;
        variant: ColorVariant;
        size: SizeVariant;
        isRounded: boolean;
        isDisabled: boolean;
        hasEllipsis: boolean;
        isTabable: boolean;
        tag: string;
    }>): VNode;
}>;
export default _default;
