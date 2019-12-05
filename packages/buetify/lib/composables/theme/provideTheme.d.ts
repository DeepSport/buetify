import { Option } from 'fp-ts/lib/Option';
import { Ref, ExtractPropTypes, PropType } from 'vue';
export declare type ThemeVariant = 'dark' | 'light';
export interface ThemeInjection {
    isThemeable: Ref<boolean>;
    currentTheme: Ref<Option<ThemeVariant>>;
    setTheme: (theme: ThemeVariant) => void;
}
export declare const DEFAULT_THEME_INJECTION: ThemeInjection;
export declare const THEME_INJECTION_SYMBOL: unique symbol;
export declare const ProvideThemePropDefinitions: {
    isThemeable: {
        type: PropType<boolean>;
        default: boolean;
    };
    persistTheme: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export declare type ProvideThemeProps = ExtractPropTypes<typeof ProvideThemePropDefinitions>;
export declare function provideTheme(props: ProvideThemeProps): {
    setTheme: (newTheme: ThemeVariant) => void;
    currentTheme: Ref<import("fp-ts/lib/Option").None> | Ref<import("fp-ts/lib/Option").Some<ThemeVariant>>;
    isThemeable: Ref<boolean>;
};
