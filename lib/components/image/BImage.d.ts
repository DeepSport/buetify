import 'bulma/sass/elements/image.sass';
import { Classes } from '../../utils/mergeClasses';
import { SetupContext } from 'vue';
export interface BImageProps {
    src: string;
    alt: string;
    isRounded?: boolean;
    imgClass?: Classes;
}
export default function BImage(props: BImageProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
