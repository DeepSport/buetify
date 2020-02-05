import { IO } from 'fp-ts/lib/IO';
import { ExtractVue } from '../../utils/applyMixins';
import { ModalInjection } from '../../types/AppInjection';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode } from 'vue';
declare const base: import("vue").VueConstructor<{
    regenerateSlot(name: string): VNode;
} & Record<never, any> & import("vue").default, Record<string, any>>;
interface options extends ExtractVue<typeof base> {
    modal: ModalInjection;
}
export declare const DisplayModalMixin: import("vue/types/vue").OptionsVue<options & import("vue").default, {
    removeModal: () => void;
}, {
    generateModal(): VNode;
}, {
    node: Option<VNode>;
    attachToApp: boolean;
}, {
    transition: string;
    isActive: boolean;
    onCancel: IO<void>;
}, {
    name: string;
    props: {
        transition: {
            type: StringConstructor;
            default: string;
        };
        isActive: {
            type: BooleanConstructor;
            required: true;
        };
        onCancel: {
            type: PropType<IO<void>>;
            required: false;
        };
    };
    inject: {
        modal: {
            default: import("fp-ts/lib/function").Lazy<ModalInjection>;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<options & import("vue").default, unknown, unknown, unknown, Readonly<{
        transition: string;
        isActive: boolean;
        onCancel: IO<void>;
    }>>): {
        removeModal: () => void;
    };
    computed: {
        node(): Option<VNode>;
        attachToApp(): boolean;
    };
    watch: {
        node: {
            handler(newValue: Option<VNode>): void;
            immediate: true;
        };
    };
    methods: {
        generateModal(): VNode;
    };
    beforeDestroy(): void;
    render(): any;
}>;
export {};
