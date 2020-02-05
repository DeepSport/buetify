import { VNode } from 'vue';
export declare const Toggle: import("vue/types/vue").OptionsVue<{
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
} & import("vue").default, unknown, unknown, unknown, Record<never, any>, {
    name: string;
    render(): VNode;
}>;
