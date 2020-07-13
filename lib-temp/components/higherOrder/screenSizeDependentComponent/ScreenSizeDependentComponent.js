import { useWindowSize } from '../../../composables/windowSize';
import { h } from 'vue';
export const ScreenSizeDependentComponent = (components) => (props, context) => {
    const windowSize = useWindowSize();
    if (windowSize.value.isMobile) {
        return h(components.mobile, Object.assign(Object.assign({}, props), { slots: context.slots }));
    }
    else if (windowSize.value.isTablet) {
        return h(components.tablet, Object.assign(Object.assign({}, props), { slots: context.slots }));
    }
    else if (windowSize.value.isDesktop) {
        return h(components.desktop, Object.assign(Object.assign({}, props), { slots: context.slots }));
    }
    else if (windowSize.value.isWidescreen) {
        return h(components.widescreen, Object.assign(Object.assign({}, props), { slots: context.slots }));
    }
    else {
        return h(components.fullHD, Object.assign(Object.assign({}, props), { slots: context.slots }));
    }
};
//# sourceMappingURL=ScreenSizeDependentComponent.js.map