import { PropType } from 'vue';
export declare function useCheckRadioPropsDefinition<T>(): {
    value: PropType<T>;
    nativeValue: PropType<unknown>;
    type: {
        type: PropType<string>;
    };
};
export declare function useCheckRadio<T>(): void;
