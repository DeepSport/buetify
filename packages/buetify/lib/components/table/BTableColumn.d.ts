import { PropType } from 'vue';
import { BTableColumn } from './shared';
declare const _default: import("vue").DefineComponent<{
    column: {
        type: PropType<BTableColumn<import("./shared").BTableRow>>;
        required: true;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    column: BTableColumn<import("./shared").BTableRow>;
} & {}>, {}>;
export default _default;
