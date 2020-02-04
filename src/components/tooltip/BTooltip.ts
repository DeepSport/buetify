import "./tooltip.sass";
import { ColorVariant } from "../../types/ColorVariants";
import { SizeVariant } from "../../types/SizeVariants";
import { mergeVNodeClasses } from "../../utils/mergeVNodeClasses";
import Vue, { VNode } from "vue";
import { PropValidator } from "vue/types/options";

export default Vue.extend({
  name: "BTooltip",
  functional: true,
  props: {
    isActive: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: "is-primary"
    } as PropValidator<ColorVariant>,
    label: String,
    position: {
      type: String,
      default: "is-top",
      validator(value) {
        return ["is-top", "is-bottom", "is-left", "is-right"].includes(value);
      }
    } as PropValidator<TooltipPosition>,
    isAlways: Boolean,
    isAnimated: {
      type: Boolean,
      default: false
    },
    isSquare: Boolean,
    isDashed: Boolean,
    isMultilined: Boolean,
    size: {
      type: String,
      default: "is-medium"
    } as PropValidator<SizeVariant>,
    tag: {
      type: String,
      required: false,
      default: "span"
    }
  },
  render(h, { data, props, children }): VNode {
    data.class = mergeVNodeClasses(data.class, getTooltipClasses(props));
    data.attrs = { ...data.attrs, "data-label": props.label };
    return h(props.tag, data, children);
  }
});

export type TooltipPosition = "is-top" | "is-bottom" | "is-left" | "is-right";

interface TooltipProps {
  isActive: boolean;
  variant: ColorVariant;
  label: string;
  position: TooltipPosition;
  isAlways: boolean;
  isAnimated: boolean;
  isSquare: boolean;
  isDashed: boolean;
  isMultilined: boolean;
  size: SizeVariant;
}

function getTooltipClasses(props: TooltipProps) {
  return [
    props.variant,
    props.size,
    props.position,
    {
      "b-tooltip": props.isActive,
      "is-always": props.isAlways,
      "is-animated": props.isAnimated,
      "is-square": props.isSquare,
      "is-dashed": props.isDashed,
      "is-multilined": props.isMultilined
    }
  ];
}
