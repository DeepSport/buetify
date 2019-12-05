import 'bulma/sass/components/card.sass';
import 'bulma/sass/components/modal.sass';
import '../../sass/helpers/animations.sass';
import './modal.sass';
import { IO } from 'fp-ts/lib/IO';
import { PropType, ExtractPropTypes } from 'vue';
declare const BModalPropsDefinition: {
    showExit: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullscreen: {
        type: PropType<boolean>;
        default: boolean;
    };
    onToggle: {
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<IO<void>>;
        required: false;
    };
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    transition: {
        type: PropType<import("../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../..").Transition>;
    };
};
export declare type BModalProps = ExtractPropTypes<typeof BModalPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    showExit: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullscreen: {
        type: PropType<boolean>;
        default: boolean;
    };
    onToggle: {
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<IO<void>>;
        required: false;
    };
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    transition: {
        type: PropType<import("../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../..").Transition>;
    };
}, {
    popup: {
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hasPopup: boolean;
    transition: import("../..").Transition;
    isActive: boolean;
    isFullscreen: boolean;
    showExit: boolean;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: IO<void> | undefined;
    onSetOff?: IO<void> | undefined;
}>, {
    hasPopup: boolean;
    transition: import("../..").Transition;
    isActive: boolean;
    isFullscreen: boolean;
    showExit: boolean;
}>;
export default _default;
