import { useWindowSize } from '../../../composables/windowSize';
import { h } from 'vue';
export const ScreenSizeDependentComponent = components => (props, context) => {
  const windowSize = useWindowSize();

  if (windowSize.value.isMobile) {
    return h(components.mobile, props, context.slots);
  } else if (windowSize.value.isTablet) {
    return h(components.tablet, props, context.slots);
  } else if (windowSize.value.isDesktop) {
    return h(components.desktop, props, context.slots);
  } else if (windowSize.value.isWidescreen) {
    return h(components.widescreen, props, context.slots);
  } else {
    return h(components.fullHD, props, context.slots);
  }
};
//# sourceMappingURL=ScreenSizeDependentComponent.js.map