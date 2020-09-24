import { PropType, ExtractPropTypes } from 'vue';
import { ThemeColorMap } from '../../types/ThemeColorMap';
import { ThemeInjection } from './provideTheme';
export declare const DEFAULT_THEME_COLOR_MAP: ThemeColorMap;
export declare function getUseThemePropsDefinition(themeMap: ThemeColorMap, defaultIsThemeable?: boolean): {
    themeMap: {
        type: PropType<ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type ThemeProps = ExtractPropTypes<ReturnType<typeof getUseThemePropsDefinition>>;
export declare type FunctionalThemeProps = Partial<ThemeProps>;
export declare const DefaultThemePropsDefinition: {
    themeMap: {
        type: PropType<ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare function getThemeClasses(themeMap: ThemeColorMap, themeInjection: ThemeInjection): string[];
export declare function useTheme(props?: ThemeProps): {
    currentTheme: import("vue").Ref<import("fp-ts/lib/Option").Option<import("./provideTheme").Theme>>;
    setTheme: (theme: import("./provideTheme").Theme) => void;
    toggleTheme: () => void;
    themeClasses: import("vue").ComputedRef<string[]>;
};
