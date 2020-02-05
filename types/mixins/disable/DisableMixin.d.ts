import Vue from 'vue';
export declare const DisableMixin: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, {
    disabled: boolean;
}, {
    isDisabled: boolean;
    isReadonly: boolean;
}, {
    name: string;
    props: {
        isDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        isReadonly: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    computed: {
        disabled(): boolean;
    };
}>;
