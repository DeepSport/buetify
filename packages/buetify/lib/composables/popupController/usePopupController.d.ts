import { IO } from 'fp-ts/lib/IO';
import { VNode, ExtractPropTypes, Ref } from 'vue';
export declare const UsePopupControllerPropsDefinition: {
    onToggle: {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: import("vue").PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: import("vue").PropType<IO<void>>;
        required: false;
    };
    isActive: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    transition: {
        type: import("vue").PropType<import("../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../..").Transition>;
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
    props: import("vue").ComputedRef<{
        onClick: IO<void>;
        onKeydown: (e: KeyboardEvent) => void;
        'aria-haspopup'?: boolean;
        tabindex: number;
        role: string;
        type: string;
        'aria-pressed': boolean;
        'aria-expanded': boolean;
    }>;
    open: (e?: Event | undefined) => void;
    close: (e?: Event | undefined) => void;
    toggle: (e?: Event | undefined) => void;
};
export declare type PopupController = ReturnType<typeof usePopupController>;
