import './pricing-table.sass';
import BPricingPlanPrice from './BPricingPlanPrice';
import {VNode, h, defineComponent, ExtractPropTypes} from 'vue';

const BPricingPlanProps = {
  isActive: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number,
    required: true
  },
  interval: {
    type: Number,
    required: true
  }
}

export interface BPricingPlanProps extends ExtractPropTypes<typeof BPricingPlanProps> {}

export default defineComponent({
  name: 'b-pricing-plan',
  props: BPricingPlanProps,
  setup(props, { slots }) {
    return () => {
      const nodes: VNode[] = [];
      if (slots.header) {
        nodes.push(h('div', { class: 'plan-header' }, slots.header()));
      }
      nodes.push(
        h('div', { class: 'plan-pricing-container' }, slots.price ? slots.price(props) : h(BPricingPlanPrice, props))
      );
      nodes.push(h('div', { class: 'plan-items' }, slots.items && slots.items()));
      if (slots.footer) {
        nodes.push(h('div', { class: 'plan-footer' }, slots.footer()));
      }
      return h('section', { class: ['pricing-plan', { 'is-active': !!props.isActive }] }, nodes);
    };
  }
});
