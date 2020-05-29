import { defineAsyncComponent } from 'vue';
export const DEFAULT_INPUT_ICONS = {
    isSuccess: defineAsyncComponent(() => import('../../icons/check')),
    isDanger: defineAsyncComponent(() => import('../../icons/exclamationCircle')),
    isInfo: defineAsyncComponent(() => import('../../icons/infoCircle')),
    isWarning: defineAsyncComponent(() => import('../../icons/exclamationTriangle')),
    passwordInvisible: defineAsyncComponent(() => import('../../icons/eye')),
    passwordVisible: defineAsyncComponent(() => import('../../icons/eyeSlash'))
};
export function getInputIcons(icons) {
    return {
        ...DEFAULT_INPUT_ICONS,
        ...icons
    };
}
export const DEFAULT_NUMBER_INPUT_ICONS = {
    minus: defineAsyncComponent(() => import('../../icons/minus')),
    plus: defineAsyncComponent(() => import('../../icons/plus'))
};
export function getNumberInputIcons(icons) {
    return {
        ...DEFAULT_NUMBER_INPUT_ICONS,
        ...icons
    };
}
//# sourceMappingURL=types.js.map