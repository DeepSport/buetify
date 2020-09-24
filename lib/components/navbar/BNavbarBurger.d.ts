import 'bulma/sass/components/navbar.sass';
import { SetupContext } from 'vue';
export interface BNavbarBurgerProps {
    tag?: string;
    isActive?: boolean;
}
export default function BNavbarBurger(props: BNavbarBurgerProps, { attrs }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
