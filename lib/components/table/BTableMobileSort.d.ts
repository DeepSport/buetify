import './table.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { BTableColumn, SortType } from './shared';
import { Option } from 'fp-ts/lib/Option';
import { VNode } from 'vue';
export interface BTableMobileSortProps {
    sortColumn: Option<BTableColumn>;
    sortType: SortType;
    columns: BTableColumn[];
    onNewSortColumn: FunctionN<[BTableColumn], void>;
    onNewSortType: FunctionN<[SortType], void>;
    placeholder?: string;
}
export default function BTableMobileSort(props: BTableMobileSortProps): VNode<import("vue").RendererNode, import("vue").RendererElement>;
