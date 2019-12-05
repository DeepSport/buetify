import "../../../src/components/pricingTable/pricing-table.sass";
import BPricingPlanPrice from './BPricingPlanPrice';
import { h } from 'vue';
export default function BPricingPlan(props, {
  attrs,
  slots
}) {
  const nodes = [];

  if (slots.header) {
    nodes.push(h('div', {
      class: 'plan-header'
    }, slots.header()));
  }

  nodes.push(h('div', {
    class: 'plan-pricing-container'
  }, slots.price ? slots.price(props) : h(BPricingPlanPrice, props)));
  nodes.push(h('div', {
    class: 'plan-items'
  }, slots.items && slots.items()));

  if (slots.footer) {
    nodes.push(h('div', {
      class: 'plan-footer'
    }, slots.footer()));
  }

  return h('section', { ...attrs,
    class: ['pricing-plan', {
      'is-active': !!props.isActive
    }]
  }, nodes);
}
//# sourceMappingURL=BPricingPlan.js.map