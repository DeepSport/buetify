import { isFunction, isObject, isString } from '../../utils/helpers';
import Vue from 'vue';

export type Result<T, P> = P extends keyof T ? T[P] : P extends (item: T) => any ? ReturnType<P> : T;
export type Extractor<T, P> = P extends keyof T ? P : (item: T) => any;

export const ExtractPropMixin = Vue.extend({
  name: 'ExtractPropMixin',
  methods: {
    extractProp<T, P extends (item: T) => any | keyof T>(extractor: Extractor<T, P>, item: T): Result<T, P> {
      if (isFunction(extractor)) {
        return extractor(item);
      } else if (isObject(item) && isString(extractor) && item.hasOwnProperty(extractor)) {
        return prop(extractor as any, item);
      } else {
        return item as Result<T, P>;
      }
    }
  }
});

function prop<T extends object, K extends keyof T>(key: K, obj: T): T[K] {
  return obj[key];
}
