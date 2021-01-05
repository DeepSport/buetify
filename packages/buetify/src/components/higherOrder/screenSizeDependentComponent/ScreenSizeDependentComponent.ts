import { useWindowSize } from '../../../composables/windowSize';
import { SetupContext, h, FunctionalComponent, DefineComponent } from 'vue';

export interface ComponentsByBreakPoint<Props = {}> {
  mobile: DefineComponent<Props> | FunctionalComponent<Props>;
  tablet: DefineComponent<Props> | FunctionalComponent<Props>;
  desktop: DefineComponent<Props> | FunctionalComponent<Props>;
  widescreen: DefineComponent<Props> | FunctionalComponent<Props>;
  fullHD: DefineComponent<Props> | FunctionalComponent<Props>;
}

export const ScreenSizeDependentComponent = <Props = {}>(components: ComponentsByBreakPoint) => (
  props: Props,
  context: SetupContext
) => {
  const windowSize = useWindowSize().value;
  if (windowSize.isMobile) {
    return h(components.mobile, props as any, context.slots); // eslint-disable-line
  } else if (windowSize.isTablet) {
    return h(components.tablet, props as any, context.slots); // eslint-disable-line
  } else if (windowSize.isDesktop) {
    return h(components.desktop, props as any, context.slots); // eslint-disable-line
  } else if (windowSize.isWidescreen) {
    return h(components.widescreen, props as any, context.slots); // eslint-disable-line
  } else {
    return h(components.fullHD, props as any, context.slots); // eslint-disable-line
  }
};
