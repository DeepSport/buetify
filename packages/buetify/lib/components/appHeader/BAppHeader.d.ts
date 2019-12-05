import './app-header.sass';
import '../../sass/helpers/flex-helpers.sass';
import { SetupContext } from 'vue';
export default function (props: {
    tag?: string;
}, { slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
