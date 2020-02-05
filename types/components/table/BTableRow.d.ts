import { ColorVariant } from '../../types/ColorVariants';
import { BTableColumn, BTableRow } from './shared';
import Vue, { PropType, VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    columns: BTableColumn<any>[];
    row: BTableRow;
    checkboxVariant: string;
}, {
    name: string;
    functional: boolean;
    props: {
        columns: {
            type: PropType<BTableColumn<any>[]>;
            required: true;
        };
        row: {
            type: PropType<BTableRow>;
            required: true;
        };
        checkboxVariant: {
            type: (new (...args: string[]) => Function) | (() => ColorVariant) | (new (...args: never[]) => never) | import("vue/types/options").Prop<ColorVariant>[];
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { props, slots, listeners, data }: import("vue").RenderContext<{
        columns: BTableColumn<any>[];
        row: BTableRow;
        checkboxVariant: string;
    }>): VNode;
}>;
export default _default;
