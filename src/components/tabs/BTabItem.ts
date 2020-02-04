import "./tabs.sass";
import { constant } from "fp-ts/lib/function";
import { none, Option, toUndefined } from "fp-ts/lib/Option";
import Vue, { VNode } from "vue";
import { ExtendedVue } from "vue/types/vue";

export const BTabItemName = "BTabItem" as const;

export interface BTabItemPropsData {
  label: string;
  icon?: ExtendedVue<any, any, any, any, any>;
  isDisabled?: boolean;
  isVisible?: boolean;
  destroyOnHide?: boolean;
}

const DEFAULT_TAB_INJECTION = {
  activeLabel: none,
  destroyOnHide: false
};

interface options extends Vue {
  tab: {
    activeLabel: Option<string>;
    destroyOnHide: boolean;
  };
}

export default Vue.extend<options>().extend({
  name: BTabItemName,
  props: {
    label: {
      type: String,
      required: true
    },
    icon: Function,
    isDisabled: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    destroyOnHide: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    tab: {
      default: constant(DEFAULT_TAB_INJECTION)
    }
  },
  computed: {
    internalDestroyOnHide(): boolean {
      return this.destroyOnHide || this.tab.destroyOnHide;
    },
    isActive(): boolean {
      return this.isVisible && this.label === toUndefined(this.tab.activeLabel);
    }
  },
  methods: {
    generateTabItem(): VNode {
      return this.$createElement(
        "section",
        {
          key: this.label,
          staticClass: "tab-item",
          attrs: { "aria-label": this.label },
          directives: this.internalDestroyOnHide
            ? []
            : [{ name: "show", value: this.isActive }]
        },
        this.$scopedSlots.default!({ isActive: this.isActive })
      );
    }
  },
  render(): VNode {
    if (this.internalDestroyOnHide) {
      return this.isActive ? this.generateTabItem() : (undefined as any);
    } else {
      return this.generateTabItem();
    }
  }
});
