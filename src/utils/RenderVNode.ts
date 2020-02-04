import Vue, { PropType, VNode } from "vue";

export const RenderVNode = Vue.extend({
  name: "RenderVNode",
  functional: true,
  props: {
    node: {
      type: Object as PropType<VNode>,
      required: false
    }
  },
  render(h, { props }): VNode {
    return props.node;
  }
});
