export declare function getValidateMixin(ref: string): import("vue/types/vue").OptionsVue<{
    getRefElement(ref: string): import("fp-ts/lib/Option").Option<HTMLElement>;
} & Record<never, any> & import("vue").default & {
    disabled: boolean;
} & {
    isDisabled: boolean;
    isReadonly: boolean;
}, {
    isValid: boolean;
}, {
    validate(): void;
}, unknown, {
    useNativeValidation: boolean;
}, {
    name: string;
    props: {
        useNativeValidation: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<{
        getRefElement(ref: string): import("fp-ts/lib/Option").Option<HTMLElement>;
    } & Record<never, any> & import("vue").default & {
        disabled: boolean;
    } & {
        isDisabled: boolean;
        isReadonly: boolean;
    }, unknown, unknown, unknown, Readonly<{
        useNativeValidation: boolean;
    }>>): {
        isValid: boolean;
    };
    watch: {
        isValid: {
            handler(newValue: boolean, oldValue: boolean): void;
            immediate: true;
        };
    };
    methods: {
        validate(): void;
    };
}>;
export declare const InputValidateMixin: import("vue/types/vue").OptionsVue<{
    getRefElement(ref: string): import("fp-ts/lib/Option").Option<HTMLElement>;
} & Record<never, any> & import("vue").default & {
    disabled: boolean;
} & {
    isDisabled: boolean;
    isReadonly: boolean;
}, {
    isValid: boolean;
}, {
    validate(): void;
}, unknown, {
    useNativeValidation: boolean;
}, {
    name: string;
    props: {
        useNativeValidation: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<{
        getRefElement(ref: string): import("fp-ts/lib/Option").Option<HTMLElement>;
    } & Record<never, any> & import("vue").default & {
        disabled: boolean;
    } & {
        isDisabled: boolean;
        isReadonly: boolean;
    }, unknown, unknown, unknown, Readonly<{
        useNativeValidation: boolean;
    }>>): {
        isValid: boolean;
    };
    watch: {
        isValid: {
            handler(newValue: boolean, oldValue: boolean): void;
            immediate: true;
        };
    };
    methods: {
        validate(): void;
    };
}>;
