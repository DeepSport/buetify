import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { PropType, ExtractPropTypes, VNode, Ref } from 'vue';
import { AllColorsVariant, ColorVariant } from '../../types/ColorVariants';
import { PositionVariant } from '../../types/PositionVariant';
import { Transition } from '../../types/Transition';
export declare const UseNoticePropsDefinition: {
    transition: {
        type: PropType<Transition>;
        required: boolean;
    };
    position: {
        type: PropType<PositionVariant>;
        default: "is-bottom";
    };
    duration: {
        type: PropType<number>;
        default: number;
    };
    message: {
        type: PropType<string>;
    };
    shouldQueue: {
        type: PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    isIndefinite: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export interface UseNoticeProps extends ExtractPropTypes<typeof UseNoticePropsDefinition> {
}
export declare const DEFAULT_USE_NOTICE_PROPS: UseNoticeProps;
export interface RenderNoticeOptions {
    variant?: AllColorsVariant;
    message?: string;
    position?: PositionVariant;
}
export interface OpenNoticeOptions extends RenderNoticeOptions {
    duration?: number;
    shouldQueue?: boolean;
    transition?: Transition;
    isIndefinite?: boolean;
    onAction?: IO<void>;
}
export declare function useNoticeController(props: UseNoticeProps, render: Ref<FunctionN<[RenderNoticeOptions], IO<VNode[]>>>): {
    open: (options: OpenNoticeOptions) => void;
    close: () => void;
};
export declare type NoticeController = ReturnType<typeof useNoticeController>;
