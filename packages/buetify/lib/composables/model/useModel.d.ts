import { FunctionN, Lazy } from 'fp-ts/lib/function';
import { PropType, Ref } from 'vue';
export declare function getUseModelPropsDefinition<T>(): {
    modelValue: {
        type: PropType<T>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[T], void>>;
        default: Lazy<FunctionN<[T], void>>;
    };
};
export declare function getUseModelPropsDefinition<T, ValueKey extends string, UpdateKey extends string>(valueKey: ValueKey, updateKey: UpdateKey): {
    [K in ValueKey]: {
        type: PropType<T>;
        required: false;
    };
} & {
    [K in UpdateKey]: {
        type: PropType<FunctionN<[T], void>>;
        default: Lazy<FunctionN<[T], void>>;
    };
};
export declare type UseModelProps<T, ValueKey extends string = 'modelValue', UpdateKey extends string = 'onUpdate:modelValue'> = {
    [K in ValueKey]?: T | undefined;
} & {
    [K in UpdateKey]: FunctionN<[T], void>;
};
export declare function useModel<T>(props: UseModelProps<T>): Model<T>;
export declare function useModel<T, ValueKey extends string, UpdateKey extends string>(props: UseModelProps<T, ValueKey, UpdateKey>, valueKey: ValueKey, updateKey: UpdateKey): Model<T>;
export declare type Model<T> = {
    set: FunctionN<[T], void>;
    modelValue: Ref<T | undefined>;
    onNativeInput: FunctionN<[Event], void>;
};
