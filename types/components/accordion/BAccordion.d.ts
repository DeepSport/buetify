import './accordion.sass';
import { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
declare const _default: import("vue/types/vue").OptionsVue<{
    internalIsOn: boolean;
} & {
    setOn(): void;
    setOff(): void;
    toggle(): void;
} & {
    attrs: object;
    isActive: boolean;
    clickToggler: Record<"click", (e: Event) => void>;
    keyboardToggler: Record<"keydown", (e: KeyboardEvent) => void>;
    listeners: {
        [key: string]: Function | Function[];
    };
} & {
    initialStatus: boolean;
    isOn: boolean;
    hasPopup: boolean;
} & import("vue").default & {
    formattedTransition: import("../../types/Transition").TransitionClasses;
} & {
    transition: import("../../types/Transition").Transition;
    mode: "in-out" | "out-in" | undefined;
}, unknown, unknown, {
    header: VNode;
    headerTitle: VNode;
    triggerButton: VNode | VNode[];
    body: VNode;
    bodyContent: VNode;
}, {
    title: string;
    icon: import("vue").VueConstructor<import("vue").default, Record<string, any>> | import("vue").FunctionalComponentOptions<any, import("vue/types/options").PropsDefinition<any>> | import("vue").ComponentOptions<never, any, any, any, any, Record<string, any>> | import("vue/types/options").AsyncComponentPromise<any, any, any, any> | import("vue/types/options").AsyncComponentFactory<any, any, any, any>;
}, {
    name: string;
    props: {
        title: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        icon: PropValidator<import("vue").VueConstructor<import("vue").default, Record<string, any>> | import("vue").FunctionalComponentOptions<any, import("vue/types/options").PropsDefinition<any>> | import("vue").ComponentOptions<never, any, any, any, any, Record<string, any>> | import("vue/types/options").AsyncComponentPromise<any, any, any, any> | import("vue/types/options").AsyncComponentFactory<any, any, any, any>>;
    };
    computed: {
        header(): VNode;
        headerTitle(): VNode;
        triggerButton(): VNode | VNode[];
        body(): VNode;
        bodyContent(): VNode;
    };
    render(): VNode;
}>;
export default _default;
