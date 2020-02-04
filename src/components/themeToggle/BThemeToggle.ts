import { VNode } from "vue";
import { AsyncComponent, Component, PropValidator } from "vue/types/options";
import BTooltip from "../tooltip/BTooltip";
import { applyMixins } from "../../utils/applyMixins";

import { ThemeInjectionMixin } from "../../mixins/themeInjection/ThemeInjectionMixin";

export default applyMixins(ThemeInjectionMixin).extend({
  name: "BThemeToggle",
  props: {
    icon: {
      type: Function,
      default: () => import("../icons/adjust/AdjustIcon")
    } as PropValidator<
      Component<any, any, any, any> | AsyncComponent<any, any, any, any>
    >
  },
  render(): VNode {
    return this.$createElement(
      BTooltip,
      { props: { tag: "button", label: "Toggle color theme" } },
      this.$scopedSlots.default
        ? this.$scopedSlots.default({ toggle: this.toggleTheme })
        : [
            this.$createElement(this.icon, {
              staticClass: "has-cursor-pointer",
              on: { click: this.toggleTheme }
            })
          ]
    );
  }
});
