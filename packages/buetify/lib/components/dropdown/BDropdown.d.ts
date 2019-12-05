import './dropdown.sass';
import { Predicate } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { TransitionClasses } from '../../types/Transition';
import { ExtractPropTypes, PropType, Ref } from 'vue';
import { Classes } from '../../utils/mergeClasses';
export declare type DropdownPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';
export declare const BDropdownPropsDefinition: {
    id: PropType<string>;
    isDisabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isInline: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<DropdownPosition>;
        validator: (value: unknown) => boolean;
    };
    isMobileModal: {
        type: PropType<boolean>;
        default: boolean;
    };
    menuTag: {
        type: PropType<string>;
        default: string;
    };
    transition: {
        type: PropType<import("../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
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
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type BDropdownProps = ExtractPropTypes<typeof BDropdownPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    id: PropType<string>;
    isDisabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isInline: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<DropdownPosition>;
        validator: (value: unknown) => boolean;
    };
    isMobileModal: {
        type: PropType<boolean>;
        default: boolean;
    };
    menuTag: {
        type: PropType<string>;
        default: string;
    };
    transition: {
        type: PropType<import("../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
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
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
}, {
    root: Ref<HTMLElement>;
    rootClasses: Ref<Classes[]>;
    clickOutsideArgs: {
        include: () => HTMLElement[];
        closeConditional: Predicate<Event>;
    };
    toggle: {
        isOn: import("vue").WritableComputedRef<boolean>;
        isOff: import("vue").ComputedRef<boolean>;
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
        setOn: (e?: Event | undefined) => void;
        setOff: (e?: Event | undefined) => void;
        toggle: (e?: Event | undefined) => void;
    };
    transition: import("vue").ComputedRef<TransitionClasses>;
    themeClasses: import("vue").ComputedRef<string[]>;
    dropdownMenu: Ref<HTMLElement>;
    displayMobileBackground: import("vue").ComputedRef<boolean>;
    menuToggle: {
        isOn: import("vue").ComputedRef<boolean>;
        isOff: import("vue").ComputedRef<boolean>;
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
        setOn: (e?: Event | undefined) => void;
        setOff: (e?: Event | undefined) => void;
        toggle: (e?: Event | undefined) => void;
    };
    trigger: Ref<HTMLElement>;
    computedId: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    hasPopup: boolean;
    transition: import("../../types/Transition").Transition;
    isExpanded: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: IO<void> | undefined;
    onSetOff?: IO<void> | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    id?: string | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    hasPopup: boolean;
    transition: import("../../types/Transition").Transition;
    isExpanded: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
}>;
export default _default;
