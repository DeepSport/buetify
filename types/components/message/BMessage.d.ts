import './message.sass';
import { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<{
    formattedTransition: import("../../types/Transition").TransitionClasses;
} & {
    transition: import("../../types/Transition").Transition;
    mode: "in-out" | "out-in" | undefined;
} & import("vue").default & {
    internalIsActive: boolean;
} & {
    closeMessage(): void;
    setAutoClose(): void;
} & {
    icon: import("vue").VueConstructor<import("vue").default, Record<string, any>> | import("vue").FunctionalComponentOptions<any, import("vue/types/options").PropsDefinition<any>> | import("vue").ComponentOptions<never, any, any, any, any, Record<string, any>> | import("vue/types/options").AsyncComponentPromise<any, any, any, any> | import("vue/types/options").AsyncComponentFactory<any, any, any, any> | undefined;
    hasTitle: boolean;
    newIconSize: string;
    messageClasses: any[];
} & {
    isActive: boolean;
    title: string | undefined;
    isClosable: boolean;
    message: string | undefined;
    variant: "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    size: "is-small" | "is-medium" | "is-large" | undefined;
    iconSize: "is-small" | "is-medium" | "is-large" | undefined;
    autoClose: boolean;
    duration: number;
    displayIcon: boolean;
    icons: import("../../mixins/message/MessageMixin").MessageIcons;
}, unknown, {
    generateMessage(): VNode;
    generateHeader(): VNode;
    generateBody(): VNode;
}, unknown, Record<never, any>, {
    name: string;
    methods: {
        generateMessage(): VNode;
        generateHeader(): VNode;
        generateBody(): VNode;
    };
    render(): VNode;
}>;
export default _default;
