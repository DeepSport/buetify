import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { BTableColumn as BTableColumnInterface, SortType } from './shared';
import { SetupContext } from 'vue';
export interface BTableHeaderProps {
    columns: BTableColumnInterface[];
    isCheckable: boolean;
    isDisabled?: boolean;
    isChecked: boolean;
    sortType: SortType;
    checkboxVariant?: ColorVariant;
    onNewSortType: FunctionN<[SortType], void>;
    onNewSortColumn: FunctionN<[BTableColumnInterface], void>;
    onInput?: FunctionN<[boolean], void>;
}
export default function BTableHeader(props: BTableHeaderProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
