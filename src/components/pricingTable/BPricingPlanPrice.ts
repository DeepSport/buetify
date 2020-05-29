import './pricing-table.sass';
import { SetupContext, h } from 'vue';
import {BPricingPlanProps} from './BPricingPlan';

export type BPricingPlanPriceProps = Omit<BPricingPlanProps, 'isActive'>

export default function BPricingPlanPrice(props: BPricingPlanPriceProps, { attrs, slots }: SetupContext) {
  return h('div', { ...attrs, class: 'plan-price' }, [
    h('span', { class: 'plan-price-amount' }, [
      h('span', { class: 'plan-price-currency' }, slots.currency ? slots.currency() : '$'),
      `${props.amount}`
    ]),
    `/${props.interval}`
  ]);
}
