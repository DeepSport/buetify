import { IO } from 'fp-ts/lib/IO';
import { Option } from 'fp-ts/lib/Option';
import { PropType, ExtractPropTypes, Component, VNode, Ref } from 'vue';
export declare const TABS_SYMBOL: unique symbol;
export interface BTabItemData {
    props: BTabItemProps;
    render: IO<VNode[]>;
}
export interface TabInjection {
    tabs: Ref<BTabItemData[]>;
    activeLabel: Ref<Option<string>>;
}
export declare const DEFAULT_TAB_INJECTION: TabInjection;
export declare const BTabItemPropsDefinition: {
    label: {
        type: PropType<string>;
        required: true;
    };
    icon: {
        type: PropType<Component>;
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
