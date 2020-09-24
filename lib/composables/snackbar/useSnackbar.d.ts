import { IO } from 'fp-ts/lib/IO';
import { ExtractPropTypes, PropType, Slots } from 'vue';
export declare const SnackbarPropsDefinition: {
    actionText: {
        type: PropType<string>;
        default: string;
    };
    onAction: {
        type: PropType<IO<void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    transition: {
        type: PropType<import("../../types/Transition").Transition>;
        required: boolean;
    };
    position: {
        type: PropType<import("../../types/PositionVariant").PositionVariant>;
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
        type: PropType<import("../../types/ColorVariants").ColorVariant>;
        default: "is-primary";
    };
    isIndefinite: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export interface SnackbarProps extends ExtractPropTypes<typeof SnackbarPropsDefinition> {
}
export declare function useSnackbar(props?: SnackbarProps, slots?: Slots): {
    open: (options: import("../noticeController").OpenNoticeOptions) => void;
    close: () => void;
};
