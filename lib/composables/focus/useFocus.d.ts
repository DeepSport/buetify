import { IO } from 'fp-ts/lib/IO';
import { Ref, VNode, PropType, ExtractPropTypes } from 'vue';
export declare const UseFocusPropsDefinition: {
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<IO<void>>;
        required: false;
    };
    onBlur: {
        type: PropType<IO<void>>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export declare type UseFocusProps = ExtractPropTypes<typeof UseFocusPropsDefinition>;
export declare function useFocus(props: UseFocusProps, ref: Ref<HTMLElement | VNode>): {
    isFocused: Ref<false> | Ref<true>;
    focus: () => void;
    onFocus: () => void;
    onBlur: () => void;
};
