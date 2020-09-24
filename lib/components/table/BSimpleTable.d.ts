import './table.sass';
import { ThemeProps } from '../../composables/theme';
import { Classes } from '../../utils/mergeClasses';
import { SetupContext } from 'vue';
export interface BSimpleTableProps extends Partial<ThemeProps> {
    isLoading?: boolean;
    isScrollable?: boolean;
    tableClasses?: Classes;
}
export default function BSimpleTable(props: BSimpleTableProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
