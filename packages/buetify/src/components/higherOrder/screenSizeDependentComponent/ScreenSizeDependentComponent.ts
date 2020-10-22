import { useWindowSize } from '../../../composables/windowSize';
import { SetupContext, h, ComponentOptions, FunctionalComponent } from 'vue';

export interface ComponentsByBreakPoint {
  mobile: ComponentOptions | FunctionalComponent;
  tablet: ComponentOptions | FunctionalComponent;
  desktop: ComponentOptions | FunctionalComponent;
  widescreen: ComponentOptions | FunctionalComponent;
  fullHD: ComponentOptions | FunctionalComponent;
}

export const ScreenSizeDependentComponent = (components: ComponentsByBreakPoint) => (
  props: any, // eslint-disable-line
  context: SetupContext
) => {
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
