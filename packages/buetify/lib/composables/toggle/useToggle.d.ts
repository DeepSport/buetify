import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { Ref, PropType } from 'vue';
export declare function getUseTogglePropsDefinition<K extends string>(statusName: K, defaultStatus?: boolean): UseTogglePropsDefinition<K>;
export declare type UseTogglePropsDefinition<K extends string> = {
    onToggle: {
        type: PropType<FunctionN<[boolean], void>>;
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
} & Record<K, {
    type: PropType<boolean>;
    default: boolean;
}> & Record<'hasPopup', {
    type: PropType<boolean>;
    default: boolean;
}>;
export declare type UseToggleProps<K extends string> = Record<K, boolean> & Record<'hasPopup', boolean>;
export declare function getToggleAttrs(status: Ref<boolean>, hasPopup: Ref<boolean>): import("vue").ComputedRef<{
    'aria-haspopup'?: boolean;
    tabindex: number;
    role: string;
    type: string;
    'aria-pressed': boolean;
    'aria-expanded': boolean;
}>;
export declare type ToggleAttrs = ReturnType<typeof getToggleAttrs> extends Ref<infer A> ? A : never;
declare function getListeners(toggle: IO<void>): {
    onClick: IO<void>;
    onKeydown: (e: KeyboardEvent) => void;
};
export declare type ToggleListeners = ReturnType<typeof getListeners>;
export declare function useToggle<K extends string>(props: {
    onToggle?: FunctionN<[boolean], void>;
    onSetOn?: IO<void>;
    onSetOff?: IO<void>;
} & Record<K, boolean> & {
    hasPopup: boolean;
}, statusName: K): {
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
export declare type Toggle = ReturnType<typeof useToggle>;
export {};
