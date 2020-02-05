import { ColorVariant } from '../../types/ColorVariants';
import { Option } from 'fp-ts/lib/Option';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { ExtendedVue } from 'vue/types/vue';
export declare const BStepItemName: "BStepItem";
export interface BStepItemPropsData {
    label: string;
    variant?: ColorVariant;
    icon?: ExtendedVue<any, any, any, any, any>;
    isVisible?: boolean;
    isCompleted?: boolean;
    isClickable?: boolean;
    destroyOnHide?: boolean;
}
interface options extends Vue {
    step: {
        activeLabel: Option<string>;
        destroyOnHide: boolean;
    };
}
declare const _default: import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    generateStepItem(): VNode;
}, {
    internalDestroyOnHide: boolean;
    isActive: boolean;
}, {
    label: string;
    variant: ColorVariant;
    icon: Function;
    isClickable: boolean;
    isCompleted: boolean;
    isVisible: boolean;
    destroyOnHide: boolean;
}, {
    name: "BStepItem";
    props: {
        label: {
            type: StringConstructor;
            required: true;
        };
        variant: PropValidator<ColorVariant>;
        icon: FunctionConstructor;
        isClickable: {
            type: BooleanConstructor;
            default: boolean;
        };
        isCompleted: {
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
    computed: {
        internalDestroyOnHide(): boolean;
        isActive(): boolean;
    };
    inject: {
        step: {
            default: import("fp-ts/lib/function").Lazy<{
                activeLabel: Option<never>;
                destroyOnHide: boolean;
            }>;
        };
    };
    methods: {
        generateStepItem(): VNode;
    };
    render(): VNode;
}>;
export default _default;
