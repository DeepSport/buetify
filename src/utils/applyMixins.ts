//credit to vuetify
import Vue, { VueConstructor } from 'vue';

export function applyMixins<T extends VueConstructor[]>(
  ...args: T
): ExtractVue<T> extends infer V ? (V extends Vue ? VueConstructor<V> : never) : never;
export function applyMixins<T extends Vue>(...args: VueConstructor[]): VueConstructor<T>;
export function applyMixins(...args: VueConstructor[]): VueConstructor {
  return Vue.extend({ mixins: args });
}

/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using applyMixins().extend()
 */
export type ExtractVue<T extends VueConstructor | VueConstructor[]> = T extends (infer U)[]
  ? UnionToIntersection<U extends VueConstructor<infer V> ? V : never>
  : T extends VueConstructor<infer V>
  ? V
  : never;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
