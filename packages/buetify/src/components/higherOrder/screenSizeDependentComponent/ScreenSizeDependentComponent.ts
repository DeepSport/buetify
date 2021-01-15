import { useWindowSize } from '../../../composables/windowSize';
import { h, FunctionalComponent, DefineComponent } from 'vue';

export interface ComponentsByBreakPoint<Props> {
  mobile: DefineComponent<Props>;
  tablet: DefineComponent<Props>;
  desktop: DefineComponent<Props>;
  widescreen: DefineComponent<Props>;
  fullHD: DefineComponent<Props>;
}

export const ScreenSizeDependentComponent = <Props>(
  components: ComponentsByBreakPoint<Props>
): FunctionalComponent<Props> => (props, context) => {
  const windowSize = useWindowSize().value;
  if (windowSize.isMobile) {
    return h(components.mobile, props, context.slots); 
  } else if (windowSize.isTablet) {
    return h(components.tablet, props, context.slots);
  } else if (windowSize.isDesktop) {
    return h(components.desktop, props, context.slots);
  } else if (windowSize.isWidescreen) {
    return h(components.widescreen, props, context.slots);
  } else {
    return h(components.fullHD, props, context.slots);
  }
};
