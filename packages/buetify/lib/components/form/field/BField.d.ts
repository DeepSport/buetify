import '../sass/tools.sass';
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
    labelFor: PropType<string>;
    label: {
        type: PropType<string>;
        default: string;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type BFieldProps = ExtractPropTypes<typeof BFieldPropsDefinition>;
declare const BField: import("vue").DefineComponent<{
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
    labelFor: PropType<string>;
    label: {
        type: PropType<string>;
        default: string;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
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
    themeMap: import("../../..").ThemeColorMap;
    isExpanded: boolean;
    position: "is-left" | "is-right" | "is-centered";
    label: string;
    isGrouped: boolean;
    isGroupedMultiline: boolean;
    isHorizontal: boolean;
    hasAddons: boolean;
    customLabelClass: string;
} & {
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    message?: string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[] | undefined;
    labelFor?: string | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    isExpanded: boolean;
    position: "is-left" | "is-right" | "is-centered";
    label: string;
    isGrouped: boolean;
    isGroupedMultiline: boolean;
    isHorizontal: boolean;
    hasAddons: boolean;
    customLabelClass: string;
}>;
export interface BFieldBodyProps {
    message?: string;
    variant?: AllColorsVariant;
    tag?: string;
}
export default BField;
