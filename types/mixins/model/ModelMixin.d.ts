import Vue from 'vue';
interface options extends Vue {
    $_modelEvent: string;
}
export declare const ModelMixin: import("vue/types/vue").OptionsVue<options & Vue, {
    newValue: unknown;
}, {
    onInput(e: Event): void;
}, {
    internalValue: any;
}, {
    value: unknown;
}, {
    name: string;
    props: {
        value: any;
    };
    data(this: import("vue/types/vue").CombinedVueInstance<options & Vue, unknown, unknown, unknown, Readonly<{
        value: unknown;
    }>>): {
        newValue: unknown;
    };
    computed: {
        internalValue: {
            get(): any;
            set(val: any): void;
        };
    };
    watch: {
        value(val: any): void;
    };
    methods: {
        onInput(e: Event): void;
    };
    beforeCreate(this: options & Vue): void;
}>;
export {};
