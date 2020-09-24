import './divider.sass';
import { ThemeColorMap } from '../../../types/ThemeColorMap';
import { SetupContext } from 'vue';
export interface BDividerProps {
    text?: string;
    tag?: string;
    themeMap?: ThemeColorMap;
    isThemeable?: boolean;
}
export default function BHorizontalDivider(props: BDividerProps, { attrs }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
