import Vue from 'vue';
export declare function getToggleMixin<StatusName extends string>(statusName: StatusName): import("vue/types/vue").OptionsVue<Vue, {
    internalIsOn: boolean;
}, {
    setOn(): void;
    setOff(): void;
    toggle(): void;
}, {
    attrs: object;
    isActive: boolean;
    clickToggler: Record<"click", (e: Event) => void>;
    keyboardToggler: Record<"keydown", (e: KeyboardEvent) => void>;
    listeners: {
        [key: string]: Function | Function[];
    };
}, {
    [x: string]: any;
    isOn: boolean;
    hasPopup: boolean;
}, {
    props: {
        [x: string]: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        } | {
            type: BooleanConstructor;
            required: false;
            default: undefined;
        } | {
            type: BooleanConstructor;
            default: boolean;
            required?: undefined;
        };
        isOn: {
            type: BooleanConstructor;
            required: false;
            default: undefined;
        };
        hasPopup: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<{
        [x: string]: any;
        isOn: boolean;
        hasPopup: boolean;
    }>>): {
        internalIsOn: boolean;
    };
    computed: {
        attrs(): object;
        isActive(): boolean;
        clickToggler(): Record<"click", (e: Event) => void>;
        keyboardToggler(): Record<"keydown", (e: KeyboardEvent) => void>;
        listeners(): {
            [key: string]: Function | Function[];
        };
    };
    watch: {
        isOn(newValue: boolean | undefined): void;
        isActive: (newValue: boolean, oldValue: boolean) => void;
    };
    methods: {
        setOn(): void;
        setOff(): void;
        toggle(): void;
    };
}>;
export declare const ToggleMixin: import("vue/types/vue").OptionsVue<Vue, {
    internalIsOn: boolean;
}, {
    setOn(): void;
    setOff(): void;
    toggle(): void;
}, {
    attrs: object;
    isActive: boolean;
    clickToggler: Record<"click", (e: Event) => void>;
    keyboardToggler: Record<"keydown", (e: KeyboardEvent) => void>;
    listeners: {
        [key: string]: Function | Function[];
    };
}, {
    initialStatus: boolean;
    isOn: boolean;
    hasPopup: boolean;
}, {
    props: {
        initialStatus: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        isOn: {
            type: BooleanConstructor;
            required: false;
            default: undefined;
        };
        hasPopup: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<{
        initialStatus: boolean;
        isOn: boolean;
        hasPopup: boolean;
    }>>): {
        internalIsOn: boolean;
    };
    computed: {
        attrs(): object;
        isActive(): boolean;
        clickToggler(): Record<"click", (e: Event) => void>;
        keyboardToggler(): Record<"keydown", (e: KeyboardEvent) => void>;
        listeners(): {
            [key: string]: Function | Function[];
        };
    };
    watch: {
        isOn(newValue: boolean | undefined): void;
        isActive: (newValue: boolean, oldValue: boolean) => void;
    };
    methods: {
        setOn(): void;
        setOff(): void;
        toggle(): void;
    };
}>;
