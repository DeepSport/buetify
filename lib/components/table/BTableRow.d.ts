import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { BTableColumn, BTableRow } from './shared';
import { SetupContext, VNode } from 'vue';
interface BTableRowProps {
    columns: BTableColumn[];
    row: BTableRow;
    checkboxVariant?: ColorVariant;
    onInput?: FunctionN<[boolean], void>;
}
export default function BTableRow(props: BTableRowProps, { attrs, slots }: SetupContext): VNode<import("vue").RendererNode, import("vue").RendererElement>;
export {};
