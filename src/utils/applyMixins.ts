//credit to vuetify
import { ComputedGetter, WritableComputedOptions } from '@vue/reactivity';
import {
  Component, ComponentOptions

} from '@vue/runtime-core';
import { defineComponent } from 'vue';

export function applyMixins<T extends ComponentOptions[]>(...args: T): ExtractVue<T> {
  return defineComponent({ mixins: args });
}

/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using applyMixins().extend()
 */
export type ExtractVue<T extends Component | Component[]> = T extends (infer U)[]
  ? UnionToIntersection<U>
  : T extends Component
  ? T
  : never;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
