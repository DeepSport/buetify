import { constant, constVoid, FunctionN, Lazy } from 'fp-ts/lib/function';
import { PropType, shallowRef, watch, toRef, Ref } from 'vue';
import { exists, isObject } from '../../utils/helpers';

export function getUseModelPropsDefinition<T>(): {
	modelValue: {
		type: PropType<T>;
		required: false;
	};
	'onUpdate:modelValue': {
		type: PropType<FunctionN<[T], void>>;
		default: Lazy<FunctionN<[T], void>>;
	};
};
export function getUseModelPropsDefinition<T, ValueKey extends string, UpdateKey extends string>(
	valueKey: ValueKey,
	updateKey: UpdateKey
): {
	[K in ValueKey]: {
		type: PropType<T>;
		required: false;
	};
} &
	{
		[K in UpdateKey]: {
			type: PropType<FunctionN<[T], void>>;
			default: Lazy<FunctionN<[T], void>>;
		};
	};
export function getUseModelPropsDefinition<
	T,
	ValueKey extends string = 'modelValue',
	UpdateKey extends string = 'onUpdate:modelValue'
>(valueKey: ValueKey = 'modelValue' as ValueKey, updateKey: UpdateKey = 'onUpdate:modelValue' as UpdateKey): any { // eslint-disable-line
	return {
		[valueKey]: null,
		[updateKey]: {
			type: Function,
			default: constant(constVoid)
		}
	};
}

export type UseModelProps<
	T,
	ValueKey extends string = 'modelValue',
	UpdateKey extends string = 'onUpdate:modelValue'
> = { [K in ValueKey]?: T | undefined } & { [K in UpdateKey]: FunctionN<[T], void> };

export function useModel<T>(props: UseModelProps<T>): Model<T>;
export function useModel<T, ValueKey extends string, UpdateKey extends string>(
	props: UseModelProps<T, ValueKey, UpdateKey>,
	valueKey: ValueKey,
	updateKey: UpdateKey
): Model<T>;
export function useModel<T, ValueKey extends string = 'modelValue', UpdateKey extends string = 'onUpdate:modelValue'>(
	props: UseModelProps<T, ValueKey, UpdateKey>,
	valueKey: ValueKey = 'modelValue' as ValueKey,
	updateKey: UpdateKey = 'onUpdate:modelValue' as UpdateKey
): Model<T> {
	const internalValue: Ref<T | undefined> = shallowRef(props[valueKey]);
	watch(toRef(props, valueKey), newVal => {
		internalValue.value = newVal;
	});
	watch(internalValue, newVal => props[updateKey](newVal as T));

	function onUpdate(e: Event) {
		// eslint-disable-next-line
		// @ts-ignore-next-line
		if (isObject(e.target) && exists(e.target.value)) {
			// eslint-disable-next-line
			// @ts-ignore-next-line
			internalValue.value = e.target.value;
		}
	}
	function set(val: T) {
		internalValue.value = val;
	}
	return {
		modelValue: internalValue,
		set,
		onNativeInput: onUpdate
	};
}

export type Model<T> = {
	modelValue: Ref<T | undefined>;
	set: FunctionN<[T], void>;
	onNativeInput: FunctionN<[Event], void>;
};
