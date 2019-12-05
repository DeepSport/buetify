import { FunctionN } from 'fp-ts/lib/function';
import { Ref } from 'vue';
export declare function useProxy<T>(ref: Ref<T>, onUpdate?: Ref<FunctionN<[T], void> | undefined> | FunctionN<[T], void>): Proxy<T>;
export interface Proxy<T> {
    value: Ref<T>;
}
