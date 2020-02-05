import './menu.sass';
import { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<{
    internalIsOn: boolean;
} & {
    setOn(): void;
    setOff(): void;
    toggle(): void;
} & {
    attrs: object;
    isActive: boolean;
    clickToggler: Record<"click", (e: Event) => void>;
    keyboardToggler: Record<"keydown", (e: KeyboardEvent) => void>;
    listeners: {
        [key: string]: Function | Function[];
    };
} & {
    [x: string]: any;
    isOn: boolean;
    hasPopup: boolean;
} & import("vue").default, unknown, {
    generateTrigger(): VNode;
    generateTriggerButton(): VNode;
    generateMenuList(): VNode;
}, unknown, {
    menuLabelClass: string;
    menuListClass: string;
}, {
    name: string;
    components: {
        VerticalExpansionIcon: import("vue/types/vue").OptionsVue<import("vue").default, unknown, unknown, unknown, {
            isExpanded: boolean;
        }, {
            name: string;
            functional: boolean;
            props: {
                isExpanded: {
                    type: BooleanConstructor;
                    required: true;
                };
            };
            render(h: import("vue").CreateElement, { data, props }: import("vue").RenderContext<{
                isExpanded: boolean;
            }>): VNode;
        }>;
        BMenuList: import("vue/types/vue").OptionsVue<import("vue").default, unknown, unknown, unknown, {
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
                themeMap: import("vue/types/options").PropValidator<import("../../types/ThemeColorMap").ThemeColorMap>;
                isThemeable: {
                    type: BooleanConstructor;
                    required: boolean;
                    default: boolean;
                };
            } | {
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
            render(h: import("vue").CreateElement, { data, props, injections, children }: import("vue").RenderContext<{
                themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
                isThemeable: boolean;
            }>): VNode;
        }>;
    };
    props: {
        menuLabelClass: {
            type: StringConstructor;
            required: false;
        };
        menuListClass: {
            type: StringConstructor;
            required: false;
        };
    };
    methods: {
        generateTrigger(): VNode;
        generateTriggerButton(): VNode;
        generateMenuList(): VNode;
    };
    render(): VNode;
}>;
export default _default;
