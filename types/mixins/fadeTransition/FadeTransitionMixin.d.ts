import Vue from 'vue';
import { PropValidator } from 'vue/types/options';
import { Transition, TransitionClasses } from '../../types/Transition';
export declare type TransitionMode = 'in-out' | 'out-in';
export declare function getTransitionMixin(transition: Transition): import("vue/types/vue").OptionsVue<Vue, unknown, unknown, {
    formattedTransition: TransitionClasses;
}, {
    transition: Transition;
    mode: "in-out" | "out-in" | undefined;
}, {
    name: string;
    props: {
        transition: PropValidator<Transition>;
        mode: PropValidator<"in-out" | "out-in" | undefined>;
    };
    computed: {
        formattedTransition(): TransitionClasses;
    };
}>;
export declare const FadeTransitionMixin: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, {
    formattedTransition: TransitionClasses;
}, {
    transition: Transition;
    mode: "in-out" | "out-in" | undefined;
}, {
    name: string;
    props: {
        transition: PropValidator<Transition>;
        mode: PropValidator<"in-out" | "out-in" | undefined>;
    };
    computed: {
        formattedTransition(): TransitionClasses;
    };
}>;
export declare function formatTransition(transition: Transition): TransitionClasses;
