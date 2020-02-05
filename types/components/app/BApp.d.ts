import './app.sass';
import { IO } from 'fp-ts/lib/IO';
import { Option } from 'fp-ts/lib/Option';
import { VNode } from 'vue';
import { AppInjection, ModalInjection, NavigationInjection, NoticeInjection, ShowModalOptions, ShowNoticeOptions, ThemeInjection } from '../../types/AppInjection';
import { NoticePlacement } from '../../types/NoticePlacement';
import { Theme } from '../../types/Theme';
import { TransitionClasses } from '../../types/Transition';
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
    initialStatus: boolean;
    isOn: boolean;
    hasPopup: boolean;
} & import("vue").default, Data, {
    generateOverlayContainer(): VNode;
    generateTopNoticeContainer(): VNode;
    generateBottomNoticeContainer(): VNode;
    generatePopupContainer(popup: Popup, staticClass?: string | undefined): VNode;
    generateRenderNode(node: Option<VNode>): VNode[];
    setTheme(theme: Theme): void;
    persistTheme(newTheme: Theme): void;
    shouldQueueNotice(placement: NoticePlacement): boolean;
    showModal({ node, transition }: ShowModalOptions): IO<void>;
    removeTopNotice(): void;
    removeBottomNotice(): void;
    showNotice(params: ShowNoticeOptions): IO<void>;
}, {
    modalInjection: ModalInjection;
    noticeInjection: NoticeInjection;
    themeInjection: ThemeInjection;
    navigationInjection: NavigationInjection;
}, {
    initialStatus: boolean;
    isThemeable: boolean;
    storeTheme: boolean;
}, {
    name: string;
    inheritAttrs: false;
    components: {
        RenderVNode: import("vue/types/vue").OptionsVue<import("vue").default, unknown, unknown, unknown, {
            node: VNode;
        }, {
            name: string;
            functional: boolean;
            props: {
                node: {
                    type: import("vue").PropType<VNode>;
                    required: false;
                };
            };
            render(h: import("vue").CreateElement, { props }: import("vue").RenderContext<{
                node: VNode;
            }>): VNode;
        }>;
    };
    props: {
        initialStatus: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        isThemeable: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        storeTheme: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    data(this: import("vue/types/vue").CombinedVueInstance<{
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
        initialStatus: boolean;
        isOn: boolean;
        hasPopup: boolean;
    } & import("vue").default, unknown, unknown, unknown, Readonly<{
        initialStatus: boolean;
        isThemeable: boolean;
        storeTheme: boolean;
    }>>): Data;
    computed: {
        modalInjection(): ModalInjection;
        noticeInjection(): NoticeInjection;
        themeInjection(): ThemeInjection;
        navigationInjection(): NavigationInjection;
    };
    provide(): AppInjection;
    methods: {
        generateOverlayContainer(): VNode;
        generateTopNoticeContainer(): VNode;
        generateBottomNoticeContainer(): VNode;
        generatePopupContainer(popup: Popup, staticClass?: string | undefined): VNode;
        generateRenderNode(node: Option<VNode>): VNode[];
        setTheme(theme: Theme): void;
        persistTheme(newTheme: Theme): void;
        shouldQueueNotice(placement: NoticePlacement): boolean;
        showModal({ node, transition }: ShowModalOptions): IO<void>;
        removeTopNotice(): void;
        removeBottomNotice(): void;
        showNotice(params: ShowNoticeOptions): IO<void>;
    };
    render(): VNode;
}>;
export default _default;
interface Popup {
    transition: TransitionClasses;
    node: Option<VNode>;
}
interface Data {
    top: Popup;
    bottom: Popup;
    overlay: Popup;
    theme: Theme;
}
