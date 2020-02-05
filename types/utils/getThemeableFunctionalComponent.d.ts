import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
import { ThemeInjection } from '../types/AppInjection';
import { ThemeColorMap } from '../types/ThemeColorMap';
export declare function getThemeProps(themeMap: ThemeColorMap, defaultIsThemeable?: boolean): {
    themeMap: PropValidator<ThemeColorMap>;
    isThemeable: {
        type: BooleanConstructor;
        required: boolean;
        default: boolean;
    };
};
export declare const THEME_INJECTION: {
    theme: {
        default: undefined;
    };
};
export declare const getThemeableFunctionalComponent: (cls: string, name: string, el?: string, themeMap?: ThemeColorMap, defaultEl?: string) => import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    themeMap: ThemeColorMap;
    isThemeable: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        themeMap: PropValidator<ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    } | {
        themeMap: PropValidator<ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    };
    inject: {
        theme: {
            default: undefined;
        };
    };
    render(h: import("vue").CreateElement, { data, props, injections, children }: import("vue").RenderContext<{
        themeMap: ThemeColorMap;
        isThemeable: boolean;
    }>): VNode;
}>;
export declare function getThemeClasses(themeMap: ThemeColorMap, themeInjection?: ThemeInjection): string[];
interface ThemeContext {
    props: {
        isThemeable?: boolean;
        themeMap?: ThemeColorMap;
    };
    data: {
        class?: any;
    };
    injections: {
        theme?: ThemeInjection;
    };
}
export declare function isThemeable(context: ThemeContext): boolean;
export declare function getThemeClassesFromContext(context: ThemeContext): any;
export declare const getThemeableFunctionalComponentWithText: (cls: string, name: string, el?: string, themeMap?: ThemeColorMap, defaultEl?: string) => import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    text: string;
    themeMap: ThemeColorMap;
    isThemeable: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        text: {
            type: StringConstructor;
            required: false;
        };
        themeMap: PropValidator<ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    } | {
        text: {
            type: StringConstructor;
            required: false;
        };
        themeMap: PropValidator<ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    };
    inject: {
        theme: {
            default: undefined;
        };
    };
    render(h: import("vue").CreateElement, { data, props, injections, children }: any): VNode;
}>;
export {};
