import { AllColorsVariant } from '../../../types/ColorVariants';
import { PositionVariant } from '../../../types/PositionVariant';
import Vue, { PropType, VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    duration: number;
    message: string;
    position: string;
    shouldQueue: boolean;
    variant: string;
}, {
    name: string;
    functional: boolean;
    props: {
        duration: {
            type: NumberConstructor;
            default: number;
        };
        message: {
            type: StringConstructor;
        };
        position: {
            type: PropType<PositionVariant>;
            required: false;
            default: string;
        };
        shouldQueue: {
            type: BooleanConstructor;
            default: boolean;
        };
        variant: {
            type: PropType<AllColorsVariant>;
            default: string;
        };
    };
    inject: {
        notice: {
            default: import("fp-ts/lib/function").Lazy<import("../../../types/AppInjection").NoticeInjection>;
        };
    };
    render(h: import("vue").CreateElement, { props, data, scopedSlots, injections, children }: import("vue").RenderContext<{
        duration: number;
        message: string;
        position: string;
        shouldQueue: boolean;
        variant: string;
    }>): VNode;
}>;
export default _default;
