import './tag.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    isAttached: {
        type: BooleanConstructor;
        default: boolean;
    };
    isClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    closeVariant: {
        type: PropType<ColorVariant>;
    };
    size: {
        type: PropType<SizeVariant>;
        default: "";
    };
    isRounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    hasEllipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    isTabable: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClose: {
        type: PropType<FunctionN<[MouseEvent], void>>;
        required: false;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: string;
    variant: ColorVariant;
    size: SizeVariant;
    isRounded: boolean;
    isDisabled: boolean;
    isClosable: boolean;
    isAttached: boolean;
    hasEllipsis: boolean;
    isTabable: boolean;
} & {
    closeVariant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    onClose?: FunctionN<[MouseEvent], void> | undefined;
}>, {
    tag: string;
    variant: ColorVariant;
    size: SizeVariant;
    isRounded: boolean;
    isDisabled: boolean;
    isClosable: boolean;
    isAttached: boolean;
    hasEllipsis: boolean;
    isTabable: boolean;
}>;
export default _default;
