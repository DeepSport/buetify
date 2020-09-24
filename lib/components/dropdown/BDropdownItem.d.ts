import './dropdown.sass';
import { ThemeProps } from '../../composables/theme';
import { SetupContext } from 'vue';
interface BDropdownItemProps extends Partial<ThemeProps> {
    isActive?: boolean;
    tag?: string;
    isClickable?: boolean;
}
export default function BDropdownItem(props: BDropdownItemProps, { slots, attrs }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
export {};
