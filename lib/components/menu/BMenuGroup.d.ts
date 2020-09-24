import './menu.sass';
import { Classes } from '../../utils/mergeClasses';
import { PropType } from 'vue';
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
    menuLabelClass?: Classes;
    menuListClass?: Classes;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
    menuLabelClass?: Classes;
    menuListClass?: Classes;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    hasPopup: boolean;
    isExpanded: boolean;
    menuLabelClass: Classes;
    menuListClass: Classes;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        menuLabelClass: {
            type: PropType<Classes>;
            default: string;
        };
        menuListClass: {
            type: PropType<Classes>;
            default: string;
        };
        isExpanded: {
            type: PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    hasPopup: boolean;
    isExpanded: boolean;
    menuLabelClass: Classes;
    menuListClass: Classes;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    hasPopup: boolean;
    isExpanded: boolean;
    menuLabelClass: Classes;
    menuListClass: Classes;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    hasPopup: boolean;
    isExpanded: boolean;
    menuLabelClass: Classes;
    menuListClass: Classes;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
