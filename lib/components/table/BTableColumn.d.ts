import { FunctionN } from 'fp-ts/lib/function';
import { SetupContext } from 'vue';
import { BTableColumn, SortType } from './shared';
export interface BTableColumnProps {
    column: BTableColumn;
    sortType: SortType;
    onNewSortType: FunctionN<[SortType], void>;
    onNewSortColumn: FunctionN<[BTableColumn], void>;
}
export default function BTableColumn(props: BTableColumnProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
