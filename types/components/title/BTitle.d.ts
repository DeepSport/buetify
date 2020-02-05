import './title.sass';
declare const _default: import("vue/types/vue").OptionsVue<import("vue").default, unknown, unknown, unknown, {
    text: string;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
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
        themeMap: import("vue/types/options").PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
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
        themeMap: import("vue/types/options").PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
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
    render(h: import("vue").CreateElement, { data, props, injections, children }: any): import("vue").VNode;
}>;
export default _default;
