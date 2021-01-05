import { h, FunctionalComponent } from 'vue';
import { BPricingPlanProps } from './BPricingPlan';

export type BPricingPlanPriceProps = Omit<BPricingPlanProps, 'isActive'>;

const BPricingPlanPrice_: FunctionalComponent<BPricingPlanPriceProps> = function BPricingPlanPrice(props, { slots }) {
  return h('div', { class: 'plan-price' }, [
    h('span', { class: 'plan-price-amount' }, [
      h('span', { class: 'plan-price-currency' }, slots.currency ? slots.currency() : '$'),
      `${props.amount}`
    ]),
    `/${props.interval}`
  ]);
};

export default BPricingPlanPrice_;
