import { PropType, ExtractPropTypes } from 'vue';
export declare const UseLabelIdPropsDefinition: {
    id: PropType<string>;
    label: {
        type: PropType<string>;
        default: string;
    };
};
export declare type UseLabelIdProps = ExtractPropTypes<typeof UseLabelIdPropsDefinition>;
export declare function useLabelId(props: UseLabelIdProps, prefix: string): {
    id: import("vue").ComputedRef<string>;
    labelId: import("vue").ComputedRef<string>;
    label: import("vue").Ref<string>;
};
