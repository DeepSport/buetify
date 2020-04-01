import { WINDOW_SIZE_INJECTION } from '../../../mixins/windowSize/WindowSizeMixin';
import Vue, { AsyncComponent, VNode } from 'vue';
import { ExtendedVue } from 'vue/types/vue';

export interface ComponentsByBreakPoint {
  mobile: AsyncComponent<any, any, any, any> | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  tablet: AsyncComponent<any, any, any, any> | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  desktop: AsyncComponent<any, any, any, any> | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  widescreen: AsyncComponent<any, any, any, any> | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  fullHD: AsyncComponent<any, any, any, any> | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
}

export const ScreenSizeDependentComponent = (components: ComponentsByBreakPoint) =>
  Vue.extend({
    name: 'DynamicWindowSizeComponent',
    functional: true,
    inject: {
      ...WINDOW_SIZE_INJECTION
    },
    render(h, { data, injections, children }): VNode {
      const windowSize = injections.windowSize;
      if (windowSize.isMobile) {
        return h(components.mobile, data, children);
      } else if (windowSize.isTablet) {
        return h(components.tablet, data, children);
      } else if (windowSize.isDesktop) {
        return h(components.desktop, data, children);
      } else if (windowSize.isWidescreen) {
        return h(components.widescreen, data, children);
      } else {
        return h(components.fullHD, data, children);
      }
    }
  });
