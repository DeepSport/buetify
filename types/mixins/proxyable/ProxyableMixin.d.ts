import { VueConstructor } from 'vue';
import Vue from 'vue';
export declare type Proxyable<T extends string = 'value'> = VueConstructor<Vue & {
    internalLazyValue: unknown;
    internalValue: unknown;
} & Record<T, any>>;
export declare function getProxyableMixin<T extends string = 'value'>(prop?: T, event?: string, defaultValue?: any): Proxyable<T>;
export declare const ProxyableMixin: Proxyable<"value">;
