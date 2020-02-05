import Vue from 'vue';
import { AsyncComponent, Component, PropValidator } from 'vue/types/options';
import { ColorVariant } from '../../types/ColorVariants';
export declare type MessageSize = 'is-small' | 'is-medium' | 'is-large';
export declare type MessageIcons = {
    [K in ColorVariant]: Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
};
export declare const MessageMixin: import("vue/types/vue").OptionsVue<Vue, {
    internalIsActive: boolean;
}, {
    closeMessage(): void;
    setAutoClose(): void;
}, {
    icon: import("vue").VueConstructor<Vue, Record<string, any>> | import("vue").FunctionalComponentOptions<any, import("vue/types/options").PropsDefinition<any>> | import("vue").ComponentOptions<never, any, any, any, any, Record<string, any>> | import("vue/types/options").AsyncComponentPromise<any, any, any, any> | import("vue/types/options").AsyncComponentFactory<any, any, any, any> | undefined;
    hasTitle: boolean;
    newIconSize: string;
    messageClasses: any[];
}, {
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
    icons: MessageIcons;
}, {
    name: string;
    props: {
        isActive: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: PropValidator<string | undefined>;
        isClosable: {
            type: BooleanConstructor;
            default: boolean;
        };
        message: PropValidator<string | undefined>;
        variant: PropValidator<"is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined>;
        size: PropValidator<"is-small" | "is-medium" | "is-large" | undefined>;
        iconSize: PropValidator<"is-small" | "is-medium" | "is-large" | undefined>;
        autoClose: {
            type: BooleanConstructor;
            default: boolean;
        };
        duration: {
            type: NumberConstructor;
            default: number;
        };
        displayIcon: {
            type: BooleanConstructor;
            default: boolean;
        };
        icons: PropValidator<MessageIcons>;
    };
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<{
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
        icons: MessageIcons;
    }>>): {
        internalIsActive: boolean;
    };
    computed: {
        icon(): import("vue").VueConstructor<Vue, Record<string, any>> | import("vue").FunctionalComponentOptions<any, import("vue/types/options").PropsDefinition<any>> | import("vue").ComponentOptions<never, any, any, any, any, Record<string, any>> | import("vue/types/options").AsyncComponentPromise<any, any, any, any> | import("vue/types/options").AsyncComponentFactory<any, any, any, any> | undefined;
        hasTitle(): boolean;
        newIconSize(): string;
        messageClasses(): any[];
    };
    watch: {
        isActive(val: boolean): void;
        internalIsActive: {
            handler(newValue: boolean): void;
            immediate: true;
        };
    };
    methods: {
        closeMessage(): void;
        setAutoClose(): void;
    };
}>;
