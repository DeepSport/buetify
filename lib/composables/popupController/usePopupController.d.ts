import { IO } from 'fp-ts/lib/IO';
import { VNode, ExtractPropTypes, Ref } from 'vue';
export declare const UsePopupControllerPropsDefinition: {
    isActive: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    transition: {
        type: import("vue").PropType<import("../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
        required: boolean;
    };
};
export declare type UsePopupProps = ExtractPropTypes<typeof UsePopupControllerPropsDefinition>;
export declare function usePopupController(props: UsePopupProps, render: Ref<IO<VNode[]>>): {
    isOpen: import("vue").ComputedRef<boolean>;
    attrs: import("vue").ComputedRef<{
        'aria-haspopup'?: boolean;
        tabindex: number;
        role: string;
        type: string;
        'aria-pressed': boolean;
        'aria-expanded': boolean;
    }>;
    listeners: {
        onClick: IO<void>;
        onKeydown: (e: KeyboardEvent) => void;
    };
    open: () => void;
    close: () => void;
    toggle: () => void;
};
export declare type PopupController = ReturnType<typeof usePopupController>;
