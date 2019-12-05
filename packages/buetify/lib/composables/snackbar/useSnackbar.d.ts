import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { ExtractPropTypes, PropType, Slots } from 'vue';
import { ColorVariant, PositionVariant } from '../../types';
import { NoticeController, OpenNoticeOptions, RenderNoticeOptions } from '../noticeController';
export declare const SnackbarPropsDefinition: {
    position: {
        type: PropType<PositionVariant>;
        default: "is-bottom-right";
    };
    actionText: {
        type: PropType<string>;
        default: string;
    };
    onAction: {
        type: PropType<IO<void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "is-success";
    };
    transition: {
        type: PropType<import("../../types").Transition>;
        required: boolean;
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
    isIndefinite: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export interface SnackbarProps extends ExtractPropTypes<typeof SnackbarPropsDefinition> {
}
export interface RenderSnackbarOptions extends RenderNoticeOptions, OpenNoticeOptions {
    onAction?: IO<void>;
    actionText?: string;
}
export interface OpenSnackbarOptions extends RenderSnackbarOptions {
}
export interface SnackbarController extends NoticeController {
    open: FunctionN<[OpenSnackbarOptions], void>;
}
export declare function useSnackbar(props?: SnackbarProps, slots?: Slots): SnackbarController;
