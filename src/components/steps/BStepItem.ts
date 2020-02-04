import { ColorVariant } from "../../types/ColorVariants";
import { constant } from "fp-ts/lib/function";
import { none, Option, toUndefined } from "fp-ts/lib/Option";
import Vue, { VNode } from "vue";
import { PropValidator } from "vue/types/options";
import { ExtendedVue } from "vue/types/vue";

export const BStepItemName = "BStepItem" as const;

export interface BStepItemPropsData {
  label: string;
  variant?: ColorVariant;
  icon?: ExtendedVue<any, any, any, any, any>;
  isVisible?: boolean;
  isCompleted?: boolean;
  isClickable?: boolean;
  destroyOnHide?: boolean;
}

const DEFAULT_STEP_INJECTION = {
  activeLabel: none,
  destroyOnHide: false
};

interface options extends Vue {
  step: {
    activeLabel: Option<string>;
    destroyOnHide: boolean;
  };
}

export default Vue.extend<options>().extend({
  name: BStepItemName,
  props: {
    label: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: "is-primary"
    } as PropValidator<ColorVariant>,
    icon: Function,
    isClickable: {
      type: Boolean,
      default: false
    },
    isCompleted: {
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
  computed: {
    internalDestroyOnHide(): boolean {
      return this.destroyOnHide || this.step.destroyOnHide;
    },
    isActive(): boolean {
      return (
        this.isVisible && this.label === toUndefined(this.step.activeLabel)
      );
    }
  },
  inject: {
    step: {
      default: constant(DEFAULT_STEP_INJECTION)
    }
  },
  methods: {
    generateStepItem(): VNode {
      return this.$createElement(
        "section",
        {
          staticClass: "step-item",
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
      return this.isActive ? this.generateStepItem() : (undefined as any);
    } else {
      return this.generateStepItem();
    }
  }
});
