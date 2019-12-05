import { Option } from 'fp-ts/lib/Option';
import { Ref, PropType, ExtractPropTypes } from 'vue';
export interface WindowSize {
    windowWidth: number;
    isMobile: boolean;
    isTablet: boolean;
    isTouch: boolean;
    isDesktop: boolean;
    isWidescreen: boolean;
    isFullHD: boolean;
}
export interface WindowSizeInjection {
    windowSize: Ref<Option<WindowSize>>;
}
export declare const DEFAULT_WINDOW_SIZE_INJECTION: WindowSizeInjection;
export declare const DEFAULT_BREAK_POINTS: Ref<{
    mobile: number;
    tablet: number;
    desktop: number;
    widescreen: number;
    fullHD: number;
}>;
export declare type BreakPoints = typeof DEFAULT_BREAK_POINTS.value;
export declare const WINDOW_SIZE_SYMBOL: unique symbol;
export declare const ProvideWindowSizePropsDefinition: {
    breakPoints: {
        type: PropType<{
            mobile: number;
            tablet: number;
            desktop: number;
            widescreen: number;
            fullHD: number;
        }>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<{
            mobile: number;
            tablet: number;
            desktop: number;
            widescreen: number;
            fullHD: number;
        }>;
    };
};
export declare type ProvideWindowSizeProps = ExtractPropTypes<typeof ProvideWindowSizePropsDefinition>;
export declare function getWindowSize(): Ref<WindowSize>;
export declare function provideWindowSize(props: ProvideWindowSizeProps): {
    windowSize: Ref<WindowSize>;
};
