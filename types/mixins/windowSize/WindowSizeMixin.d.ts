import Vue from 'vue';
export declare const WindowSizeMixin: import("vue/types/vue").OptionsVue<Vue, Data, unknown, {
    windowSize: WindowSize;
}, Record<never, any>, {
    data(this: import("vue/types/vue").CombinedVueInstance<Vue, unknown, unknown, unknown, Readonly<Record<never, any>>>): Data;
    computed: {
        windowSize(): WindowSize;
    };
    mounted(): void;
}>;
interface Data {
    windowWidth: number;
}
export interface WindowSize {
    windowWidth: number;
    isMobile: boolean;
    isTablet: boolean;
    isTouch: boolean;
    isDesktop: boolean;
    isWidescreen: boolean;
    isFullHD: boolean;
}
export declare const BREAK_POINTS: {
    mobile: number;
    tablet: number;
    desktop: number;
    widescreen: number;
    fullHD: number;
};
export {};
