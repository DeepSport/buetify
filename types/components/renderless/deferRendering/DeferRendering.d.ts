import Vue, { VNode } from 'vue';
export declare const DeferRendering: import("vue/types/vue").OptionsVue<Vue, {
    currentFrame: number;
}, {
    checkRenderingStatus(): void;
}, unknown, {
    frames: number;
}, {
    name: string;
    props: {
        frames: {
            type: NumberConstructor;
            required: true;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<{
        frames: number;
    }>>): {
        currentFrame: number;
    };
    mounted(): void;
    methods: {
        checkRenderingStatus(): void;
    };
    render(): VNode;
}>;
