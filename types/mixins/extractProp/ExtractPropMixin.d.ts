import Vue from 'vue';
declare type Result<T, P> = P extends keyof T ? T[P] : P extends (item: T) => any ? ReturnType<P> : T;
export declare type Extractor<T, P> = P extends keyof T ? P : (item: T) => any;
export declare const ExtractPropMixin: import("vue/types/vue").OptionsVue<Vue, unknown, {
    extractProp<T, P extends (item: T) => any>(extractor: Extractor<T, P>, item: T): Result<T, P>;
}, unknown, Record<never, any>, {
    name: string;
    methods: {
        extractProp<T, P extends (item: T) => any>(extractor: Extractor<T, P>, item: T): Result<T, P>;
    };
}>;
export {};
