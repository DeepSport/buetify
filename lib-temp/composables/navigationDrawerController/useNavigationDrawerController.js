import { inject } from 'vue';
import { DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION, NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL } from './provideNavigationDrawerController';
export function useNavigationDrawerController() {
    const injection = inject(NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL, DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION);
    return injection;
}
//# sourceMappingURL=useNavigationDrawerController.js.map