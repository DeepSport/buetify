import { Ref, isRef, computed, shallowRef } from 'vue'
import {Lazy} from 'fp-ts/lib/function';
import {isFunction} from './helpers';

export function toRef<T>(input: T | Ref<T> | Lazy<T>): Ref<T> {
	if (isRef(input)) {
		return input;
	} else if (isFunction(input)) {
		return computed(input as Lazy<T>)
	} else {
		return shallowRef(input);
	}
}
