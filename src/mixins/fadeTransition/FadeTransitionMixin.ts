import { constant } from "fp-ts/lib/function";
import Vue from "vue";
import { PropValidator } from "vue/types/options";
import { Transition, TransitionClasses } from "../../types/Transition";

export type TransitionMode = "in-out" | "out-in";

export function getTransitionMixin(transition: Transition) {
  return Vue.extend({
    name: "FadeTransitionMixin",
    props: {
      transition: {
        type: [String, Object],
        default: constant(transition)
      } as PropValidator<Transition>,
      mode: {
        type: String,
        default: undefined
      } as PropValidator<TransitionMode | undefined>
    },
    computed: {
      formattedTransition(): TransitionClasses {
        return formatTransition(this.transition);
      }
    }
  });
}

export const FadeTransitionMixin = getTransitionMixin("fade");

export function formatTransition(transition: Transition): TransitionClasses {
  return typeof transition === "string"
    ? { name: transition, css: true }
    : transition;
}
