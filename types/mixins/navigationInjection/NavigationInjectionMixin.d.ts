import Vue from 'vue';
import { NavigationInjection } from '../../types/AppInjection';
interface options extends Vue {
    navigation: NavigationInjection;
}
export declare const NavigationInjectionMixin: import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    showNavigationDrawer(): void;
    hideNavigationDrawer(): void;
    toggleNavigationDrawer(): void;
}, {
    navigationDrawerIsVisible: boolean;
}, Record<never, any>, {
    inject: {
        navigation: {
            default: import("fp-ts/lib/function").Lazy<NavigationInjection>;
        };
    };
    computed: {
        navigationDrawerIsVisible(): boolean;
    };
    methods: {
        showNavigationDrawer(): void;
        hideNavigationDrawer(): void;
        toggleNavigationDrawer(): void;
    };
}>;
export {};
