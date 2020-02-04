import "./pricing-table.sass";
import Vue, { VNode } from "vue";

export default Vue.extend({
  name: "BPricingTable",
  functional: true,
  props: {
    amount: {
      type: Number,
      required: true
    },
    interval: {
      type: String,
      required: true
    }
  },
  render(h, { props, slots }): VNode {
    return h("div", { staticClass: "plan-price" }, [
      h("span", { staticClass: "plan-price-amount" }, [
        h(
          "span",
          { staticClass: "plan-price-currency" },
          slots().currency || "$"
        ),
        `${props.amount}`
      ]),
      `/${props.interval}`
    ]);
  }
});
