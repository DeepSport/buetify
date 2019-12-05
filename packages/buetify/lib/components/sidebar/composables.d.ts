import { Option } from 'fp-ts/lib/Option';
import { Ref, ExtractPropTypes, PropType } from 'vue';
import { IO } from 'fp-ts/lib/IO';
import { ToggleAttrs, ToggleListeners } from '../../composables/toggle';
export interface SidebarController {
    isVisible: Ref<boolean>;
    attrs: Ref<Option<ToggleAttrs>>;
    listeners: Ref<Option<ToggleListeners>>;
    show: IO<void>;
    hide: IO<void>;
    toggle: IO<void>;
}
export declare const ProvideSidebarControllerPropsDefinition: {
    currentRoute: {
        required: boolean;
    };
    isVisible: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type ProvideNavigationDrawerControllerProps = ExtractPropTypes<typeof ProvideSidebarControllerPropsDefinition>;
export declare function useSidebarController(): SidebarController;
export declare function provideSidebarController(props: ProvideNavigationDrawerControllerProps): SidebarController;
