import { Option } from 'fp-ts/lib/Option';
import { PropType, ExtractPropTypes, Component, Ref } from 'vue';
export declare const TABS_SYMBOL: unique symbol;
export declare const TAB_ITEM_NAME = "b-tab-item";
export declare const BTabItemPropsDefinition: {
    label: {
        type: PropType<string>;
        required: true;
    };
    icon: {
        type: PropType<Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    isDisabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    isVisible: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export declare type BTabItemProps = ExtractPropTypes<typeof BTabItemPropsDefinition>;
export interface TabInjection {
    activeLabel: Ref<Option<string>>;
    tabs: BTabItemProps[];
}
export declare const DEFAULT_TAB_INJECTION: TabInjection;
