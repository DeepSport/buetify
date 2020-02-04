import './pricing-table.sass';
import BPricingPlanPrice from './BPricingPlanPrice';
import Vue, { VNode } from 'vue';

export default Vue.extend({
  name: 'BPricingTable',
  functional: true,
  components: {
    BPricingPlanPrice
  },
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    amount: {
      type: Number,
      required: false
    },
    interval: {
      type: String,
      required: false
    }
  },
  render(h, { props, slots }): VNode {
    const nodes: VNode[] = [];
    const extractedSlots = slots();
    if (extractedSlots.header) {
      nodes.push(h('div', { staticClass: 'plan-header' }, extractedSlots.header));
    }
    nodes.push(
      h('div', { staticClass: 'plan-pricing-container' }, extractedSlots.price || h(BPricingPlanPrice, { props }))
    );
    nodes.push(h('div', { staticClass: 'plan-items' }, extractedSlots.items));
    if (extractedSlots.footer) {
      nodes.push(h('div', { staticClass: 'plan-footer' }, extractedSlots.footer));
    }
    return h('section', { staticClass: 'pricing-plan', class: { 'is-active': props.isActive } }, nodes);
  }
});
