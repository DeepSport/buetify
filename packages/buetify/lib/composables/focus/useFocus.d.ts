import { Ref, VNode, PropType, ExtractPropTypes } from 'vue';
export declare const UseFocusPropsDefinition: {
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export declare type UseFocusProps = ExtractPropTypes<typeof UseFocusPropsDefinition>;
export declare function useFocus(props: UseFocusProps, ref: Ref<HTMLElement | VNode>): {
    isFocused: Ref<boolean>;
    focus: (e?: Event | undefined) => void;
    onFocus: (e?: Event | undefined) => void;
    onBlur: (e?: Event | undefined) => void;
};
