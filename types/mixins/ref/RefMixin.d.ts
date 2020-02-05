import Vue from 'vue';
import { Option } from 'fp-ts/lib/Option';
export declare const RefMixin: import("vue/types/vue").OptionsVue<Vue, unknown, {
    getRefElement(ref: string): Option<HTMLElement>;
}, unknown, Record<never, any>, {
    name: string;
    methods: {
        getRefElement(ref: string): Option<HTMLElement>;
    };
}>;
