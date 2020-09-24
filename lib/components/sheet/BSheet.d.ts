import './sheet.sass';
import { SetupContext } from 'vue';
import { ThemeProps } from '../../composables/theme';
export interface BSheetProps extends Partial<ThemeProps> {
    tag?: string;
    isLoading?: boolean;
}
export default function BSheet(props: BSheetProps, { slots, attrs }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
