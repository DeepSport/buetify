import { Classes } from '../../utils/mergeClasses';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    isExpandable: {
        type: BooleanConstructor;
        default: boolean;
    };
    menuLabelClass: {
        type: PropType<Classes>;
        default: string;
    };
    menuListClass: {
        type: PropType<Classes>;
        default: string;
    };
    onToggle: {
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hasPopup: boolean;
    isExpanded: boolean;
    isExpandable: boolean;
    menuLabelClass: Classes;
    menuListClass: Classes;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: import("fp-ts/lib/IO").IO<void> | undefined;
    onSetOff?: import("fp-ts/lib/IO").IO<void> | undefined;
}>, {
    hasPopup: boolean;
    isExpanded: boolean;
    isExpandable: boolean;
    menuLabelClass: Classes;
    menuListClass: Classes;
}>;
export default _default;
