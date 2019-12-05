import './icon.sass';
import { PropType, ExtractPropTypes } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
export declare const BIconPropsDefinition: {
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    size: {
        type: PropType<SizeVariant>;
        default: "";
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
};
export declare type BIconProps = ExtractPropTypes<typeof BIconPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    size: {
        type: PropType<SizeVariant>;
        default: "";
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    tag: string;
    variant: ColorVariant;
    size: SizeVariant;
} & {}>, {
    tag: string;
    variant: ColorVariant;
    size: SizeVariant;
}>;
export default _default;
