import '../sass/form.sass';
import { PropType, VNode, ExtractPropTypes } from 'vue';
import { AllColorsVariant } from '../../../types/ColorVariants';
export declare type FieldPosition = 'is-left' | 'is-centered' | 'is-right';
export declare const BFieldPropsDefinition: {
    isGrouped: {
        type: PropType<boolean>;
        default: boolean;
    };
    isGroupedMultiline: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<"is-left" | "is-right" | "is-centered">;
        default: string;
    };
    isHorizontal: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasAddons: {
        type: PropType<boolean>;
        default: boolean;
    };
    customLabelClass: {
        type: PropType<string>;
        default: string;
    };
    variant: {
        type: PropType<AllColorsVariant>;
        required: boolean;
    };
    message: {
        type: PropType<string | {
            [K: string]: boolean;
        } | (string | {
            [K: string]: boolean;
        })[]>;
        required: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    id: PropType<string>;
    label: {
        type: PropType<string>;
        default: string;
    };
    themeMap: {
        type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type BFieldProps = ExtractPropTypes<typeof BFieldPropsDefinition>;
declare const BField: (new () => import("vue").ComponentPublicInstance<{} & {
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    label?: string | undefined;
    id?: string | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    position?: string | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    isGrouped?: boolean | undefined;
    isGroupedMultiline?: boolean | undefined;
    isHorizontal?: boolean | undefined;
    hasAddons?: boolean | undefined;
    customLabelClass?: string | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    label?: string | undefined;
    id?: string | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    position?: string | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    isGrouped?: boolean | undefined;
    isGroupedMultiline?: boolean | undefined;
    isHorizontal?: boolean | undefined;
    hasAddons?: boolean | undefined;
    customLabelClass?: string | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    label: string;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: string;
    isGrouped: boolean;
    isGroupedMultiline: boolean;
    isHorizontal: boolean;
    hasAddons: boolean;
    customLabelClass: string;
} & {
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    id?: string | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isGrouped: {
            type: PropType<boolean>;
            default: boolean;
        };
        isGroupedMultiline: {
            type: PropType<boolean>;
            default: boolean;
        };
        position: {
            type: PropType<"is-left" | "is-right" | "is-centered">;
            default: string;
        };
        isHorizontal: {
            type: PropType<boolean>;
            default: boolean;
        };
        hasAddons: {
            type: PropType<boolean>;
            default: boolean;
        };
        customLabelClass: {
            type: PropType<string>;
            default: string;
        };
        variant: {
            type: PropType<AllColorsVariant>;
            required: boolean;
        };
        message: {
            type: PropType<string | {
                [K: string]: boolean;
            } | (string | {
                [K: string]: boolean;
            })[]>;
            required: boolean;
        };
        isExpanded: {
            type: PropType<boolean>;
            default: boolean;
        };
        id: PropType<string>;
        label: {
            type: PropType<string>;
            default: string;
        };
        themeMap: {
            type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
        };
        isThemeable: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    label: string;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: string;
    isGrouped: boolean;
    isGroupedMultiline: boolean;
    isHorizontal: boolean;
    hasAddons: boolean;
    customLabelClass: string;
} & {
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    id?: string | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    label: string;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: string;
    isGrouped: boolean;
    isGroupedMultiline: boolean;
    isHorizontal: boolean;
    hasAddons: boolean;
    customLabelClass: string;
} & {
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    id?: string | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    label: string;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: string;
    isGrouped: boolean;
    isGroupedMultiline: boolean;
    isHorizontal: boolean;
    hasAddons: boolean;
    customLabelClass: string;
} & {
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    id?: string | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export interface BFieldBodyProps {
    message?: string;
    variant?: AllColorsVariant;
    tag?: string;
}
export default BField;
