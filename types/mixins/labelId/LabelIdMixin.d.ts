import Vue from 'vue';
export declare function getLabelIdMixin(prefix: string, labelSlot?: string): import("vue/types/vue").OptionsVue<Vue, unknown, unknown, {
    hasLabel: boolean;
    computedId: string;
    labelId: string;
}, {
    id: string;
    label: string;
}, {
    props: {
        id: StringConstructor;
        label: {
            type: StringConstructor;
            default: string;
        };
    };
    computed: {
        hasLabel(): boolean;
        computedId(): string;
        labelId(): string;
    };
}>;
export declare const InputLabelIdMixin: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, {
    hasLabel: boolean;
    computedId: string;
    labelId: string;
}, {
    id: string;
    label: string;
}, {
    props: {
        id: StringConstructor;
        label: {
            type: StringConstructor;
            default: string;
        };
    };
    computed: {
        hasLabel(): boolean;
        computedId(): string;
        labelId(): string;
    };
}>;
