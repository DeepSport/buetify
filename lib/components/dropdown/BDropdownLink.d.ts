import './dropdown.sass';
import { ThemeProps } from '../../composables/theme';
import { SetupContext } from 'vue';
interface BDropdownItemProps extends Partial<ThemeProps> {
    isActive?: boolean;
    href?: string;
    tag?: string;
}
export default function BDropdownItem(props: BDropdownItemProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
export {};
