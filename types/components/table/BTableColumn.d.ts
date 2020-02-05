import Vue, { PropType, VNode } from 'vue';
import { BTableColumn, SortType } from './shared';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    column: BTableColumn<any>;
    sortType: SortType;
}, {
    name: string;
    functional: boolean;
    props: {
        column: {
            type: PropType<BTableColumn<any>>;
            required: true;
        };
        sortType: {
            type: PropType<SortType>;
            required: true;
        };
    };
    render(h: import("vue").CreateElement, { props, data }: import("vue").RenderContext<{
        column: BTableColumn<any>;
        sortType: SortType;
    }>): VNode;
}>;
export default _default;
