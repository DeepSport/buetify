import { Option } from 'fp-ts/lib/Option';
import { Ref, ExtractPropTypes, PropType } from 'vue';
import { IO } from 'fp-ts/lib/IO';
import { ToggleAttrs, ToggleListeners } from '../toggle';
export interface NavigationDrawerController {
    isVisible: Ref<Option<boolean>>;
    attrs: Ref<Option<ToggleAttrs>>;
    listeners: Ref<Option<ToggleListeners>>;
    show: IO<void>;
    hide: IO<void>;
    toggle: IO<void>;
}
export declare const NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL: unique symbol;
export declare const ProvideNavigationDrawerControllerPropsDefinition: {
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
export declare type ProvideNavigationDrawerControllerProps = ExtractPropTypes<typeof ProvideNavigationDrawerControllerPropsDefinition>;
export declare const DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION: NavigationDrawerController;
export declare function provideNavigationDrawerController(props: ProvideNavigationDrawerControllerProps): NavigationDrawerController;
