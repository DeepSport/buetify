import { PropType, ExtractPropTypes } from 'vue';
import { Transition, TransitionClasses } from '../../types/Transition';
export declare function getUseTransitionPropsDefinition(transition: Transition): {
    transition: {
        type: PropType<Transition>;
        default: import("fp-ts/lib/function").Lazy<Transition>;
        required: boolean;
    };
};
export declare type UserTransitionProps = ExtractPropTypes<ReturnType<typeof getUseTransitionPropsDefinition>>;
export declare const FadeTransitionPropsDefinition: {
    transition: {
        type: PropType<Transition>;
        default: import("fp-ts/lib/function").Lazy<Transition>;
        required: boolean;
    };
};
export declare function formatTransition(transition: Transition): TransitionClasses;
export declare function useTransition(props: UserTransitionProps): import("vue").ComputedRef<TransitionClasses>;
