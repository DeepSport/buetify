import './link.sass';
import { FunctionalThemeProps } from '../../composables/theme';
import { SetupContext } from 'vue';
export interface BLinkProps extends FunctionalThemeProps {
    href?: string;
    tag?: string;
    isDisabled?: boolean;
}
export default function BLink(props: BLinkProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
