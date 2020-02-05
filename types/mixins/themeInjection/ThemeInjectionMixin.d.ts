import { ThemeInjection } from '../../types/AppInjection';
import { Theme } from '../../types/Theme';
import Vue from 'vue';
export declare type ThemeColorMap = {
    [K in Theme]: string | string[];
};
export declare const DEFAULT_THEME_COLOR_MAP: ThemeColorMap;
interface options extends Vue {
    theme: ThemeInjection;
}
export declare function getThemeInjectionMixin(themeMap?: ThemeColorMap): import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    setTheme(theme: Theme): void;
    toggleTheme(): void;
}, {
    themeClasses: string[];
}, {
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
}, {
    props: {
        themeMap: import("vue/types/options").PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    };
    inject: {
        theme: {
            default: import("fp-ts/lib/function").Lazy<ThemeInjection>;
        };
    };
    computed: {
        themeClasses(): string[];
    };
    methods: {
        setTheme(theme: Theme): void;
        toggleTheme(): void;
    };
}>;
export declare const ThemeInjectionMixin: import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    setTheme(theme: Theme): void;
    toggleTheme(): void;
}, {
    themeClasses: string[];
}, {
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isThemeable: boolean;
}, {
    props: {
        themeMap: import("vue/types/options").PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
        isThemeable: {
            type: BooleanConstructor;
            required: boolean;
            default: boolean;
        };
    };
    inject: {
        theme: {
            default: import("fp-ts/lib/function").Lazy<ThemeInjection>;
        };
    };
    computed: {
        themeClasses(): string[];
    };
    methods: {
        setTheme(theme: Theme): void;
        toggleTheme(): void;
    };
}>;
export {};
