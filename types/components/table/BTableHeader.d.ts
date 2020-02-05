import { ColorVariant } from '../../types/ColorVariants';
import { BTableColumn as BTableColumnInterface, SortType } from './shared';
import Vue, { PropType, VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    columns: BTableColumnInterface<any>[];
    isCheckable: boolean;
    isDisabled: boolean;
    isChecked: boolean;
    sortType: SortType;
    checkboxVariant: string;
}, {
    name: string;
    functional: boolean;
    props: {
        columns: {
            type: PropType<BTableColumnInterface<any>[]>;
            required: true;
        };
        isCheckable: {
            type: BooleanConstructor;
            required: true;
        };
        isDisabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        isChecked: {
            type: BooleanConstructor;
            required: true;
        };
        sortType: {
            type: PropType<SortType>;
            required: true;
        };
        checkboxVariant: {
            type: (new (...args: string[]) => Function) | (() => ColorVariant) | (new (...args: never[]) => never) | import("vue/types/options").Prop<ColorVariant>[];
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { props, slots, listeners, data }: import("vue").RenderContext<{
        columns: BTableColumnInterface<any>[];
        isCheckable: boolean;
        isDisabled: boolean;
        isChecked: boolean;
        sortType: SortType;
        checkboxVariant: string;
    }>): VNode;
}>;
export default _default;
