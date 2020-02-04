import {WindowSizeMixin} from '../../../mixins/windowSize/WindowSizeMixin';
import { applyMixins } from "../../../utils/applyMixins";
import Vue, { AsyncComponent, VNode } from "vue";
import { ExtendedVue } from "vue/types/vue";

export interface ComponentsByBreakPoint {
  mobile:
    | AsyncComponent<any, any, any, any>
    | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  tablet:
    | AsyncComponent<any, any, any, any>
    | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  desktop:
    | AsyncComponent<any, any, any, any>
    | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  widescreen:
    | AsyncComponent<any, any, any, any>
    | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
  fullHD:
    | AsyncComponent<any, any, any, any>
    | ExtendedVue<Vue, unknown, unknown, unknown, unknown>;
}

export const ScreenSizeDependentComponent = (
  components: ComponentsByBreakPoint
) =>
  applyMixins(WindowSizeMixin).extend({
    name: "DynamicWindowSizeComponent",
    computed: {
      component():
        | AsyncComponent<any, any, any, any>
        | ExtendedVue<Vue, unknown, unknown, unknown, unknown> {
        if (this.windowSize.isMobile) {
          return components.mobile;
        } else if (this.windowSize.isTablet) {
          return components.tablet;
        } else if (this.windowSize.isDesktop) {
          return components.desktop;
        } else if (this.windowSize.isWidescreen) {
          return components.widescreen;
        } else {
          return components.fullHD;
        }
      }
    },
    render(): VNode {
      return this.$createElement(this.component, {
        attrs: this.$attrs,
        on: this.$listeners
      });
    }
  });
