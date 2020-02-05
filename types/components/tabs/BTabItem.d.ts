import './tabs.sass';
import { Option } from 'fp-ts/lib/Option';
import Vue, { VNode } from 'vue';
import { ExtendedVue } from 'vue/types/vue';
export declare const BTabItemName: "BTabItem";
export interface BTabItemPropsData {
    label: string;
    icon?: ExtendedVue<any, any, any, any, any>;
    isDisabled?: boolean;
    isVisible?: boolean;
    destroyOnHide?: boolean;
}
interface options extends Vue {
    tab: {
        activeLabel: Option<string>;
        destroyOnHide: boolean;
    };
}
declare const _default: import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    generateTabItem(): VNode;
}, {
    internalDestroyOnHide: boolean;
    isActive: boolean;
}, {
    label: string;
    icon: Function;
    isDisabled: boolean;
    isVisible: boolean;
    destroyOnHide: boolean;
}, {
    name: "BTabItem";
    props: {
        label: {
            type: StringConstructor;
            required: true;
        };
        icon: FunctionConstructor;
        isDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        isVisible: {
            type: BooleanConstructor;
            default: boolean;
        };
        destroyOnHide: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    inject: {
        tab: {
            default: import("fp-ts/lib/function").Lazy<{
                activeLabel: Option<never>;
                destroyOnHide: boolean;
            }>;
        };
    };
    computed: {
        internalDestroyOnHide(): boolean;
        isActive(): boolean;
    };
    methods: {
        generateTabItem(): VNode;
    };
    render(): VNode;
}>;
export default _default;
