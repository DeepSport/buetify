import Vue, { VNode } from 'vue';
export declare const WatchTimer: import("vue/types/vue").OptionsVue<Vue, Data, unknown, unknown, {
    itemToWatch: unknown;
    timerLength: number;
}, {
    name: string;
    props: {
        itemToWatch: {
            required: true;
        };
        timerLength: {
            type: NumberConstructor;
            required: false;
            default: number;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<{
        itemToWatch: unknown;
        timerLength: number;
    }>>): Data;
    watch: {
        itemToWatch: () => void;
    };
    render(): VNode;
}>;
interface Data {
    timerIsActive: boolean;
    item: any;
}
export {};
