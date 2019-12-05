import 'bulma/sass/components/modal.sass';
import './dialog.sass';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType, VNode } from 'vue';
export declare const B_DIALOG_CONTENT_NAME = "b-dialog-content";
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<SizeVariant>;
        required: false;
    };
    cardClass: {
        type: PropType<string>;
        required: false;
    };
    asCard: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    asCard: boolean;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    cardClass?: string | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    asCard: boolean;
}>;
export default _default;
