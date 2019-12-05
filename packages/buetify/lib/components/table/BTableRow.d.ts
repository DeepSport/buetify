import { FunctionN } from 'fp-ts/lib/function';
import { BTableRow } from './shared';
import { VNode, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    index: {
        type: PropType<number>;
        required: true;
    };
    row: {
        type: PropType<BTableRow>;
        required: true;
    };
    onRowClick: {
        type: PropType<FunctionN<[BTableRow, MouseEvent], void>>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    index: number;
    row: BTableRow;
} & {
    onRowClick?: FunctionN<[BTableRow, MouseEvent], void> | undefined;
}>, {}>;
export default _default;
